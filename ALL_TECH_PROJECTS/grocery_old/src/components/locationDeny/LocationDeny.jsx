import * as React from "react";
import { connect } from "react-redux";
import SearchBar from "../uiControls/SearchBar";
import { Typography } from "@material-ui/core";
import GpsNotFixed from "@material-ui/icons/GpsNotFixed";
import { debounce } from "../../../src/helper/utilites"
import { userLocation } from "../../actions/userLocation"
//import Autocomplete from 'react-google-autocomplete';
// import NoResults from "../uiControls/NoResults";

// history is passed from route component and otherprops are passed from store
// dispatch is a store method and is passed as a prop by react-redux to the connected component

class LocationDeny extends React.Component {
    constructor(props) {
        super(props);
        this.state = { results: [] };
        this.searchDebounced = debounce(this.fetchResults, 200, false).bind(this);
    }
    updateResults = (suggestions, status) => {
        // update state
        console.log(suggestions)
    }

    fetchResults(e) {
        const searchedValue = e.target.value;
        const service = new window.google.maps.places.AutocompleteService();
        // const defaultBounds = new window.google.maps.LatLngBounds(
        //   new window.google.maps.LatLng(Number(lat), Number(lng)),
        //   new window.google.maps.LatLng(Number(lat), Number(lng))
        // );
        const request = {
            input: searchedValue,
            componentRestrictions: { country: "in" }
        };
        service.getPlacePredictions(request, this.updateResults);
    }



    updateStore(place) {
        const { dispatch, history } = this.props;
        dispatch(userLocation(this.state)).then(() => history.push("/map"))
    }

    render() {
        let results = this.state.results;
        return (
            <div>
                <section style={{ padding: "16px", borderBottom: "6px solid #F2F2F2" }}>
                    <Typography style={{
                        padding: "40px 0 10px", fontSize: "12px", fontWeight: 600
                    }}>ENTER YOUR LOCATION</Typography>
                    <div style={{ display: "flex", paddingTop: "15px", color: "#004D9C" }}>
                        <GpsNotFixed style={{
                            fontSize: "17px",
                            fontFamily: "inherit"
                        }} />
                        <Typography style={{
                            paddingLeft: "5px", fontSize: "12px", color: "inherit"
                        }}>Use My current Location</Typography>
                    </div>
                </section>
                <div style={{ marginTop: "10px" }}>
                    <SearchBar
                        hintText="Search Location"
                        handleSearchUpdate={this.searchDebounced}
                    />
                    <div className="results">
                        {results.length > 0 ? (
                            results.map((item) =>
                                <Typography
                                    style={{
                                        padding: "40px 0 10px", fontSize: "12px",
                                        fontWeight: 600
                                    }}
                                    onClick={this.updateStore}>
                                    item
                                </Typography>
                            )
                        ) : null}
                    </div>
                    {/* <Autocomplete
                        style={{ width: '100%' }}
                        onPlaceSelected={(place) => {
                            this.updateStore(place);
                        }}
                        types={['(regions)']}
                        componentRestrictions={{ country: "in" }}
                    /> */}
                </div>
            </div>
        );
    }
}


// mapStateToProps is function receives the entire store state, and returns an object of data 
// this component needs. It is called every time the store state changes and Login component gets updated
function mapStateToProps(state) {
    return {}
}

export default connect(mapStateToProps)(LocationDeny);