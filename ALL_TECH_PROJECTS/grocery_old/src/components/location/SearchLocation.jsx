import React, {PropTypes} from 'react';
import injectSheet from 'react-jss';
import style from './style/searchLocation';
import Card from '../uiControls/Card';
import GooglePlacesSearch from './GooglePlacesSearch';
import {fetchUserLocation} from '../../utils/locationHelper';
import {LocationSearching} from '@material-ui/icons';

@injectSheet(style)
class SearchLocation extends React.Component {
  setselectedAddress = (data) => {

  }
  getUserLocation = () => {
    fetchUserLocation()
    .then(data => {

    })
    .catch(e => {
      
    })
  }
  render() {
    let {classes} = this.props;
    return (
      <div className={classes.searchLocation}>
        <Card>
          <p className="heading">ENTER YOUR LOCATION</p>
          <p className="searchLoc" onClick={this.getUserLocation}>
            <span><LocationSearching /></span>
            <span>Use my current location</span>
          </p>
        </Card>
        <Card clsName="card-2">
          <GooglePlacesSearch/>
        </Card>
      </div>
    );
  }
}

SearchLocation.propTypes = {
};
export default SearchLocation
