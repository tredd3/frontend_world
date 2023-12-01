import React, { Component } from 'react';
import {Place} from '@material-ui/icons';
import injectSheet from 'react-jss';
import {getPostalCode} from '../../utils/locationHelper';

const style = {
		mapConatiner:{
			position: 'relative',
			'& .markerDiv':{
				position: 'absolute',
				top:0,
				bottom:0,
				right:0,
				left:0,
				display: 'flex',
				margin: 'auto',
				'& svg':{
					zIndex: 999,
					margin: 'auto',
					color: '#004D9C',
					fontSize: 50
				}
			}
		}
}
@injectSheet(style)
class Map extends Component {
  constructor(props) {
    super(props);
		this.state={
			lat: null,
			lng: null,
			zoom: null,
			address: "",
			pincode: "",
			componentReady: false,
			interval: null
		}
  }

  onScriptLoad = () => {
		if(window.google){
			this.setState({componentReady: true}, () => {
				this.initMap();
			});
		}
  }

	initMap = () => {
		let that = this;
		let {zoom, lat, lng} = this.state;
		const geocoder = new window.google.maps.Geocoder;
		this.revGeocode(geocoder, lat, lng);
		const map = new window.google.maps.Map(
			document.getElementById("mapDiv"),{
					center: { lat: lat, lng: lng },
					zoom: zoom,
					options:{
						fullscreenControl: 0,
						streetViewControl: 0,
						zoomControl: 0,
						mapTypeControl: 0
					}
		});
		map.addListener('dragend', function() {
			let lat = map.getCenter().lat();
			let lng = map.getCenter().lng();
			that.setState({lat, lng})
			that.revGeocode(geocoder, lat, lng);
		})
	}

	revGeocode = (geocoder, lat, lng) => {
		var latlng = {lat: parseFloat(lat), lng: parseFloat(lng)};
		geocoder.geocode({'location': latlng}, (results, status) => {
			if (status === 'OK') {
				let address = results[0].formatted_address;
				let postalCodeObj = getPostalCode(results[0].address_components);
				let pincode = postalCodeObj && parseInt(postalCodeObj.long_name) || "";
				this.setState({address, pincode}, () => {
					this.props.parentHandler(this.state)
				});
			}
		})
	}

  componentDidMount() {
		this.interval = setInterval(this.onScriptLoad, 1000);
		let {center, zoom} = this.props;
		this.setState({lat: center.lat, lng: center.lng, zoom: zoom})
  }

	componentDidUpdate(){
		if(this.state.componentReady) clearInterval(this.interval);
	}

  render() {
		let {classes} = this.props;
		let {componentReady} = this.state;
    return (
			<div className={classes.mapConatiner}>
				{
					componentReady ? (
						<>
							<div className="markerDiv">
								<Place />
							</div>
							<div style={{ width: '100%', height: this.props.height }} id="mapDiv" />
						</>
					) : null
				}
			</div>
    );
  }
}

export default Map
