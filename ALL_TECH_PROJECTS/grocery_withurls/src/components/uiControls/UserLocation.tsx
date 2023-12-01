/** @jsx jsx */
import React, { useEffect, useState } from 'react';
import { css, jsx } from '@emotion/core';
import { SwipeableDrawer, Typography, LocationOn } from '../Material-UI';
import { DownWhite } from '../../assets/images/svg';
import { truncateWithEllipsis, getBottomOffset } from '../../helpers/utilities';
import { trackLink } from '../../helpers/analytics';
import { getUser, updateUser } from '../../services/user';
import useBoolean from '../../hooks/use-boolean';
import Card from './Card';
import Button from './button';
import { ReactComponent as InfoSvg } from '../../assets/images/svg/info.svg';
import { getLatLng, startHandlingBackButton } from '../../intents';
import { isAreaServiceable } from '../../services/address';
import { UserPivot } from '../../types';

import STYLE_CONST from '../../constants/style';

const { white } = STYLE_CONST;
const classes = {
  userLocation: css`
    background-color: ${STYLE_CONST.blue.darkBlue};
    display: flex;
    width: 100%;
    padding: 10px 16px;
    color: ${white.white};
    border-width: 0px;
  `,
  locationIcon: css`
    margin: 4px 4px 0 -4px;
    color: ${white.white};
    font-size: 19px;
  `,
  userAddress: css`
    margin-top: 3px;
    font-size: 14px;
    color: inherit;
  `
};

const userLocationDrawer = css`
  margin-bottom: ${getBottomOffset()}px;
`;

const pincodeInput = css`
  padding-bottom: ${STYLE_CONST.sm};
  margin-bottom: ${STYLE_CONST.xxl};
  outline: none;
  border: 0;
  border-bottom: 1px solid ${STYLE_CONST.black.gainsboro};
  width: 100%;
`;

type LocationDrawerProps = {
  isLocationDrawerOpen: boolean;
  showLocationDrawer: () => void;
  hideLocationDrawer: () => void;
}

export const LocationDrawer: React.FC<LocationDrawerProps> = ({
  isLocationDrawerOpen, showLocationDrawer, hideLocationDrawer
}) => {
  const [isPinInputVisible, setPinInputVisible] = useState(false);
  const [pincode, setPincode] = useState('');
  const [error, setError] = useState('');

  useEffect(() => startHandlingBackButton(hideLocationDrawer), [hideLocationDrawer]);

  const getLocation = async () => {
    trackLink('Set Location | Use my current Location', 'HomeScreenClicks', 'Middle');
    updateUser(await getLatLng());
    hideLocationDrawer();
  };

  const enterPin = () => {
    setPinInputVisible(true);
    trackLink('Set Location | Enter Pincode', 'HomeScreenClicks', 'Middle');
  };

  const changePincode = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length < 7) {
      setPincode(e.target.value);
    } else {
      // do nothing, limit the pincode input to 6 digits
    }
  };

  const checkService = async () => {
    const PinRE = /\d{6}/g;
    if (!PinRE.test(pincode)) {
      setError('Enter Valid 6-digit pincode');
      return;
    }
    if (await isAreaServiceable({ pincode: Number(pincode) })) {
      await updateUser({ pincode: Number(pincode) });
      // TODO find a better way to call all the dashboard data on pincode change
      window.location.reload();
    } else {
      setError(`Currently service not available in your pincode ${pincode}. Try a different location`);
    }
  };

  return (
    <SwipeableDrawer
      open={isLocationDrawerOpen}
      onClose={hideLocationDrawer}
      onOpen={showLocationDrawer}
      anchor="bottom"
      disableSwipeToOpen
      disableBackdropTransition={false}
      data-testid="location-drawer"
    >
      <div css={userLocationDrawer}>
        {
          !isPinInputVisible ? (
            <Card>
              <p className="fs14">Jio Mart needs your delivery location to show products and delivery options for your location.</p>
              <Button
                text="Use my current location"
                name="useLocation"
                type="solidGray"
                style={{ margin: `${STYLE_CONST.sm} 0px` }}
                onClick={getLocation}
              />
              <Button text="Enter a pincode" name="enterPin" type="solidTulip" onClick={enterPin} />
            </Card>
          ) : (
            <Card>
              <input
                placeholder="Enter Pincode"
                css={pincodeInput}
                type="number"
                name="pincode"
                value={pincode}
                onChange={changePincode}
                autoComplete="off"
              />
              {error ? (
                <div style={{ display: 'flex', alignItems: 'center' }} data-testid="pincode-error">
                  <InfoSvg style={{ width: 15, height: 15 }} />
                  {' '}
                  <p style={{
                    margin: 5,
                    fontSize: 12,
                    fontFamily: 'inherit',
                    color: '#e57b00'
                  }}
                  >
                    {error}
                  </p>
                </div>
              ) : null}
              <Button
                text="Enter a pincode"
                name="enterPin"
                type="solidTulip"
                onClick={checkService}
                disable={pincode.length !== 6}
              />
            </Card>
          )
        }
      </div>

    </SwipeableDrawer>
  );
};

type UserLocationProps = {
  isEditable?: boolean;
}

const UserLocation: React.FC<UserLocationProps> = ({
  isEditable = false
}) => {
  const [user, setUser] = useState<UserPivot | null>(null);
  const [isLocationDrawerOpen, showLocationDrawer, hideLocationDrawer] = useBoolean(false);

  useEffect(() => { getUser().then(setUser); }, []);

  if (!user) return null;

  const { firstName, preferences } = user;
  return (
    <div>
      <button
        css={classes.userLocation}
        onClick={() => {
          trackLink('Set Location', 'HomeScreenClicks', 'Middle');
          if (isEditable) showLocationDrawer();
        }}
        data-testid="user-location"
      >
        {
          preferences ? (
            <span style={{ display: 'flex' }}>
              <LocationOn css={classes.locationIcon} />
              <Typography css={classes.userAddress}>
                {preferences.pincode
                // eslint-disable-next-line max-len
                  ? `Deliver to ${truncateWithEllipsis(firstName)} ${preferences.city ? '-' : ''} ${preferences.city || ''}${preferences.pincode ? ',' : ''} ${preferences.pincode || ''} `
                  : 'Select a location to see product availability'}
                {' '}
              </Typography>
              <DownWhite style={{ transform: 'rotate(-90deg)' }} />
            </span>
          ) : null
        }
      </button>
      <LocationDrawer
        isLocationDrawerOpen={isLocationDrawerOpen}
        showLocationDrawer={showLocationDrawer}
        hideLocationDrawer={hideLocationDrawer}
      />
    </div>
  );
};

export default UserLocation;
