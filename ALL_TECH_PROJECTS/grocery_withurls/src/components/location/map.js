import React, { Component } from 'react';
import { withStyles } from '@material-ui/core';
import { ReactComponent as PinIcon } from '../../assets/images/svg/all_map_pin.xml.svg';

const addressComponentsByType = (type, addressComponents) => (
  addressComponents.filter(addressComponent => addressComponent.types.includes(type))
);

const valueFromAddressComponents = (type, addressComponents) => {
  const match = addressComponentsByType(type, addressComponents);

  return match.length && match[0].long_name;
};

const style = {
  mapContainer: {
    position: 'relative',

    '& .markerDiv': {
      position: 'absolute',
      top: 0,
      bottom: 0,
      right: 0,
      left: 0,
      display: 'flex',
      margin: 'auto',
      pointerEvents: 'none',

      '& svg': {
        position: 'absolute',
        zIndex: 999,
        color: '#004D9C',
        fontSize: 50,
        top: '50%',
        marginTop: '-40px',
        left: '50%',
        marginLeft: '-10px'
      },
      '& .markerTooltip': {
        background: '#094CBA',
        fontSize: '13px',
        color: 'white',
        zIndex: 999,
        position: 'absolute',
        padding: '10px 15px',
        top: '50%',
        left: '50%',
        marginTop: '-100px',
        marginLeft: '-5.6em',

        '&::after': {
          content: '\'\'',
          position: 'absolute',
          bottom: 0,
          left: '50%',
          width: 0,
          height: 0,
          border: '10px solid transparent',
          borderTopColor: '#094CBA',
          borderBottom: 0,
          marginLeft: '-10px',
          marginBottom: '-10px'
        }
      }
    }
  }
};

export default withStyles(style)(
  class Map extends Component {
    constructor(props) {
      super(props);
      this.state = {
        lat: null,
        lng: null,
        zoom: null,
        address: '',
        pincode: '',
        componentReady: false,
        interval: null
      };
    }

    componentDidMount() {
      this.interval = setInterval(this.onScriptLoad, 1000);
      const { center, zoom } = this.props;
      this.setState({ lat: center.lat, lng: center.lng, zoom });
    }

    componentDidUpdate() {
      if (this.props.center.lat !== this.state.lat || this.props.center.lng !== this.state.lng) {
        // eslint-disable-next-line react/no-did-update-set-state
        this.setState({ lat: this.props.center.lat, lng: this.props.center.lng });
        this.map && this.map.setCenter({ lat: this.props.center.lat, lng: this.props.center.lng });
      }
      if (this.state.componentReady) clearInterval(this.interval);
    }

    onScriptLoad = () => {
      if (window.google) {
        this.setState({ componentReady: true }, () => {
          this.initMap();
        });
      }
    }

    initMap = () => {
      const { zoom, lat, lng } = this.state;
      const geocoder = new window.google.maps.Geocoder();
      this.revGeocode(geocoder, lat, lng);
      this.map = new window.google.maps.Map(
        document.getElementById('mapDiv'), {
          center: { lat, lng },
          zoom,
          gestureHandling: 'greedy',
          options: {
            fullscreenControl: 0,
            streetViewControl: 0,
            zoomControl: 0,
            mapTypeControl: 0
          }
        }
      );
      this.map.addListener('idle', () => {
        const lat = this.map.getCenter().lat();
        const lng = this.map.getCenter().lng();
        this.revGeocode(geocoder, lat, lng);
      });
    }

    revGeocode = (geocoder, lat, lng) => {
      geocoder.geocode({ location: { lat, lng } }, (results, status) => {
        if (status !== 'OK') return;

        const localities = addressComponentsByType('sublocality', results[0].address_components)
          .map(sublocality => sublocality.long_name);

        const address = results[0].formatted_address;
        const pincode = Number(valueFromAddressComponents('postal_code', results[0].address_components) || '');
        const city = valueFromAddressComponents('locality', results[0].address_components);
        this.setState({
          localities, address, pincode, city, lat, lng
        }, () => {
          this.props.parentHandler(this.state);
        });
      });
    }

    render() {
      const { classes } = this.props;
      const { componentReady } = this.state;
      return (
        <div className={classes.mapContainer}>
          {componentReady && (
            <>
              <div className="markerDiv">
                <div className="markerTooltip">
                  Move pin to adjust
                </div>
                <PinIcon />
              </div>
              <div
                style={{
                  width: '100%',
                  height: this.props.height
                }}
                id="mapDiv"
              />
            </>
          )}
        </div>
      );
    }
  }
);
