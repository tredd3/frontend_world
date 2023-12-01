/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import React, { useEffect, useMemo, useCallback } from 'react';
import { Search } from '@material-ui/icons';
import { useHistory } from 'react-router-dom';
import PageTemplate from '../uiControls/PageTemplate/PageTemplate';
import { clearNotifications, getPaginatedNotifications } from '../../services/notifications';
import NotificationCard from './NotificationCard';
import { NoNotification } from '../../assets/images/svg';
import NoResults from '../uiControls/NoResults';
import { trackPage } from '../../helpers/analytics';
import useBoolean from '../../hooks/use-boolean';
import Loader from '../uiControls/Loader';
import usePaginatedService from '../../hooks/use-paginated-service';
import PaginatedList from '../uiControls/PaginatedList';

const styles = {
  wrapper: css`
    display: flex;
    justify-content: space-between;
    padding: 10px;
    font-size: 14px;
    color: #000000;
  `,
  clearNotificationsButton: css`
    color: #0066C0;
    border: 0;
    background: none;
    font-size: 1em;
  `
};

const Notifications: React.FC = () => {
  const [isLoading, startLoading, doneLoading] = useBoolean(false);
  const [notificationsCleared, setNotificationsCleared] = useBoolean(false);
  const history = useHistory();

  const paginatedNotifications = usePaginatedService(async () => {
    startLoading();
    const results = await getPaginatedNotifications();
    doneLoading();
    return results;
  }, [startLoading, doneLoading]);

  const hasNotifications = useMemo(
    () => {
      if (notificationsCleared) return false;
      return Boolean(paginatedNotifications.data?.length);
    },
    [notificationsCleared, paginatedNotifications.data]
  );

  useEffect(() => { trackPage('Notifications Page'); }, []);

  const clearNotificationHandler = useCallback(async () => {
    await clearNotifications();
    setNotificationsCleared();
  }, [setNotificationsCleared]);

  return (
    <PageTemplate
      history={history}
      subSection={false}
      deliverySection={false}
      title="JioMart"
      righticon2
      customRighticon1={<Search />}
    >
      {!isLoading && !hasNotifications
        ? (
          <NoResults
            text="No Notifications"
            icon={<NoNotification />}
          />
        )
        : (
          <React.Fragment>
            <div css={styles.wrapper}>
              <span>My Notifications</span>
              <button
                css={styles.clearNotificationsButton}
                onClick={clearNotificationHandler}
              >
                Clear All
              </button>
            </div>
            {isLoading
              ? <Loader />
              : (
                <PaginatedList
                  list={paginatedNotifications.data}
                  loadNextPage={paginatedNotifications.loadNextPage}
                  rowRenderer={({ item: notification }) => (
                    <NotificationCard
                      key={notification.id}
                      notification={notification}
                    />
                  )}
                />
              )}
          </React.Fragment>
        )}
    </PageTemplate>
  );
};

export default Notifications;
