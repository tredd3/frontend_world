import * as React from "react";
import Header from "../../uiControls/Header";
import injectSheet from 'react-jss';
import style from './style';
//import response from './response';
import { List, ListItem, Divider, ListItemText } from "../../../materialUI";
import { connect } from "react-redux";
import { AppLogo } from "../../../assets/images/svg"
import { toggleLocationDrawer } from '../../../actions/appState';
//import API_ROUTES from "../../helper/network/api-routes"

@injectSheet(style)
@connect(
    state => {
        return {
            kirana: state.kirana.selectedKirana,
            user: state.user,
            userLocation: state.userAddress.address
        };
    },
    dispatch => {
        return {
            toggleLocationDrawer: (show, callback) => dispatch(toggleLocationDrawer(show, callback))
        }
    }
)

class SideDrawer extends React.Component {
    ShopBycategory = (e) => {
        this.props.history.push('/shopby-category')
    }
    Home = (e) => {
        this.props.history.push('/')
    }
    orderHistory = (e) => {
        this.props.history.push('/order-history')
    }
    address = (e) => {
        this.props.history.push('/account/addresses');
    }
    profile = (e) => {
        this.props.history.push('/account/about');
    }
    selectKirana = (e) => {
        const { kirana, userLocation } = this.props;

        if (Object.keys(kirana).length > 0 || userLocation.pincode) {
            this.props.history.push('/select-kirana')
        } else {
            this.props.toggleSideDrawer(false)
            this.props.toggleLocationDrawer(true, () => this.props.history.push('/select-kirana'))
        }
    }

    render() {
        const { classes, toggleSideDrawer, kirana, user } = this.props;
        return (
            <div
                onClick={toggleSideDrawer(false)}
                onKeyDown={toggleSideDrawer(false)}
            >
                {user.login
                    ? <Header title={`Hi ${user.firstName}`} titleStyle={{ margin: "26px 0 10px 0", fontWeight: 600 }} headerContentStyle={{ justifyContent: "flex-start" }} />
                    : <div style={{ padding: "26px 0 10px 15px", backgroundColor: '#004D9C' }} >
                        <AppLogo />
                        <p style={{ color: '#fff', fontSize: 11 }}>Login / Signup to access your profile</p>
                        <button style={{ border: '1px solid #fff', backgroundColor: '#004D9C', color: '#fff', padding: 5, margin: '10px 0', borderradius: 2 }} onClick={() => this.props.history.push('/login')}>Login / Signup</button>
                    </div>}
                <section className={classes.contentWrapper}>
                    <List className={classes.SideDrawer}>
                        <ListItem button className={classes.listItem} onClick={this.Home}>
                            <ListItemText primary="Home" />
                        </ListItem>
                        <ListItem button className={classes.listItem} onClick={this.ShopBycategory}>
                            <ListItemText primary='Shop By category' />
                        </ListItem>
                    </List>
                    <Divider />
                    <List className={classes.SideDrawer}>
                        {/* <ListItem button className={classes.listItem} onClick={this.orderHistory} >
                            <ListItemText primary='My Orders' />
                        </ListItem> */}
                        <ListItem button className={classes.listItem} onClick={this.profile}>
                            <ListItemText primary='My Profile' />
                        </ListItem>
                        <ListItem button className={classes.listItem} onClick={this.address}>
                            <ListItemText primary='My Addresses' />
                        </ListItem>
                        {/* <ListItem button className={classes.listItem}>
                            <ListItemText primary='My Notifications' />
                        </ListItem> */}
                        <ListItem button className={classes.listItem} onClick={this.selectKirana} >
                            <ListItemText primary={'My Kirana Partner'} secondary={Object.keys(kirana).length > 0 ? kirana.Name : ''} />
                        </ListItem>
                    </List>
                    {/* <Divider />
                    <List className={classes.SideDrawer}>
                        <ListItem className={classes.listItem} button>
                            <ListItemText primary="Settings" />
                        </ListItem>
                        <ListItem className={classes.listItem} button>
                            <ListItemText primary='Legal Information' />
                        </ListItem>
                        <ListItem className={classes.listItem} button>
                            <ListItemText primary='Customer Services' />
                        </ListItem>
                    </List> */}
                </section>
            </div>
        );
    }
}

export default SideDrawer;