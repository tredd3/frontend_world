import * as React from "react";
import injectSheet from 'react-jss';
import style from './style';
import { MenuIcon, NotificationsNone, SwipeableDrawer, ChevronLeft,HomeIcon  } from "../../../materialUI";
import Header from "../../uiControls/Header"
import HeaderSubsection from "../../uiControls/HeaderSubsection"
import SideDrawer from "./SideDrawer"
import CartIcon from "../CartIcon";
@injectSheet(style)
class PageTemplate extends React.Component {
    constructor(props) {
        super(props);
        this.state = { openDrawer: false };
    }

    toggleSideDrawer = (open) => event => {
        if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        this.setState({ openDrawer: open });
    }
    goback = (e) => {
      let url = window.location.href.split("?")[0];
        if(url == "https://pp-static.jiomoney.com/static/jiokart/index.html"){
          window.location.href = "https://rtss-sit.jioconnect.com/MappServer5/redirectToNativeApp.jsp?a=/dashboard&i=myjio://com.jio.myjio/dashboard";
        }
        else{
          this.props.history.goBack();
        }
    }
    titleClick = (e) => {
        this.props.history.push('/');
    }
    render() {
        const { classes,
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
            handleFocus, title = "JioMart",
            showSearchBar = false,
            footerNode = null,
        } = this.props;

        return (
            <div className={`${whiteBackground ? classes.whiteBackground : classes.greyBackground} ${footerNode? classes.padFooter : '' }`} >
                <Header
                    title={title}
                    className={classes.header}
                    titleClick={this.titleClick}
                    titleComponent={showSearchBar ?
                        (<HeaderSubsection
                            handleSearchUpdate={handleSearchUpdate}
                            handleFocus={handleFocus}
                            headerSubsectionStyle={{ width: "60%", padding: 0 }}
                            history={history} />
                        ) : null
                    }
                    lefticon1={(lefticon1) ? <ChevronLeft style={{ fontSize: 30 }} /> : null}
                    leftclick1={this.goback}
                    lefticon2={(lefticon2) ? <MenuIcon /> : null}

                    leftclick2={this.toggleSideDrawer(true)}
                    righticon1={(righticon1) ? (customRighticon1 ? customRighticon1 : <NotificationsNone style={{}} />) : null}
                    rightclick1={() => { console.log('clicked') }}
                    // righticon2={(righticon2) ? <ShoppingCart style={{ paddingLeft: "5px" }} /> : null}
                    righticon2={(righticon2) ? <CartIcon style={{ paddingLeft: "5px" }} /> : null}
                    rightclick2={() => history.push('/cart')}
                />
                {(subSection !== false) ?
                    (<HeaderSubsection
                        handleSearchUpdate={handleSearchUpdate}
                        handleFocus={handleFocus}
                        history={history}
                        showCategories={showCategories} />
                    ) : null
                }
                {(lefticon2) ? (<SwipeableDrawer
                    open={this.state.openDrawer}
                    onClose={this.toggleSideDrawer(false)}
                    onOpen={this.toggleSideDrawer(true)}
                >
                    <SideDrawer toggleSideDrawer={this.toggleSideDrawer} history={history} />
                </SwipeableDrawer>) : null}
                {this.props.children}
                {footerNode !== null ?(<div classes={whiteBackground ? classes.whiteBackground : classes.greyBackground} style={{position: 'fixed', bottom: 0, width: "100%"}}>{footerNode}</div>): null}
            </div>
        );
    }
}

export default PageTemplate;
