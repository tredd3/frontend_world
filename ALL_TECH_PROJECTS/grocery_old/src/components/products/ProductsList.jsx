import * as React from "react";
import PageTemplate from "../uiControls/PageTemplate/PageTemplate";
import ResultSortFunctionality from "./ResultSortFunctionality";
import SingleProduct from "./SingleProduct";
import Divider from "@material-ui/core/Divider";
import IntersectionObserver from "../IntersectionObserver";
import SortFilter from "./SortFilter";
import { fetchApi } from '../../helper/network/fetch';
import API_ROUTES from "../../helper/network/api-routes";
import Style from "./style";
import injectSheet from "react-jss";
import { connect } from "react-redux";
import UserLocation from "../uiControls/Location/UserLocation";
import NoResults from "../uiControls/NoResults";
import SubcategoryWidget from "./SubcategoryWidget"
import { homePageSeeMore } from "../../actions/homePageSeeMore";
//import { ReactComponent as FilterIcon } from '../../assets/images/svg/Filter.svg';

@injectSheet(Style)

@connect(
    state => {
        return {
            homePageSeeMore: state.homePageSeeMore,
            selectedKirana: state.kirana.selectedKirana,
            fetchingApi: state.app.fetchingApi
        }
    },
    dispatch => {
        return {
            getHomePageSeeMore: function (params) {
                return dispatch(homePageSeeMore(params));
            }
        };
    }
)

