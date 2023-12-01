import * as React from "react";
import { connect } from "react-redux";
import { browserHistory } from 'react-router'
import PageTemplate from "../uiControls/PageTemplate/PageTemplate";
import Widget1 from "../uiControls/Widgets/Widget1";
import Widget3 from "../uiControls/Widgets/Widget3";
import Widget4 from "../uiControls/Widgets/Widget4";
import Widget5 from "../uiControls/Widgets/Widget5";
import Widget6 from "../uiControls/Widgets/Widget6";
import Widget7 from "../uiControls/Widgets/Widget7";
import Widget11 from "../uiControls/Widgets/Widget11";
import Widget12 from "../uiControls/Widgets/Widget12";
import { homePageData, getConfig } from "../../actions/homePageData";
import { homePageSeeMore } from "../../actions/homePageSeeMore";
import UserLocation from "../uiControls/Location/UserLocation";
import { throttle } from "lodash";
// import GetToday from "../uiControls/PageTemplate/GetToday";
// import SelectedKirana from "../uiControls/PageTemplate/SelectedKirana";
// import { Button } from "../../materialUI"
import { cartGetItems } from "../../actions/cart";
// history is passed from route component and otherprops are passed from store
// dispatch is a store method and is passed as a prop by react-redux to the connected component

const Widgets = {
    Widget0: Widget7,
    Widget1: Widget1,
    Widget3: Widget3,
    Widget4: Widget4,
    Widget5: Widget5,
    Widget6: Widget6,
    Widget7: Widget7,
    Widget9: Widget7,
    Widget11: Widget11,
    Widget12: Widget12
};

@connect(
    state => {
        return {
            homePageData: state.homePageData,
            pincode: state.userAddress.address.pincode,
            storeId: state.userAddress.address.storeId,
            cart: state.cart
        };
    },
    dispatch => {
        return {
            getHomepageData: function () {
                return dispatch(homePageData());
            },
            getUserConfig: function () {
                return dispatch(getConfig());
            },
            getHomePageSeeMore: function (params) {
                return dispatch(homePageSeeMore(params));
            },
            getCart: function () {
                dispatch(cartGetItems());
            }
        };
    }
)

class HomePage extends React.Component {
    constructor(props) {
        super(props);
        this.selector = React.createRef();
        this.state = { showSearchBar: false }
        this.searchDebounced = throttle(this.handle, 250).bind(this);
    }
    componentDidMount() {
        // @clear browser history on home page & exit application.
        // this.props.history.go(-(this.props.history.length - 1));
        this.props.getCart();
        window.addEventListener('scroll', this.searchDebounced);
        if (Object.keys(this.props.homePageData).length === 0) {
            this.fetchResponse();
        }
        // this.props.getCart();
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.searchDebounced);
    }

    componentDidUpdate(prevProps) {
        if (prevProps.pincode !== this.props.pincode || prevProps.storeId !== this.props.storeId) {
            this.fetchResponse();
        }
    }

    fetchResponse() {
        this.props.getHomepageData()
        .then(()=>this.props.getUserConfig());
    }

    handleFocus = () => {
        this.props.history.push('/search')
    }

    handle = () => {
        var div = document.getElementById("userLocation");
        var rect = div.getBoundingClientRect();
        var top = rect.top;
        // console.log(top)
        if (top <= 50) {
            if (this.state.showSearchBar === false)
                this.setState({ showSearchBar: true })
        }
        else {
            // console.log("Height is " + top);
            if (this.state.showSearchBar === true)
                this.setState({ showSearchBar: false })
        }

    }
    render() {
        const { homePageData, history, getHomePageSeeMore } = this.props;
        const widgets = (homePageData && homePageData.Data) ? homePageData.Data.widgets : [];
        // const isKiranaSelected = Object.keys(this.props.kirana).length > 0;
        // console.log("homepage props:",this.props, `is kirana selected ${isKiranaSelected}`);
        return (
            <PageTemplate righticon1={false} history={history} handleFocus={this.handleFocus} whiteBackground showSearchBar={this.state.showSearchBar}>
                <div id="userLocation">
                    <UserLocation />
                </div>
                {/* // this design was in phase 1A, commenting
                {isKiranaSelected
                    ? (<div><GetToday /><SelectedKirana history={history} /></div>)
                    : (<Button onClick={() => { const location = { pathname: '/select-kirana' }; this.props.history.push(location) }}>select some kirana</Button>)} */}
                <div>
                  {widgets.length > 0 ? (
                      widgets.map((widgetData, index) => {
                          let Widget = Widgets["Widget" + widgetData.type];
                          if (Widget) {
                              return <Widget key={index} widgetData={widgetData} history={history} homePageSeeMore={getHomePageSeeMore} />;
                          } else {
                              return null;
                          }
                      }
                      )
                  ) : null}
                </div>
            </PageTemplate>
        );
    }
}

// mapStateToProps is function receives the entire store state, and returns an object of data
// this component needs. It is called every time the store state changes and Login component gets updated
// function mapStateToProps(state) {
//     return { userAddress: "Deliver to Sachin at RT Nagar,Bangalore,560024" }
// }

export default HomePage;
