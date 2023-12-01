import React, { useState } from 'react';
import { withStyles, Collapse } from '@material-ui/core';
import { connect } from 'react-redux';
import { ExpandLess, ExpandMore } from '@material-ui/icons';
import Header from '../../uiControls/Header';
import style from './style';
import {
  List, ListItem, Divider, ListItemText
} from '../../Material-UI';
import { toggleLocationDrawer } from '../../../actions/appState';
import { closeWindow, chatWithCustomerService } from '../../../intents';
import { pipe } from '../../../helpers/functional';
import { trackLink } from '../../../helpers/analytics';
import { truncateWithEllipsis, getMobileOperatingSystem } from '../../../helpers/utilities';
import { getUser } from '../../../services/user';
import {
  categoriesUrl, ordersUrl, wishlistUrl, notificationsUrl
} from '../../../helpers/urls';

const trackMenuClick = linkName => trackLink(linkName, 'Menuclicks', 'Bottom');

const CustomerServicesList = ({ classes, history }) => {
  const [open, toggleOpen] = useState(false);
  const handleClick = e => {
    e.stopPropagation();
    toggleOpen(!open);
  };

  return (
    <>
      <ListItem className={`${classes.listItem} ${classes.pr5}`} button onClick={handleClick}>
        <ListItemText primary="Customer Services" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItem
            button
            className={classes.listItem}
            onClick={() => {
              trackLink('Help&Faq', 'Customer Services', 'Bottom');
              history.push('/cart/faqs');
            }}
          >
            <ListItemText primary="Help & FAQs" />
          </ListItem>
          <ListItem
            button
            className={`${classes.listItem} ${classes.pr5}`}
            onClick={() => {
              trackLink('Chatwithus', 'Customer Services', 'Bottom');
              chatWithCustomerService();
            }}
          >
            <ListItemText primary="Chat with us" />
            {/* <WhatsApp /> */}
          </ListItem>
        </List>
      </Collapse>
    </>
  );
};

export default pipe(
  withStyles(style),
  connect(
    state => ({
      kirana: state.kirana.selectedKirana
    }),
    dispatch => ({
      toggleLocationDrawer: (show, callback) => dispatch(toggleLocationDrawer(show, callback))
    })
  )
)(
  class SideDrawer extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        user: {}
      };
    }

    componentDidMount = async () => {
      this.setState({ user: await getUser() });
    }

    shopByCategory = () => {
      trackMenuClick('Shop By Category');
      this.props.history.push(categoriesUrl);
    };

    home = () => {
      trackMenuClick('Home');
      const query = new URLSearchParams(this.props.history.location.search);
      const shouldClose = query.get('myjiosearch');
      if (shouldClose) {
        closeWindow();
        return;
      }
      this.props.history.push('/');
    };

    orderHistory = () => {
      trackMenuClick('My Orders');
      this.props.history.push(ordersUrl);
    };

    address = () => {
      trackMenuClick('My Address');
      this.props.history.push('/account/addresses');
    };

    profile = () => {
      trackMenuClick('My Profile');
      this.props.history.push('/account/about');
    };

    wishlist = () => {
      trackMenuClick('My Wishlist');
      this.props.history.push(wishlistUrl);
    };

    notifications = () => {
      trackMenuClick('notifications');
      this.props.history.push(notificationsUrl);
    }

    render() {
      const {
        classes, toggleSideDrawer, direction
      } = this.props;

      const { user } = this.state;

      return (
        <div
          className={direction === 'bottom' && getMobileOperatingSystem() !== 3 ? classes.bottom57 : ''}
          onClick={toggleSideDrawer(false)}
          onKeyDown={toggleSideDrawer(false)}
        >
          <Header
            title={`Hi ${truncateWithEllipsis(user.firstName)}`}
            titleStyle={{ margin: '20px 0 20px 0px', fontWeight: 600 }}
            headerContentStyle={{ justifyContent: 'flex-start' }}
          />

          <section className={classes.contentWrapper}>
            <List className={classes.SideDrawer}>
              <ListItem button className={classes.listItem} onClick={this.home}>
                <ListItemText primary="Home" />
              </ListItem>
              <ListItem button className={classes.listItem} onClick={this.shopByCategory}>
                <ListItemText primary="Shop By category" />
              </ListItem>
            </List>
            <Divider />
            <List className={classes.SideDrawer}>
              <ListItem button className={classes.listItem} onClick={this.orderHistory}>
                <ListItemText primary="My Orders" />
              </ListItem>
              <ListItem button className={classes.listItem} onClick={this.wishlist}>
                <ListItemText primary="My Wishlist" />
              </ListItem>
              <ListItem button className={classes.listItem} onClick={this.profile}>
                <ListItemText primary="My Profile" />
              </ListItem>
              <ListItem button className={classes.listItem} onClick={this.address}>
                <ListItemText primary="My Addresses & Kirana" />
              </ListItem>
              <ListItem button className={classes.listItem} onClick={this.notifications}>
                <ListItemText primary="Notifications" />
              </ListItem>

            </List>
            <Divider />
            <List className={classes.SideDrawer}>
              <CustomerServicesList classes={classes} history={this.props.history} />
            </List>
          </section>
        </div>
      );
    }
  }
);
