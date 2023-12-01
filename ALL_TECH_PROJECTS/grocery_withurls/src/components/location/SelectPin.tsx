/** @jsx jsx */
import React from 'react';
import { LocationSearching } from '@material-ui/icons';
import { useHistory, useParams } from 'react-router-dom';
import { jsx, css } from '@emotion/core';
import Card from '../uiControls/Card';
import GooglePlacesSearch from './GooglePlacesSearch';
import { getLatLng } from '../../intents';
import STYLE_CONST from '../../constants/style';
import { getPincodeFromLatLng } from '../../services/address';

const searchLocation = css`
  display: flex; 
  color: #308CD6;
  font-size: 16px;
`;

const locationTitle = css`
  padding-left: 10px;
`;

const searchPlacesTextfield = {
  marginTop: STYLE_CONST.xs
};

const SearchLocation: React.FC = () => {
  const history = useHistory();
  const { id } = useParams();

  const goToMapView = (pincode: string) => {
    const getRootPath = () => (history.location.pathname.indexOf('cart') > -1 ? 'cart' : 'account');
    history.replace(`/${getRootPath()}/addresses/${id}/map?pincode=${pincode}`);
  };

  const getUserLocation = async () => {
    const latLng = await getLatLng();
    const pincode = await getPincodeFromLatLng(latLng);
    goToMapView(pincode);
  };

  return (
    <div>
      <Card>
        <button css={searchLocation} onClick={getUserLocation}>
          <span><LocationSearching /></span>
          <span css={locationTitle}>Use my current location</span>
        </button>
      </Card>
      <Card style={searchPlacesTextfield}>
        <GooglePlacesSearch onSelect={goToMapView} />
      </Card>
    </div>
  );
};

export default SearchLocation;
