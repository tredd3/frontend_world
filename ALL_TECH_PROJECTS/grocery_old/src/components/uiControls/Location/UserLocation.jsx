import * as React from "react";
import { connect } from "react-redux";
import injectSheet from 'react-jss';
import style from './style';
import { Typography, LocationOn } from "../../../materialUI";
import { toggleLocationDrawer } from '../../../actions/appState';
import { DownWhite } from "../../../assets/images/svg"
@injectSheet(style)
@connect(
  state => {
    return {
      userLocation: state.userAddress.address,
      name: state.user.firstName,
    };
  },
  dispatch => {
    return {
      toggleLocationDrawer: (show) => dispatch(toggleLocationDrawer(show))
    }
  }
)
class UserLocation extends React.Component {
  render() {
    const { classes, userLocation, toggleLocationDrawer, name } = this.props;
    return (
      <>
        <div className={classes.userLocation} onClick={e => toggleLocationDrawer(true)}>
          <LocationOn className={classes.locationIcon} />
          {/* <LocationIcon className={classes.locationIcon} /> */}
          <Typography className={classes.userAddress}>{userLocation.address ? `Deliver to ${name} ${userLocation.cityName?'-':'' } ${userLocation.cityName || ""}${userLocation.pincode?',':'' } ${userLocation.pincode || ""} ` : `Select a location to see product availability`} </Typography><DownWhite  style={{transform: "rotate(-90deg)"}} />
        </div>
      </>
    );
  }
}

export default UserLocation;
