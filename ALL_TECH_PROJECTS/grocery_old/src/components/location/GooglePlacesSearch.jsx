import React from "react";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng
} from "react-places-autocomplete";
import injectSheet from "react-jss";
import STYLE_CONST from "../../constants/style";
import { Search, Close } from "@material-ui/icons";
import { getPostalCode } from "../../utils/locationHelper";
import { connect } from "react-redux";
import { checkPincodeServiceability } from "../../actions/address";

const style = {
  autocompleteInput: {
    width: "100%",
    outline: "none",
    border: 0,
    padding: STYLE_CONST.sm,
    borderBottom: "1px solid #DFDFDF",
    overflow: "hidden",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis"
  },
  dropdownContainer: {
    marginTop: 15
  },
  suggestionItem: {
    "& span": {
      display: "block",
      paddingBottom: STYLE_CONST.md
    }
  },
  inputContainer: {
    position: "relative",
    "& .icon": {
      position: "absolute"
    },
    "& .close": {
      right: 0
    }
  }
};
@injectSheet(style)
@connect(
  state => ({
    userLocation: state.userLocation
  }),
  dishpatch => {
    return {};
  }
)
class GooglePlacesSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = { pincode: "" };
    this.inputRef = React.createRef();
  }

  componentDidMount() {
    this.inputRef.current.focus();
  }

  handleChange = pincode => {
    let { parentEventHandler } = this.props;
    if (pincode.length === 7) return;
    parentEventHandler(pincode);
    this.setState({ pincode: pincode });
  };

  // handleSelect = address => {
  //   this.setState({ address});
  //   let formatted_address;
  //   geocodeByAddress(address)
  //     .then(results => {
  //       formatted_address = results[0];
  //       return getLatLng(results[0]);
  //     })
  //     .then(latLng => {
  //       let lat = latLng.lat;
  //       let lng = latLng.lng;
  //       this.setState({lat, lng });
  //       let postalCodeObj = getPostalCode(formatted_address.address_components);
  //       let pincode = postalCodeObj && parseInt(postalCodeObj.long_name) || "";
  //       if(pincode){
  //         checkPincodeServiceability(pincode)
  //         .then(data => {
  //
  //         })
  //       }
  //     })
  //     .catch(error => console.error('Error', error));
  // };

  // clearInput = () => {
  //   this.setState({address: ''})
  // }

  render() {
    let { classes } = this.props;
    return (
      <PlacesAutocomplete
        value={this.state.pincode}
        onChange={this.handleChange}
        onSelect={this.handleSelect}
        debounce={800}
        highlightFirstSuggestion={true}
        searchOptions={{ componentRestrictions: { country: "in" } }}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div className={classes.inputContainer}>
            <input
              ref={this.inputRef}
              {...getInputProps({
                placeholder: "Enter Pincode",
                className: classes.autocompleteInput
              })}
            />
            {/*<div className={classes.dropdownContainer}>
              {suggestions.map(suggestion => {
                const className = classes.suggestionItem;
                return (
                  <div
                    {...getSuggestionItemProps(suggestion, {className})}
                  >
                    <span>{suggestion.description}</span>
                  </div>
                );
              })}
            </div>*/}
          </div>
        )}
      </PlacesAutocomplete>
    );
  }
}
export default GooglePlacesSearch;