class ProductsList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            anchorEl: null,
            suggestionResponse: "",
            showSuggestions: false,
            inputText: "",
            productList: [],
            productCount: 0,
            openFilter: false,
            filterOptions: [], // array which is taken from the Api and pass to the portal
            selectedCategories: [],
            selectedBrands: [],
            selectedSortBy: [],
            productSkuId: "",
            categoryId: "",
            productName: "",
            showComponent: false,
            flag: 0 // flag 0 means that Search api is called, flag 1 means that similar items api will call
        }
        let state = props.location.state ? props.location.state : {};
        this.routeType = (Object.keys(state).length > 0 && state.routeType) ? state.routeType : "DEFAULT"
        this.subcategoryData = (Object.keys(state).length > 0 && state.subcategoryData) ? state.subcategoryData : [];
        this.categoryId = (Object.keys(state).length > 0 && state.categoryId) ? state.categoryId : 0;
        this.pageNumber = 0;
        this.pageSize = (this.routeType === 'DASHBOARD_SEEMORE' || this.routeType === 'SIMILAR_ITEMS') ? 20 : 10;
        this.fetchResultAgain = 0;
        this.productName = "ALL";
        this.sortfilterArray = [];
    }

    componentDidMount() {
        let { location, homePageSeeMore } = this.props;
        let state = location.state ? location.state : {};
        switch (this.routeType) {
            case 'SIMILAR_ITEMS':
                let categoryId = state.categoryId;
                let productSkuId = state.productSkuId;
                console.log("Call the similar Items API");
                this.setState({
                    productSkuId: productSkuId,
                    categoryId: categoryId,
                    flag: 1
                }, () => { this.fetchProductList() });
                break;
            case 'DASHBOARD_SEEMORE':
                this.manipulateResponse(homePageSeeMore);
                break;
            default:
                this.fetchProductList();
        }
    }

    componentDidUpdate(prevProps) {
        // if (this.routeType === 'DASHBOARD_SEEMORE' && prevProps.homePageSeeMore !== this.props.homePageSeeMore) {
        //     const response = this.props.homePageSeeMore;
        //     return this.manipulateResponse(response);
        // }
        if (prevProps.fetchingApi === true && this.props.fetchingApi === false) {
            this.setState({ showComponent: true })
        }
    }

    handleClick = event => {
        const { currentTarget } = event;
        //const { filterOptions } = this.state;
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

    manipulateResponse = (response) => {
        let productList = response.Data ? response.Data : [];
        let filterOptions = productList.Filters ? productList.Filters : [];
        let count = productList.Count ? productList.Count : 0;
        productList = productList.Products ? productList.Products : productList.products ? productList.products : [];

        // if state length is 0
        if (this.state.productList.length === 0 || this.pageNumber === 0) {
            if (this.state.filterOptions.length === 0) {
                this.setState({
                    productList: productList,
                    filterOptions: filterOptions,
                    productCount: count
                })
            } else {
                this.setState({
                    productList: productList,
                    productCount: count
                })
            }
        }
        else {
            this.setState((prevState) => ({ productList: [...prevState.productList, ...productList] }));
        }
    }

    fetchSubcategoryProductList = async (ProductName, CategoryId) => {
        //if a user clicks on same product again and again fetch call is not made
        if (ProductName !== this.productName) {
            this.productName = ProductName;
            this.categoryId = CategoryId;
            this.pageNumber = 0;
            await this.setState({
                filterOptions: [],
                selectedCategories: [],
                selectedBrands: [],
                selectedSortBy: []
            })
            this.fetchProductList()
        }
    }

    fetchProductList = () => {
        // body and url is set according to which API we are calling
        // if flag == 0, that means we are calling Search API
        // if flag == 1, that means we are calling Similar items API
        let body;
        let url;
        // calling search API
        if (this.state.flag === 0) {
            const { StorePincode = 0, StoreId = 0 } = this.props.selectedKirana;
            url = API_ROUTES.getProductSearch
            body = {
                "requestPayload": {
                    //"filter": { "storePincode": StorePincode, "@type": "Filter" },
                    //"filter": { "@type": "Filter" },
                    "pageNumber": this.pageNumber,
                    "pageSize": 10,
                    "queryTerm": "",
                    "source": []
                }
            }
            switch (this.routeType) {
                case "NO_RESULTS":
                    body.requestPayload.filter = { "@type": "Filter", "categoryId": 0 }
                    break;
                case "SUB_CATEGORY":
                    if (this.subcategoryData.length && this.productName === "ALL") {
                        let categoryId = [];
                        categoryId = this.subcategoryData.map(subcategory => subcategory.CategoryId.toString())
                        body.requestPayload.terms = {
                            "categoryId": categoryId
                        }
                        body.requestPayload.filter = { "@type": "Filter" }
                    } else {
                        body.requestPayload.filter = { "@type": "Filter", "categoryId": this.categoryId }
                    }
                    break;
                case "BRAND_DEEPLINK":
                    const brandName = this.props.match.params.productName;
                    body.requestPayload.filter = { "@type": "Filter", "brandName": [brandName] }
                    break;
                case "SUGGESTION":
                    const productName = this.props.match.params.productName ? this.props.match.params.productName : "";
                    body.requestPayload.queryTerm = productName
                    body.requestPayload.filter = { "@type": "Filter" }
                    break;
                default:
                    body.requestPayload.filter = { "@type": "Filter" }
            }
            if (StoreId) {
                body.requestPayload.storeId = StoreId
            }
            if (StorePincode) {
                body.requestPayload.filter.storePincode = StorePincode
            }
        } else {
            // calling Similar Items API
            url = API_ROUTES.getSimilarItems;
            body = { "requestPayload": { "filter": { "@type": "Filter", "categoryId": this.state.categoryId }, "pageNumber": this.pageNumber, "pageSize": 20, "productSkuId": this.state.productSkuId, "queryTerm": " ", "sort": {}, "type": 1 } }
        }

        if (this.state.selectedCategories.length) {
            body.requestPayload.filter["categoryName"] = this.state.selectedCategories;
        }
        if (this.state.selectedBrands.length) {
            body.requestPayload.filter["brandName"] = this.state.selectedBrands;
        }
        if (this.state.selectedSortBy.length) {
            const filterLabel = this.state.selectedSortBy[0];
            if (!this.sortfilterArray.length) {
                this.sortfilterArray = this.state.filterOptions.filter(val => val.id === "sort")[0].types;
            }
            const sortFilter = this.sortfilterArray.filter(filter => filter.text === filterLabel)
            const key = sortFilter[0].id;
            const value = sortFilter[0].value;
            body.requestPayload.sort = { [key]: value };
        }
        fetchApi({
            url: url, body: body
        }).then(response => this.manipulateResponse(response))
            .catch(error => {
                if (this.pageNumber === 0)
                    this.setState({
                        filterOptions: [],
                        productList: [],
                        productCount: 0
                    })
            })
    }

    updateFilter = async (filterKey, selectedOption, isOptionChecked) => {
        const filterType = this.state[filterKey];
        if (filterKey === "selectedSortBy") {
            await this.setState({
                selectedSortBy: [selectedOption]
            })
            return this.fetchProductList();
        }

        if (isOptionChecked) {
            if (!filterType.includes(selectedOption)) {
                let temp = filterType;
                temp.push(selectedOption);
                this.setState({
                    [filterKey]: temp
                }, this.fetchProductList())
            }
        }
        else {
            if (filterType.includes(selectedOption)) {
                let temp = filterType;
                let index = temp.indexOf(selectedOption);
                if (index > -1) {
                    temp.splice(index, 1);
                }
                this.setState({
                    [filterKey]: temp
                }, this.fetchProductList())
            }
        }
    }

    onClickSelectFilterOptions = (selectedType, selectedOption, isOptionChecked) => {
        this.pageNumber = 0;
        switch (selectedType) {
            case 'categoryName':
                this.updateFilter("selectedCategories", selectedOption, isOptionChecked)
                break;
            case 'brandName':
                this.updateFilter("selectedBrands", selectedOption, isOptionChecked)
                break;
            case 'sort':
                this.updateFilter("selectedSortBy", selectedOption, isOptionChecked)
                break;
            default:
                return ""
        }
    }

    // route to product discription page
    showProductDisc = (productSkuId, categoryId) => {
        const { history } = this.props;
        history.push(`/productDescription/${categoryId}/${productSkuId}`);
    }

    fetchSuggestion = (input) => {
        let body = { "autoSuggestPayload": { "searchTerm": "fgdd" }, "geoDistance": { "lat": 0.0, "lon": 0.0 } }
        body.autoSuggestPayload.searchTerm = input;
        fetchApi({ url: API_ROUTES.getSuggestions, body: body }).then(
            response => {
                this.setState({ suggestionReponse: response })
            }
        ).catch(json => {
            // this.setState({ suggestionReponse: suggestionResponse })
        })
    }

    onClickingSingleSearchSuggestion = (productName) => {
        this.setState({
            showSuggestions: false,
            productName: productName
        }, () => {
            this.pageNumber = 0;
            this.fetchProductList();
        })
    }
    handleFocus = () => {
        this.props.history.push('/search')
    }

    clearAll = async (e) => {
        this.pageNumber = 0;
        const { selectedCategories, selectedBrands, selectedSortBy } = this.state
        if (selectedCategories.length || selectedBrands.length || selectedSortBy.length) {
            await this.setState({
                selectedCategories: [],
                selectedBrands: [],
                selectedSortBy: []
            })
            this.fetchProductList()
        }
    }

    loadMore = () => {
        if (this.routeType === 'DASHBOARD_SEEMORE') {
            this.props.getHomePageSeeMore({ increasePagenumber: true })
        } else {
            this.pageNumber = this.pageNumber + 1;
            this.fetchProductList();
        }
    }

    getFilterCount() {
        const { selectedCategories, selectedBrands, selectedSortBy } = this.state;
        return selectedCategories.length + selectedBrands.length + selectedSortBy.length
    }

    render() {
        const { history } = this.props;
        // const { productName = "" } = this.props.match.params;
        let subcategoryData = this.subcategoryData;
        let { productList = [], openFilter, productCount, filterOptions, anchorEl, selectedCategories, selectedBrands, selectedStores, selectedSortBy, showComponent } = this.state
        let removeFilter = (this.routeType === 'DASHBOARD_SEEMORE') ? true : false;

        return (
            <PageTemplate history={history}
                handleFocus={this.handleFocus}
                showCategories={false}
                whiteBackground>
                <UserLocation />
                {(subcategoryData.length > 0) ? <SubcategoryWidget data={subcategoryData} history={history} clickHandler={this.fetchSubcategoryProductList} /> : null}
                {(productList.length === 0) ?
                    <NoResults text="No results Found" showComponent={showComponent} style={{ height: "65vh" }} /> :
                    <section id="target">
                        <ResultSortFunctionality filterCount={this.getFilterCount()} totalResult={productCount} removeFilter={removeFilter} handleClick={this.handleClick} />
                        {openFilter ? <SortFilter handleClose={this.handleClose}
                            anchorEl={anchorEl}
                            filterOptionsResults={filterOptions}
                            onClickSelectOption={this.onClickSelectFilterOptions}
                            selectedCategories={selectedCategories}
                            selectedBrands={selectedBrands}
                            selectedSortBy={selectedSortBy}
                            clearAll={this.clearAll}
                        />
                            : null}
                        <Divider />
                        <section style={{ padding: "0 10px" }}>
                            {
                                productList.map((data, index) =>
                                    (productList.length % this.pageSize === 0 && index === productList.length - 1) ?
                                        <IntersectionObserver key={index} onVisible={this.loadMore} index={index}>
                                            <SingleProduct data={data} showProductDisc={this.showProductDisc} />
                                        </IntersectionObserver> : <SingleProduct key={index} data={data} showProductDisc={this.showProductDisc} />
                                )
                            }
                        </section>
                    </section>
                }
            </PageTemplate>
        )
    }
}
export default ProductsList;
