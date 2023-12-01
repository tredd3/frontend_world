import React from 'react';
import PlacesAutocomplete, { geocodeByAddress } from 'react-places-autocomplete';
import { withStyles } from '@material-ui/core';
import { Search, Close } from '@material-ui/icons';
import { connect } from 'react-redux';
import STYLE_CONST from '../../constants/style';
import { pipe } from '../../helpers/functional';
import { trackPage } from '../../helpers/analytics';

const getPostalCode = geocodeResult => geocodeResult.find(obj => obj.types.includes('postal_code'));

const style = {
  autocompleteInput: {
    width: '100%',
    outline: 'none',
    border: 0,
    padding: STYLE_CONST.sm,
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    fontSize: '15px'
  },
  dropdownContainer: {
    marginTop: 15
  },
  suggestionItem: {
    '& span': {
      display: 'block',
      paddingBottom: STYLE_CONST.md
    }
  },
  inputContainer: {
    position: 'relative',
    '& .icon': {
      position: 'absolute'
    },
    '& .close': {
      right: 0
    },
    height: 'calc(100vh - 160px)'
  }
};

export default pipe(
  withStyles(style),
  connect(state => ({ userLocation: state.userLocation }))
)(
  class GooglePlacesSearch extends React.Component {
    constructor(props) {
      super(props);
      this.state = { address: '' };
      this.inputRef = React.createRef();
    }

    componentDidMount() {
      this.inputRef.current.focus();
      trackPage('Google Place Search Page');
    }

    handleChange = address => {
      this.setState({ address });
    };

    handleSelect = address => {
      geocodeByAddress(`${address}, India`)
        .then(results => {
          const postalCodeObj = getPostalCode(results[0].address_components);
          const pincode = (postalCodeObj && Number(postalCodeObj.long_name)) || '';
          if (pincode) {
            this.props.onSelect && this.props.onSelect(pincode);
          } else {
            this.props.onSelect(address);
          }
        });
    };

    clearInput = () => {
      this.setState({ address: '' });
    }

    render() {
      const { classes } = this.props;
      return (
        <PlacesAutocomplete
          value={this.state.address}
          onChange={this.handleChange}
          onSelect={this.handleSelect}
          debounce={800}
          highlightFirstSuggestion
          searchOptions={{
            componentRestrictions: { country: 'in' }
          }}
        >
          {({
            getInputProps, suggestions, getSuggestionItemProps
          }) => (
            <div className={classes.inputContainer}>
              <b>Enter Pincode</b>
              <div style={{ display: 'flex', borderBottom: '1px solid #DFDFDF' }}>
                <Search
                  style={{
                    margin: '10px',
                    fontSize: '16px',
                    fontFamily: 'inherit',
                    color: '#999999'
                  }}
                />
                <div style={{ width: '100%' }}>
                  <input
                    ref={this.inputRef}
                    {...getInputProps({
                      className: classes.autocompleteInput,
                      inputMode: 'numeric'
                    })}
                  />
                </div>
                <Close
                  style={{
                    margin: '10px',
                    fontSize: '16px',
                    fontFamily: 'inherit',
                    color: '#999999'
                  }}
                  onClick={this.clearInput}
                />
              </div>
              {suggestions.map(suggestion => {
                const className = suggestion.active
                  ? 'suggestion-item--active'
                  : 'suggestion-item';
                // inline style for demonstration purpose
                const style = suggestion.active
                  ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                  : { backgroundColor: '#ffffff', cursor: 'pointer' };
                return (
                  <div
                    {...getSuggestionItemProps(suggestion, {
                      className,
                      style
                    })}
                  >
                    <span>{suggestion.description}</span>
                  </div>
                );
              })}
            </div>
          )}
        </PlacesAutocomplete>
      );
    }
  }
);
