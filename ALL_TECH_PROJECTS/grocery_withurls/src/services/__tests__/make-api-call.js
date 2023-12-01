import makeApiCall from '../helpers/make-api-call';

jest.mock('../../intents', () => ({
  getTokens: () => ({
    apiKey: 'dummy-api-key',
    accessToken: 'dummy-access-token'
  })
}));

describe('helper functions: makeApiCall', () => {
  beforeEach(fetch.resetMocks);

  test('it should return the response when called', async () => {
    fetch.mockResponseOnce(JSON.stringify({ Data: '12345', Control: { Status: 1, Message: 'Success' } }));

    const result = await makeApiCall('http://localhost:4000', {
      headers: { 'X-Foo': 'foobar' },
      body: { some: 'content' }
    });

    expect(result).toBe('12345');
    expect(fetch.mock.calls.length).toBe(1);
    expect(fetch.mock.calls[0][0]).toBe('http://localhost:4000');

    const fetchOptions = fetch.mock.calls[0][1];
    expect(fetchOptions.headers['X-API-Key']).toBe('dummy-api-key');
    expect(fetchOptions.headers['app-name']).toBe('RJIL_JioKart');
    expect(fetchOptions.headers['X-Foo']).toBe('foobar');
    expect(fetchOptions.headers.Authorization).toBe('Bearer dummy-access-token');
    expect(fetchOptions.method).toBe('POST');
    expect(fetchOptions.body).toBeString();

    const parsedBody = JSON.parse(fetchOptions.body);
    expect(parsedBody.Request.Header).toContainKeys(
      ['DeviceId', 'RequestTime', 'Version', 'Product']
    );
    expect(parsedBody.Request.Body).toEqual({ some: 'content' });
  });

  test('it should throw for non-2xx status codes', async () => {
    fetch.mockResponseOnce(JSON.stringify({ Data: '12345', Control: { Status: 0, Message: 'Success' } }), { status: 404 });
    await expect(makeApiCall('http://localhost:4000')).toReject();

    fetch.mockResponseOnce(JSON.stringify({ Data: '12345' }), { status: 404 });
    await expect(makeApiCall('http://localhost:4000')).toReject();

    fetch.mockResponseOnce(JSON.stringify({ Data: '12345', Control: { Status: 1, Message: 'Success' } }), { status: 202 });
    await expect(makeApiCall('http://localhost:4000')).toResolve();

    fetch.mockResponseOnce(JSON.stringify({ Data: '12345', Control: { Status: 1, Message: 'Whatever', MessageCode: 404 } }));
    await expect(makeApiCall('http://localhost:4000')).toReject();
  });

  test('it should throw if body contains an error', async () => {
    fetch.mockResponseOnce(JSON.stringify({ Control: { Status: 0 } }));

    await expect(makeApiCall('http://localhost:4000')).toReject();
  });
});
