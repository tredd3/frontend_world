import React from 'react';
import { withStyles } from '@material-ui/core';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import style from './style';
import { MenuIcon, SwipeableDrawer, ChevronLeft } from '../../Material-UI';
import Header from '../../uiControls/Header';
import HeaderSubsection from '../HeaderSubsection';
import SideDrawer from './SideDrawer';
import CartIcon from '../CartIcon';
import HeaderMyJio from './HeaderMyJio';
import CatHeader from '../HeaderSubsection/catHeader';
import { toggleHamburger } from '../../../actions/appState';
import NotificationIcon from '../NotificationIcon';
import { pipe } from '../../../helpers/functional';
import { trackLink } from '../../../helpers/analytics';
import { searchUrl, notificationsUrl, cartUrl } from '../../../helpers/urls';

const trackIconClick = linkName => trackLink(linkName, 'HomeScreenClicks', 'Top');

export default pipe(
  withRouter,
  withStyles(style),
  connect(
    state => ({
      isHamburgerOpen: state.app.hamburger
    }),
    dispatch => ({ toggleHamburger: val => dispatch(toggleHamburger(val)) })
  )
)(
  class PageTemplate extends React.Component {
    constructor(props) {
      super(props);
      this.state = { openDrawer: false };
    }

    toggleSideDrawer = open => event => {
      if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
        return;
      }
      this.props.toggleHamburger(open);
      // this.setState({ openDrawer: open });
    };

    goBack = () => {
      const url = window.location.href.split('?')[0];
      if (url === 'https://pp-static.jiomoney.com/static/jiokart/index.html' || this.props.newUser) {
        // eslint-disable-next-line max-len
        window.location.href = 'https://rtss-sit.jioconnect.com/MappServer5/redirectToNativeApp.jsp?a=/dashboard&i=myjio://com.jio.myjio/dashboard';
      } else if (this.props.backIconCallback) {
        this.props.backIconCallback();
      } else {
        this.props.history.goBack();
      }
    };

    render() {
      const {
        classes,
        subSection,
        showCategories = true,
        lefticon1 = true,
        lefticon2 = true,
        righticon1 = true,
        righticon2 = true,
        history,
        customRighticon1,
        whiteBackground,
        handleSearchUpdate,
        handleFocus,
        title = 'JioMart',
        showSearchBar = false,
        footerNode = null,
        newUser = false,
        inputText = '',
        showHeader = true,
        showCatHeader = false,
        drawerLoc = 'left',
        showSearchedText = false,
        shouldInputAutoFocus = false,
        // This is a stop gap flag as removing min_height breaks layout of certain pages w.r.t background color.
        // The solution should be to rethink this layout as height of 100vh is incorrect and would always introduce
        // some scroll due to header also being present in the page.
        disableMinHeight = false
      } = this.props;

      const headerTitleStyle = {};
      return (
        <HeaderMyJio>
          <div className={footerNode ? classes.padFooter : ''}>
            {showHeader ? (
              <Header
                title={title}
                titleStyle={headerTitleStyle}
                className={classes.header}
                titleComponent={
                  showSearchBar ? (
                    <HeaderSubsection
                      handleSearchUpdate={handleSearchUpdate}
                      handleFocus={handleFocus}
                      history={history}
                      showSearchedText={showSearchedText}
                      shouldInputAutoFocus={shouldInputAutoFocus}
                    />
                  ) : null
                }
                lefticon1={lefticon1 ? <ChevronLeft style={{ fontSize: 30 }} /> : null}
                leftclick1={this.goBack}
                lefticon2={lefticon2 && !newUser ? <MenuIcon /> : null}
                leftclick2={this.toggleSideDrawer(true)}
                righticon1={
                  righticon1 ? customRighticon1 || (
                    <NotificationIcon onClick={() => trackIconClick('Notifications')} />
                  ) : null
                }
                rightclick1={() => {
                  trackIconClick('Notifications');
                  (customRighticon1 ? history.push(searchUrl) : history.push(notificationsUrl));
                }}
                righticon2={righticon2 ? <CartIcon style={{ paddingLeft: '5px' }} position="top" /> : null}
                rightclick2={() => {
                  trackIconClick('Cart');
                  history.push(cartUrl);
                }}
              />
            ) : null}

            {subSection !== false ? (
              <HeaderSubsection
                handleSearchUpdate={handleSearchUpdate}
                handleFocus={handleFocus}
                history={history}
                showCategories={showCategories}
                inputText={inputText}
                showSearchedText={showSearchedText}
                shouldInputAutoFocus={shouldInputAutoFocus}
              />
            ) : null}

            {showCatHeader ? <CatHeader history={history} /> : null}

            {lefticon2 ? (
              <SwipeableDrawer
                anchor={drawerLoc}
                open={this.props.isHamburgerOpen}
                onClose={this.toggleSideDrawer(false)}
                onOpen={this.toggleSideDrawer(true)}
              >
                <SideDrawer direction={drawerLoc} toggleSideDrawer={this.toggleSideDrawer} history={history} />
              </SwipeableDrawer>
            ) : null}
            <div className={`
              ${whiteBackground ? classes.whiteBackground : classes.greyBackground}
              ${disableMinHeight ? classes.disableMinHeight : ''}
            `}
            >
              {this.props.children}
            </div>
            {footerNode !== null ? (
              <div
                classes={whiteBackground ? classes.whiteBackground : classes.greyBackground}
                style={{ position: 'fixed', bottom: 0, width: '100%' }}
              >
                {footerNode}
              </div>
            ) : null}
          </div>
        </HeaderMyJio>
      );
    }
  }
);
