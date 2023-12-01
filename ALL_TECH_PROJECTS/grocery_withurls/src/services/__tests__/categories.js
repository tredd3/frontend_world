import mockDB from '../../mocks/db.json';
import { getUser } from '../user';
import { getCategories } from '../categories';

jest.mock('../../intents', () => ({
  getTokens: () => ({
    apiKey: 'dummy-api-key',
    accessToken: 'dummy-access-token'
  })
}));

describe('Categories', () => {
  beforeEach(fetch.resetMocks);
  afterEach(() => {
    getUser.clear();
    getCategories.clear();
  });

  it('should return a properly formatted category', async () => {
    fetch.mockResponseOnce(JSON.stringify(mockDB.user));
    fetch.mockResponseOnce(JSON.stringify(mockDB.categories));

    const categories = await getCategories(123);

    expect(JSON.parse(fetch.mock.calls[1][1].body).Data.Request.Body).toMatchSnapshot();
    expect(categories).toMatchSnapshot();
  });
});
