import makeApiCall from './helpers/make-api-call';
import { apiRoutes } from './api-routes';
import { getUser } from './user';
import { APINotification, NotificationPivot } from '../types';
import paginated from './helpers/paginated';
import { pivotNotification } from './helpers/pivots';
import { getConfig } from './config';

const pageSize = 10;

export const getNotifications = async (pageNumber = 0): Promise<APINotification> => {
  const { userId } = await getUser();

  return makeApiCall<{ }, APINotification>(apiRoutes.getNotifications, {
    body: {
      userId,
      pageNumber,
      pageSize
    }
  });
};

export const getUnreadNotificationCount = async () => {
  const { unreadNotificationCount } = await getConfig();
  return unreadNotificationCount;
};

export const clearNotifications = async (): Promise<void> => {
  const { userId } = await getUser();

  await makeApiCall<{ userId: number }, {}>(apiRoutes.clearNotifications, {
    body: { userId }
  });

  getConfig.clear();
};

type NotificationsAPIRequest = {
  userId: number;
  pageNumber: number;
  pageSize: number;
};

export const getPaginatedNotifications = paginated(
  async (pageNumber = 0) => {
    const { userId } = await getUser();

    const { notifications } = await makeApiCall<NotificationsAPIRequest, APINotification>(apiRoutes.getNotifications, {
      body: {
        userId,
        pageNumber: pageNumber as number,
        pageSize
      }
    });

    return {
      data: notifications.map(pivotNotification),
      nextPage: notifications.length === pageSize ? (pageNumber as number) + 1 : null
    };
  }
);

type SaveNotification = {
  userId: number;
  notificationId: number;
  status: 'UNREAD' | 'READ';
};

export const markNotificationAsRead = async (notification: NotificationPivot) => {
  if (notification.status === 'read') return;

  const { userId } = await getUser();

  await makeApiCall<SaveNotification, {}>(apiRoutes.saveNotification, {
    body: {
      userId,
      notificationId: notification.id,
      status: notification.status.toUpperCase() as SaveNotification['status']
    }
  });
};
