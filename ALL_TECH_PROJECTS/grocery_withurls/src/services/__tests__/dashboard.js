import mockDB from '../../mocks/db.json';
import { getUser } from '../user';
import { getAllDashboardData } from '../dashboard';

jest.mock('../../intents', () => ({
  getTokens: () => ({
    apiKey: 'dummy-api-key',
    accessToken: 'dummy-access-token'
  })
}));

describe('Get All Dashboard Data', () => {
  beforeEach(fetch.resetMocks);
  afterEach(() => {
    getUser.clear();
    getAllDashboardData.clear();
  });

  it('should return a properly formatted product array', async () => {
    fetch.mockResponseOnce(JSON.stringify(mockDB.user));
    fetch.mockResponseOnce(JSON.stringify(mockDB.getAllDashboard));

    const products = await getAllDashboardData({
      bannerId: 123, type: 1, subType: 2, pageNum: 1
    });
    expect(products).toMatchSnapshot();
  });
});
