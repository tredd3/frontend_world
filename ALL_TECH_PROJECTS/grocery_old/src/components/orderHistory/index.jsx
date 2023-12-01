import React from 'react';
import injectSheet from 'react-jss';
import style from './style';
import Order from './Order';
import OrderFilter from './orderFilter';
import { getOrderHistory, searchOrderHistory } from "../../actions/orderHistory";
import PageTemplate from "../uiControls/PageTemplate/PageTemplate";
import SearchBar from "../uiControls/SearchBar"
import NoResult from "../uiControls/NoResults";
import { decodeDate, debounce } from "../../helper/utilites";
import IntersectionObserver from "../IntersectionObserver";
import { ReactComponent as FilterIcon } from '../../assets/images/svg/Filter.svg';
import { connect } from "react-redux";

@injectSheet(style)

@connect(
    state => {
        return {
            fetchingApi: state.app.fetchingApi
        }
    }
)

class OrderHistory extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            openFilter: false,
            anchorEl: null,
            timeFilter: "",
            orderTypeFilter: "",
            searchedText: "",
            userRecentAction: "default",
            orders: [],
            showComponent: false
        }
        this.searchDebounced = debounce(this.handleSearchUpdate, 250, false).bind(this);
    }

    componentDidMount() {
        this.getAllOrders();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.fetchingApi === true && this.props.fetchingApi === false) {
            this.setState({ showComponent: true })
        }
    }

    handleClick = event => {
        const { currentTarget } = event;
        this.setState({
            anchorEl: currentTarget,
            openFilter: true
        }, () => { document.body.style.overflow = 'hidden' });
    }

    handleClose = () => {
        this.setState({
            openFilter: false
        }, () => { document.body.style.overflow = 'scroll' });
    }

    getAllOrders = (increasePagenumber = false) => {
        if (increasePagenumber) {
            getOrderHistory(null, increasePagenumber).then(Allorders => this.setState((prevState) => ({ orders: [...prevState.orders, ...Allorders] })));
        } else {
            getOrderHistory().then(Allorders => this.setState((prevState) => ({ orders: Allorders })));
        }

    }

    getSearchedOrders = (increasePagenumber = false) => {
        const input = this.state.searchedText;
        if (increasePagenumber) {
            searchOrderHistory(input, increasePagenumber).then(searchedOrders => this.setState((prevState) => ({ orders: [...prevState.orders, ...searchedOrders] })));
        } else {
            searchOrderHistory(input).then(searchedOrders => this.setState((prevState) => ({ orders: searchedOrders })));
        }
    }

    getFilteredOrders = (increasePagenumber = false) => {
        const { timeFilter, orderTypeFilter } = this.state;
        let greaterThanDate;
        let lessThanDate = decodeDate(new Date());
        let filter, orderType;

        switch (timeFilter) {
            case "Last 30 Days":
                greaterThanDate = decodeDate(new Date(), "30days");
                break;
            case "Last 6 Months":
                greaterThanDate = decodeDate(new Date(), "6months");
                break;
            case "2019":
                greaterThanDate = "01-JAN-2019"
                lessThanDate = "31-DEC-2019"
                break;
            case "2018":
                greaterThanDate = "01-JAN-2018"
                lessThanDate = "31-DEC-2018"
                break;
            case "2017":
                greaterThanDate = "01-JAN-2017"
                lessThanDate = "31-DEC-2017"
                break;
            case "2016":
                greaterThanDate = "01-JAN-2016"
                lessThanDate = "31-DEC-2016"
                break;
            default:
                greaterThanDate = ""
        }

        switch (orderTypeFilter) {
            case "All orders":
                orderType = "AllOrders";
                break;
            case "Confirmed orders":
                orderType = "Confirmed";
                break;
            case "Cancelled orders":
                orderType = "Canceled"
                break;
            case "Delivered orders":
                orderType = "Delivered"
                break;
            default:
                orderType = ""
        }

        if (timeFilter && orderTypeFilter) {
            filter = {
                timeFilter: {
                    lessThanDate: lessThanDate,
                    greaterThanDate: greaterThanDate
                },
                orderType: orderType
            }
        } else if (timeFilter) {
            filter = {
                timeFilter: {
                    lessThanDate: lessThanDate,
                    greaterThanDate: greaterThanDate
                }
            }
        } else {
            filter = {
                orderType: orderType
            }
        }
        if (increasePagenumber) {
            getOrderHistory(filter, increasePagenumber).then(filteredOrders => this.setState((prevState) => ({ orders: [...prevState.orders, ...filteredOrders] })));
        } else {
            getOrderHistory(filter).then(filteredOrders => this.setState((prevState) => ({ orders: filteredOrders })));
        }
    }

    getOrders = (increasePagenumber) => () => {
        const userRecentAction = this.state.userRecentAction;
        if (userRecentAction === "filter") {
            this.getFilteredOrders(increasePagenumber);
        } else if (userRecentAction === "search") {
            this.getSearchedOrders(increasePagenumber);
        } else {
            this.getAllOrders(increasePagenumber);
        }
    }

    orderStatusFilter = event => {
        this.setState({
            orderTypeFilter: event.target.value,
            userRecentAction: "filter"
        }, this.getFilteredOrders);
    }

    timePeriodFilter = event => {
        this.setState({
            timeFilter: event.target.value,
            userRecentAction: "filter"
        }, this.getFilteredOrders);
    }

    clearAll = event => {
        this.setState((prevState) => ({
            orderTypeFilter: "",
            timeFilter: "",
            userRecentAction: (prevState.searchedText) ? "search" : "default"
        }), this.getOrders(false));
    }

    handleSearchUpdate = (input) => {
        const { timeFilter, orderTypeFilter } = this.state;
        if (input) {
            this.setState({
                searchedText: input,
                userRecentAction: "search"
            }, this.getSearchedOrders);
        } else if (timeFilter || orderTypeFilter) {
            this.setState({
                searchedText: "",
                userRecentAction: "filter"
            }, this.getFilteredOrders);
        } else {
            this.setState({
                searchedText: "",
                userRecentAction: "default"
            }, this.getAllOrders);
        }
    }

    render() {
        const { classes, history } = this.props;
        const { orders, openFilter, anchorEl, orderTypeFilter, timeFilter, showComponent } = this.state;
        return (
            <PageTemplate history={history} handleFocus={this.handleFocus} subSection={false}>
                <section className={classes.title}>
                    <span>My Orders</span>
                    <div className={classes.orderFilterDiv} onClick={this.handleClick}>
                        <FilterIcon />
                        <span> Filter</span>
                    </div>
                </section>
                {openFilter ? <OrderFilter anchorEl={anchorEl}
                    handleClose={this.handleClose}
                    orderTypeFilter={orderTypeFilter}
                    timeFilter={timeFilter}
                    orderStatusFilter={this.orderStatusFilter}
                    timePeriodFilter={this.timePeriodFilter}
                    clearAll={this.clearAll} />
                    : null}
                <SearchBar hintText="search" searchwrapperStyle={{
                    margin: "0 16px",
                    backgroundColor: "white",
                    border: "1px solid white"
                }}
                    handleSearchUpdate={this.searchDebounced}
                />
                <section className={classes.orders}>
                    {
                        orders.length > 0 ? orders.map((order, index) => (index % 8 !== 0 || index === 0)
                            ? <Order key={order.orderId} index={index} orderData={order} history={history} />
                            : <IntersectionObserver key={order.orderId} onVisible={this.getOrders(true)} index={index}>
                                <Order index={index} orderData={order} history={history} />
                            </IntersectionObserver>)
                            : <NoResult text="No orders" showComponent={showComponent} style={{ height: "70vh" }} />
                    }
                </section>
            </PageTemplate>
        );
    }
}

export default OrderHistory
