/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { Link, useParams, useHistory } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { geocodeByAddress } from 'react-places-autocomplete';
import Map from './map';
import Button from '../uiControls/button';
import { ReactComponent as LocationIcon } from '../../assets/images/svg/all_location_blue_icon.xml.svg';
import { getAddressById, isAreaServiceable } from '../../services/address';
import { getLatLng } from '../../intents';
import SnackbarWrapper from '../uiControls/snackBar';

const wrapper = css`
  background: #efefef;
`;

const mapViewCard = css`
  position: fixed;
  bottom: 0px;
  width: 100vw;
  box-sizing: border-box;
  padding: 20px 15px;
  font-size : 14px;
  background: #fff;
`;

const pinCodeLabel = css`
  font-weight:600;
`;

const pincodeText = css`
  text-decoration:none;
  color: #333;
  font-size: 14px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #eee;
  padding: 10px 0;
  cursor: pointer;
  svg{
  padding-right: 10px;
  }
`;

const addInfo = css`
  overflow-x: auto;
  overflow-y: hidden;
  white-space: nowrap;
  height: 1.4em;
  margin-bottom: 15px;
  width: auto;
  color: #777;
  font-size:12px;
  padding-top: 3px;
`;

type Location = {
  lat: number;
  lng: number;
  address?: string;
  pincode?: number;
  localities?: string[];
  city?: string;
};

const encode = (x?: string | number | boolean) => encodeURIComponent(x || '');

const MapView: React.FC = () => {
  const history = useHistory();
  const { id } = useParams();
  const [location, setLocation] = useState<Location | null>(null);
  const [error, setError] = useState<string | null>(null);

  const getRootPath = () => (
    history.location.pathname.indexOf('cart') > -1 ? 'cart' : 'account'
  );

  useEffect(() => {
    const findAddress = async () => {
      if (!id) throw new Error(); // This can never happen since this route is only invoked when we have an id.
      const urlParams = new URLSearchParams(history.location.search);
      const pincode = urlParams.get('pincode');
      if (pincode) {
        const geoCode = (await geocodeByAddress(`${pincode}, India`))[0];
        setLocation({ ...location, ...{ lat: geoCode.geometry.location.lat(), lng: geoCode.geometry.location.lng() } });
      } else {
        const address = await getAddressById(Number(id));
        if (address) {
          const { pincode, longitude, latitude } = address;
          setLocation({ ...location, ...{ lat: latitude, lng: longitude, pincode } });
        } else {
          try {
            const { lat, lng } = await getLatLng();
            setLocation({ ...location, ...{ lat: Number(lat), lng: Number(lng) } });
          } catch (error) {
            history.replace(`/${getRootPath()}/addresses/${id}/pin`);
          }
        }
      }
    };

    findAddress();
  // TODO: FIXME
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const changeInLocation = (location: Location) => {
    const {
      lat, lng, pincode, address, city, localities
    } = location;
    setLocation({
      ...location,
      ...{
        lat, lng, address, pincode, localities, city
      }
    });
  };

  const redirect = async () => {
    if (location && location.lat && location.lng) {
      if (await isAreaServiceable({ pincode: Number(location.pincode) })) {
        history.replace([
          `/${getRootPath()}/addresses/${id}`,
          `?pincode=${encode(location.pincode)}`,
          `&city=${encode(location.city)}`,
          `&area=${encode(location.localities && location.localities.join(', '))}`,
          `&lat=${encode(location.lat)}`,
          `&lng=${encode(location.lng)}`,
          history.location.search.replace('?', '&')
        ].join(''));
      } else {
        setError('Area not servicable');
      }
    }
  };

  return (
    <div css={wrapper}>
      <SnackbarWrapper message={error} toggleFlag={!!error} type="error" />
      {
        location && location.lat && location.lng ? (
          <React.Fragment>
            <Map
              center={{ lat: location.lat, lng: location.lng }}
              height="calc(100vh - 220px)"
              zoom={15}
              parentHandler={changeInLocation}
            />
            <div css={mapViewCard}>
              <p css={pinCodeLabel}>Enter pincode</p>
              <Link
                replace
                to={`/${getRootPath()}/addresses/${id}/pin`}
                css={pincodeText}
              >
                <LocationIcon />
                {location.pincode}
              </Link>
              <div css={addInfo}>{location.address}</div>
              <Button
                disable={!location.pincode}
                text="Next"
                name="addAddress"
                type="solidTulip"
                onClick={redirect}
              />
            </div>
          </React.Fragment>
        ) : null
      }

    </div>
  );
};

export default (MapView);
