import { getUser, updateUser, addUser } from '../user';
import mockDB from '../../mocks/db.json';

jest.mock('../../intents', () => ({
  getTokens: () => ({
    apiKey: 'dummy-api-key',
    accessToken: 'dummy-access-token'
  })
}));

describe('user service calls', () => {
  beforeEach(fetch.resetMocks);
  afterEach(getUser.clear);

  it('getUser method should return the correct structure', async () => {
    fetch.mockResponseOnce(JSON.stringify(mockDB.user));

    const user = await getUser();
    expect(user).toMatchSnapshot();
  });

  it('updateUser method should return the correct structure', async () => {
    fetch.mockResponses([JSON.stringify(mockDB.user)], [JSON.stringify(mockDB.updateUser)]);

    const user = {
      firstName: 'firstName',
      lastName: 'lastName',
      email: 'email',
      gender: 'female',
      dob: new Date('2020-02-29'),
      lat: 'lat',
      lng: 'lng',
      pincode: 'pincode',
      city: 'city',
      storeId: 'storeId'
    };

    await updateUser(user);
    expect(JSON.parse(fetch.mock.calls[1][1].body).Request.Body).toMatchSnapshot();

    fetch.mockResponseOnce(JSON.stringify(mockDB.user));
    await getUser();
    expect(fetch.mock.calls.length).toBe(3);
  });

  it('addUser method should respond with correct structure', async () => {
    fetch.mockResponseOnce(JSON.stringify(mockDB.user));

    const user = await addUser({ firstName: 'firstName', lastName: 'lastName' });
    expect(user).toMatchSnapshot();
  });
});
