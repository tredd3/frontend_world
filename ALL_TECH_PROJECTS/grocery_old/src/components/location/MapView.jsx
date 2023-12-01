import React from 'react';
import Map from './map';
import Card from '../uiControls/Card';
import style from './style/mapView';
import injectSheet from 'react-jss';
import {Place, Close} from '@material-ui/icons';
import {connect} from 'react-redux';
import {setLatLngPin} from '../../actions/address';
import Button from '../uiControls/button';

@injectSheet(style)
@connect(state => {
  return {
    appState: state
  }
}, dishpatch => {
  return{
    setLatLngPin: (lat, lng, pincode) => {
      dishpatch(setLatLngPin(lat, lng, pincode))
    }
  }
})
class MapView extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      address: '',
      lat: 19.199560,
      lng: 72.964260,
      componentReady: false
    }
  }

  parentHandler = data => {
    let updatedState = {...this.state, ...data};
    this.setState({...updatedState});
    this.props.setLatLngPin(data.lat, data.lng, data.pincode);
  }
  searchAddress = () => {
    this.props.history.push("/location/search")
  }
  componentDidMount(){

  }
  render() {
    let {classes} = this.props;
    let {address, lat, lng} = this.state;
    return (
        <div className={classes.mapView}>
          {
            (lat && lng) ? (
              <>
                <Map
        					center={{lat: lat, lng: lng}}
        					height='calc(100vh - 212px)'
        					zoom={15}
                  parentHandler ={this.parentHandler}
                  />
                <Card clsName="mapViewCard">
                  <p className="fs12 semiBold">CURRENT LOCATION</p>
                  <span className="address" onClick={this.searchAddress}>
                    {/*<span className="iconDiv"><Place/></span>*/}
                    <span className="addInfo fs14">{address}</span>
                    {address.length > 0 ? <span><Close /></span> : null}
                  </span>
                  <span>
                    <Button text="Add address" name="addAddress" type="solidGray" />
                    <Button text="Confirm" name="confirm" type="solidCobalt" />
                  </span>
                </Card>
              </>
            ) : null
          }
        </div>
    );
  }
}
export default  MapView
