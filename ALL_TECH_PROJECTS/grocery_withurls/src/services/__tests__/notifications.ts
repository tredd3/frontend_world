import { mocked } from 'ts-jest/utils';
import * as config from '../config';
import * as user from '../user';
import * as makeApiCall from '../helpers/make-api-call';
import mockDB from '../../mocks/db.json';
import { getUnreadNotificationCount, clearNotifications, getPaginatedNotifications } from '../notifications';
import { pivotConfig, pivotAPIUser } from '../helpers/pivots';
import { apiRoutes } from '../api-routes';

jest.mock('../config');
jest.mock('../user');

const { getConfig } = mocked(config);
const { getUser } = mocked(user);

describe('notifications', () => {
  let makeApiCallSpy: jest.SpyInstance<Promise<unknown>>;

  afterEach(() => {
    getConfig.mockClear();
    getUser.mockClear();
    makeApiCallSpy && makeApiCallSpy.mockRestore();
  });

  describe('getUnreadNotificationCount', () => {
    it('should return the unread notification count', async () => {
      getConfig.mockImplementationOnce(async () => pivotConfig(mockDB.configurations.Data.Configurations));

      expect(await getUnreadNotificationCount()).toBe(
        Number(mockDB.configurations.Data.Configurations.UNREAD_NOTIFICATION_COUNT)
      );
    });
  });

  describe('clearNotifications', () => {
    it('should send the correct request', async () => {
      getUser.mockImplementationOnce(async () => pivotAPIUser(mockDB.user.Data));
      getConfig.clear = jest.fn();

      makeApiCallSpy = jest.spyOn(makeApiCall, 'default')
        .mockImplementationOnce(async () => undefined);

      await clearNotifications();

      expect(makeApiCallSpy.mock.calls[0][0]).toBe(apiRoutes.clearNotifications);
      expect(makeApiCallSpy.mock.calls[0][1]).toMatchSnapshot();
      expect(getConfig.clear).toHaveBeenCalled();
    });
  });

  describe('getPaginatedNotifications', () => {
    it('should get a paginated list of notifications', async () => {
      getUser.mockImplementationOnce(async () => pivotAPIUser(mockDB.user.Data));

      makeApiCallSpy = jest.spyOn(makeApiCall, 'default')
        .mockImplementationOnce(async () => mockDB.notifications.Data);

      const { data, loadNextPage } = await getPaginatedNotifications();

      expect(loadNextPage).toBe(null);
      expect(data).toMatchSnapshot();
      expect(makeApiCallSpy.mock.calls[0][0]).toBe(apiRoutes.getNotifications);
      expect(makeApiCallSpy.mock.calls[0][1]).toMatchSnapshot();
    });
  });
});
