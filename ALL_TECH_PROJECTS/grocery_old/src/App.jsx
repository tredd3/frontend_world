import * as React from "react";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { connect } from "react-redux";
import "./App.css";
import Bridge from './components/hoc/bridge';
import DashBoardSearch from "./components/search/DashBoardSearch";

//******** static component loading **************
//import Placeholder from "./components/placeholder/Placeholder";
//import Splashscreen from "./components/placeholder/Splashscreen";
import Login from './components/auth/login';
//import LocationDeny from "./components/locationDeny/LocationDeny";
import HomePage from "./components/homePage/HomePage";
import SelectKirana from "./components/kirana/select";
import SelectAndDeliver from "./components/kirana/select-deliver";
import ProductsList from "./components/products/ProductsList";
import ShopByCategory from "./components/shopByCategory/ShopByCategory";
import Deals from "./components/deals/deals";
import SnackbarWrapper from './components/uiControls/snackBar';
import Loader from './components/uiControls/loader';
import ProductDescription from './components/products/ProductDescription';
import Account from './components/account';
import Cart from './components/cart'
import OrderDetails from "./components/orders/OrderDetails";
import OrderPlaced from "./components/orderPlaced/OrderPlaced";
import OrderHistory from './components/orderHistory'
import WishList from "./components/wishList/WishList";
import LocationDrawer from './components/uiControls/Location/locationDrawer';
//******** code splitting by dynamic loading of components **************
// import asyncComponent from "./utils/asyncComponent";
// const AsyncInspectionDetails = asyncComponent(() =>
//   import("./components/inspectionDetails/InspectionDetails")
// );

let basePathUrl = "/static/jiokart/";

@connect(state => {
    return {
        app: state.app
    }
})
class App extends React.Component {
    componentDidMount() {

    }
    render() {
        let { app } = this.props;
        return (
            <Bridge>
                {
                    app.showSpinner ? <Loader /> : null
                }
                <SnackbarWrapper message={app.snackBarText} type={app.snackBarType} flag={app.snackBarStatus} />
                <LocationDrawer />
                <Router basename={basePathUrl}>
                    <Switch>
                        <Route exact path="/" component={HomePage} />
                        <Route path="/login" component={Login} />
                        <Route path="/select-kirana" component={SelectKirana} />
                        <Route path="/select-kirana-deliver" component={SelectAndDeliver} />
                        <Route path="/search" component={DashBoardSearch} />
                        <Route path="/shopby-category" component={ShopByCategory} />
                        <Route path="/productsList/:productName" component={ProductsList} />
                        <Route path="/deals" component={Deals} />
                        <Route path="/account" component={Account} />
                        <Route path="/cart" component={Cart} />
                        <Route path="/productDescription/:categoryId/:productSkuId" component={ProductDescription} />
                        <Route path="/orderDetails/:orderId/:shipmentId?" component={OrderDetails} />
                        <Route path="/orderPlaced/:orderId" component={OrderPlaced} />
                        <Route path="/order-history" component={OrderHistory} />
                        <Route path="/wishList" component={WishList} />
                        <Route path="index.html" component={HomePage} />
                        <Route path="/index.html" component={HomePage} />
                        <Route exact path="/*" component={HomePage} />
                    </Switch>
                </Router>
            </Bridge>
        )
    }
}
export default App
