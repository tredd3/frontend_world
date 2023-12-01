/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { useState, useEffect } from 'react';
import { getConfig } from '../../services/config';
import { ConfigPivot } from '../../types';
import { NotificationsNone } from '../Material-UI';
import { numberOfDigits } from '../../helpers/utilities';

const wrapper = css`padding-right: 10px;`;

const countBubble = (unreadCount: number) => css`
  font-size: ${((numberOfDigits(unreadCount) > 2) ? '8px' : '10px')};
  width: 15px;
  height: 15px;
  background: rgba(255, 0, 0, 0.9);
  border-radius: 50%;
  position: absolute;
  top: -4px;
  right: 5px;
  justify-content: center;
  align-items: center;
  display: flex;
`;

const NotificationIcon: React.FC = () => {
  const [config, setConfig] = useState<ConfigPivot | null>(null);

  useEffect(() => {
    const setConfigToState = async () => {
      const config = await getConfig();
      setConfig(config);
    };

    setConfigToState();
  }, []);

  return (
    <span css={wrapper}>
      { config !== null && config.unreadNotificationCount
       && config.unreadNotificationCount !== 0
        ? (
          <span css={countBubble(config.unreadNotificationCount)}>
            {config.unreadNotificationCount}
          </span>
        ) : null}
      <NotificationsNone style={{}} />
    </span>
  );
};

export default NotificationIcon;
