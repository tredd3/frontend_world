import API_ROUTES from '../helpers/network/api-routes';
import { fetchApi } from '../helpers/network/fetch';

export const NOTIFICATION_LIST = 'NOTIFICATION_LIST';

const notificationGetAction = payload => ({
  type: NOTIFICATION_LIST,
  payload
});

export const getNotifications = () => (dispatch, getState) => (
  fetchApi({
    url: API_ROUTES.getNotifications,
    body: {
      userId: getState().user.userId,
      pageNumber: 0,
      pageSize: 10
    }
  }).then(res => dispatch(notificationGetAction(res.Data.notifications)))
);

export const saveNotification = notification => {
  notification.status = 'READ';
  return (dispatch, getState) => (
    fetchApi({
      url: API_ROUTES.saveNotification,
      body: {
        userId: getState().user.userId,
        ...notification
      }
    }).then(
      res => {
        const { notifications } = getState();
        const updateNotification = notifications.map(obj => (obj.notificationId === notification.notificationId ? res.Data : obj));
        return dispatch(notificationGetAction(updateNotification));
      }
    )
  );
};

export const clearNotifications = () => (dispatch, getState) => (
  fetchApi({
    url: API_ROUTES.clearNotifications,
    body: {
      userId: getState().user.userId
    }
  }).then(() => dispatch(notificationGetAction([])))
);
