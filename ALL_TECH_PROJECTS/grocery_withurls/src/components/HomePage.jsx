import React from 'react';
import { connect } from 'react-redux';
import throttle from 'lodash.throttle';
import OrderRating from './orders/OrderRating';
import PageTemplate from './uiControls/PageTemplate/PageTemplate';
import { homePageData } from '../actions/homePageData';
import { setNewUser } from '../actions/user';
import { homePageSeeMore } from '../actions/homePageSeeMore';
import UserLocation from './uiControls/UserLocation';
import { cartGetItems } from '../actions/cart';
import BottomNav from './BottomNav';
import store from '../store';
import { searchTextAction } from '../actions/shopByCategories';
import { trackPage } from '../helpers/analytics';
import { getUser } from '../services/user';
import { HTTPError } from '../services/types';
import { getConfig as getConfigService, deprecatedGetConfigDATA } from '../services/config';
import { closeWindow, startHandlingBackButton } from '../intents';
import NewUserDialog from './NewUserDialog';
import { MenuDrawerProvider } from '../hooks/use-menu-drawer';
import { renderWidget } from './dashboard/widgetRenderHelper';
import { searchUrl } from '../helpers/urls';

export default connect(
  state => ({
    isLocationDrawerOpen: state.app.locationDrawer,
    homePageData: state.homePageData,
    pincode: state.userAddress.address.pincode,
    storeId: state.userAddress.address.storeId,
    getuser: state.user
  }),
  dispatch => ({
    getHomepageData: () => dispatch(homePageData()),
    getHomePageSeeMore: params => dispatch(homePageSeeMore(params)),
    getCart: () => dispatch(cartGetItems()),
    setNewUser: () => dispatch(setNewUser())
  })
)(
  class HomePage extends React.Component {
    constructor(props) {
      super(props);
      this.selector = React.createRef();
      this.state = { showSearchBar: false, openAlert: true, user: {} };
      this.searchDebounced = throttle(this.handle, 250).bind(this);
    }

    componentDidMount = async () => {
      getConfigService.clear();
      this.stopHandlingBackButton = startHandlingBackButton(closeWindow);

      try {
        const user = await getUser();
        this.setState({ user });
        this.callConfigService();
      } catch (e) {
        // new user flow
        if (e instanceof HTTPError && e.status === 404) {
          this.props.setNewUser();
        }
      }

      // @clear browser history on home page & exit application.
      // this.props.history.go(-(this.props.history.length - 1));
      window.addEventListener('scroll', this.searchDebounced);
      if (!this.props.homePageData && this.props.getuser.newUser === false) {
        this.fetchResponse()
          .then(() => this.callConfigService())
          .then(() => this.props.getCart());
      } else {
        // new user flow
        // userconfig will be fetched after userid for new user is available
        this.fetchResponse();
      }
      store.dispatch(searchTextAction(''));
      // this.props.getCart();
    }

    // eslint-disable-next-line camelcase
    UNSAFE_componentWillReceiveProps(nextProps) {
      if (this.props.isLocationDrawerOpen !== nextProps.isLocationDrawerOpen) {
        if (nextProps.isLocationDrawerOpen) { // unsubscribe when location drawer was opened
          this.stopHandlingBackButton();
        } else { // Subscribe when it was closed
          this.stopHandlingBackButton = startHandlingBackButton(closeWindow);
        }
      }
    }

    componentDidUpdate(prevProps) {
      if (prevProps.pincode !== this.props.pincode || prevProps.storeId !== this.props.storeId) {
        this.fetchResponse()
          .then(() => this.props.getCart()); // cart does get affected with pincode/storeid change so this should be necessary
      }
    }

    componentWillUnmount() {
      window.removeEventListener('scroll', this.searchDebounced);
      document.body.setAttribute('style', 'background-color:#fff');

      if (this.stopHandlingBackButton) {
        this.stopHandlingBackButton();
      }
    }

    closeAlert = (close = true) => {
      if (close && this.props.getuser.newUserErrorMessage === '') {
        this.setState({ openAlert: false });
      }
    };

    callConfigService = async () => {
      const config = await deprecatedGetConfigDATA();
      this.setState({ lastOrderDetails: config.LAST_ORDER_DETAILS });
    }

    handleFocus = () => {
      this.props.history.push(searchUrl);
    };

    handle = () => {
      const div = document.getElementById('userLocation');
      if (div) {
        const rect = div.getBoundingClientRect();
        const { top } = rect;
        if (top <= 50) {
          if (this.state.showSearchBar === false) this.setState({ showSearchBar: true });
        } else if (this.state.showSearchBar === true) this.setState({ showSearchBar: false });
      }
    };

    analyticsOnPageLoad = () => {
      const { user = {} } = this.state;
      user.userId && trackPage('Home Page');
    };

    fetchResponse() {
      return this.props.getHomepageData().then(this.analyticsOnPageLoad());
    }

    render() {
      const {
        homePageData, history, getuser
      } = this.props;
      const { openAlert } = this.state;
      const widgets = homePageData || [];

      return (
        <>
          <PageTemplate
            righticon1={false}
            history={history}
            handleFocus={this.handleFocus}
            whiteBackground
            showSearchBar={this.state.showSearchBar}
            showSearchedText
            subSection={false}
            showHeader={false}
            drawerLoc="bottom"
            showCatHeader
            lefticon2
            disableMinHeight
          >
            <div id="userLocation">
              <UserLocation isEditable />
            </div>
            <OrderRating />
            {getuser.newUser ? (
              <NewUserDialog
                isOpen={openAlert}
                close={this.closeAlert}
              />
            ) : null}
            <div>
              {widgets.map(w => renderWidget(w))}
            </div>
          </PageTemplate>
          <MenuDrawerProvider direction="bottom">
            <BottomNav />
          </MenuDrawerProvider>
        </>
      );
    }
  }
);
