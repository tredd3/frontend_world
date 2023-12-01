import * as React from "react";
import { connect } from "react-redux";
import injectSheet from 'react-jss';
import style from './style';
import { SwipeableDrawer } from "../../../materialUI";
import Card from '../Card';
import Button from '../button';
import { WebToAppIntent, WebToAppObs } from '../../../helper/bridge/appBridge';
//import { ReactComponent as LocationIcon } from '../../../assets/images/svg/location.svg';
// import GooglePlacesSearch from '../../location/GooglePlacesSearch';
// import PlacesAutocomplete, {
//   geocodeByAddress,
//   getLatLng
// } from 'react-places-autocomplete';
// import { getPostalCode } from '../../../utils/locationHelper';
// import { setLocation } from "../../../actions/userLocation";
// import { addAddress } from "../../../actions/address";
import { ReactComponent as InfoSvg } from "../../../assets/images/svg/info.svg"
// import { fetchApi } from "../../../helper/network/fetch";
// import API_ROUTES  from "../../../helper/network/api-routes";
// import { getUserId }  from "../../../helper/makeApiBody";
import { checkServiceability } from "../../../actions/address";
import { toggleLocationDrawer } from '../../../actions/appState';

// import { ReactComponent as NoAddress } from '../../../assets/images/svg/noaddress.svg';

@injectSheet(style)
@connect(
  state => {
    return {
      app: state.app,
      userLocation: state.userAddress.address
    };
  },
  dispatch => {
    return {
      checkServiceability: (pincode, cb) => dispatch(checkServiceability({ pincode }, cb)),
      toggleLocationDrawer: (show) => dispatch(toggleLocationDrawer(show))
    };
  }
)
class LocationDrawer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      enterPin: false,
      pincode: "",
      inputError: "",
    }
  }

  enterPin = () => {
    this.setState({ enterPin: true });
  }

  checkService = () => {
    let { pincode } = this.state;
    let PinRE = /\d{6}/g;
    if (!PinRE.test(pincode)) {
      // console.log("setting input error")
      this.setState({ inputError: "Enter Valid 6-digit pincode" });
      return
    }
    else {
      // console.log("resetting input error")
      this.resetError();
    }

    this.props.checkServiceability(this.state.pincode);
    this.toggleDrawer(false)();

    // then(()=>console.log("KKK GOD DAMM IT YAY!"))
    // fetchApi({
    //   url: API_ROUTES.checkServiceability,
    //   body:{pincode}
    // })
    // .then(response => {
    //   if(response.Control.Status){
    //     this.getLatLng();
    //   }
    //   else{
    //     this.setState({inputError: "We currently donot service at this address!"});
    //   }
    // })
    // .catch(error => {
    //   // console.log("check service EROR", error);
    //   this.setState({inputError: "Please try again"});
    // })
  }

  // getLatLng = () => {
  //   let { pincode } = this.state;

  //   let formatted_address;
  //   geocodeByAddress(pincode)
  //     .then(results => {
  //       let cityName = "";
  //       console.log("ALL LOCATION DATA KK ", results );
  //       // console.log("ALL LOCATION DATA KK ", results, city );

  //       this.props.setUserLocation({ address: results[0].formatted_address, lat: results[0].geometry.location.lat(), lng: results[0].geometry.location.lng(), pincode });
  //       console.log("before detch after ALL LOCATION DATA KK" );
  //       return fetchApi({
  //         url: API_ROUTES.saveAddress,
  //         body:{address: results[0].formatted_address,
  //           addressLine1: "",
  //           addressLine2: "",
  //           addressLine3: "",
  //           cityName,
  //           firstName: "",
  //           latitude: results[0].geometry.location.lat(),
  //           longitude: results[0].geometry.location.lng(),
  //           pincode,
  //           userId: getUserId(),
  //           isAutoSelected: true,
  //           isDefault: true
  //         }
  //       })
  //     })
  //     .then(response => {
  //       // console.log(`POST SAVE ADDRESS API (User Location)`, data);
  //       this.props.addAddress(response.Data);
  //       this.closeDrawer();
  //     })
  //     .catch(error => {
  //       console.log("Error in User location / check / get locatoin / save address / ", error)
  //       // this.props.setUserLocation({ pincode });
  //     })
  // }

  resetError = () => {
    this.setState({ inputError: "" });
  }

  googlePlacesSearchHandler = (pincode) => {
    this.setState({ pincode: pincode });
  }
  handleChange = (e) => {
    // console.log("KKK google",e.target.value,  )
    if (e.target.value.length < 7) {
      this.setState({ pincode: e.target.value });
    }
  }
  getLocation = () => {
    let getLocation = {
      location: true
    }
    let readyObjIntent = {
      type: WebToAppIntent.adparams,
      data: getLocation
    }
    WebToAppObs.next(JSON.stringify(readyObjIntent));
    this.props.checkServiceability(this.props.userLocation.pincode);
    this.props.toggleLocationDrawer(false)
  }
  toggleDrawer = (open) => event => {
    this.props.toggleLocationDrawer(open);
    if (!open) {
      setTimeout(() => {
        this.setState({ enterPin: false });
      }, 500)
    }
  }
  render() {
    const { classes, app } = this.props;
    let { enterPin, pincode, inputError } = this.state;
    return (
      <>
        <SwipeableDrawer
          open={app.locationDrawer}
          onClose={this.toggleDrawer(false)}
          onOpen={this.toggleDrawer(true)}
          anchor="bottom"
          disableSwipeToOpen={false}
        >
          <div className={classes.locationDrawer}>
            {
              !enterPin ? (<Card>
                <p className="fs14">Jio Mart needs your delivery location to show products and delivery options for your location.</p>
                <Button text="Use my current location" name="useLocation" type="solidGray" onClick={this.getLocation} />
                <Button text="Enter a pincode" name="enterPin" type="solidTulip" onClick={this.enterPin} />
              </Card>) : (<Card>
                <input placeholder="Enter Pincode" className="pincodeInput" type="number" name="pincode" value={pincode} onChange={this.handleChange} autoComplete="off" />
                {/* <GooglePlacesSearch parentEventHandler={this.googlePlacesSearchHandler} pincode={pincode} /> */}
                {/* <input type="text" onChange={this.handleChange} value={pincode} style={{border: "none",borderBottom: "1px solid black",marginBottom: 10,width: "100%"}} /> */}
                {inputError ? (<div style={{ display: 'flex', alignItems: 'center', }} ><InfoSvg style={{ width: 15, height: 15 }} /> <p style={{
                  margin: 5, fontSize: 12,
                  fontFamily: "inherit", color: '#e57b00'
                }}>{inputError}</p></div>) : null}
                <Button text="Enter a pincode" name="enterPin" type="solidTulip" onClick={this.checkService} disable={pincode.length === 6 ? false : true} />
              </Card>)
            }
          </div>
        </SwipeableDrawer>
      </>
    );
  }
}

export default LocationDrawer;
