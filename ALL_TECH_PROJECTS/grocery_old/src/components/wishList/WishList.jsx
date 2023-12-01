import * as React from 'react'
import PageTemplate from '../uiControls/PageTemplate/PageTemplate'
import NoResults from '../uiControls/NoResults'
import injectSheet from 'react-jss'
import style from './style'
import API_ROUTES from '../../helper/network/api-routes'
import { fetchApi } from '../../helper/network/fetch'
import SingleWishListProduct from './SingleWishListProduct'
import NoWishListImage from "../../assets/images/svg/noWishlist.svg";
import { connect } from 'react-redux';
import { cartAddExistingItem } from "../../actions/cart";
import store from "../../store";
import { toggleSnackBar } from "../../actions/appState";

@injectSheet(style)
@connect(
  state => {
    return {
      fetchingApi: state.app.fetchingApi
    }
  },
  dispatch => {
    return {
      cartAddItem: function (item) {
        return dispatch(cartAddExistingItem(item))
      }
    }
  }
)
class WishList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      wishListData: {},
      showComponent: false
    }
  }

  componentDidMount() {
    // Get the WishList
    // https://api-sit.jio.com/jiokart/v1/jiogrocery/get/item/list
    // let body = {"Request":{"Body":,"Header":{"DeviceId":"afc7b542de81a973","Product":1,"RequestId":"1906761615","RequestTime":1566973134831,"Version":1.0}}}
    this.getWishListData();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.fetchingApi === true && this.props.fetchingApi === false) {
      this.setState({ showComponent: true })
    }
  }

  getWishListData = () => {
    let body = { productCategoryType: 'Wishlist' }
    fetchApi({
      url: API_ROUTES.getWishListData,
      body: body
    })
      .then(response => {
        this.setState({ wishListData: response })
      })
      .catch(json => {
        console.log('Suggestion Response in catch block')
      })
  }

  showProductDisc = (productSkuId, categoryId) => {
    const { history } = this.props
    history.push(`/productDescription/${categoryId}/${productSkuId}`)
  }

  deleteWishListItem = (productSkuId) => {
    let body = {
      productCategoryId: '',
      productCategoryType: 'Wishlist',
      productType: 1,
      qty: 0,
      skuId: productSkuId
    }
    fetchApi({ url: API_ROUTES.removeItemToWishList, body: body }).then(
      res => {
        // dispatch(productDetailsAction(res))
        store.dispatch(toggleSnackBar(true, "Item Deleted From WishList", "success"))
        this.getWishListData();
      },
      error => {
        store.dispatch(toggleSnackBar(true, "Error while Deleting", "success"))
        console.log('Error')
      }
    )
  }

  addToCart = (ProductSkuId, quantity, IsFc) => {
    this.props.cartAddItem({ ProductSkuId, Quantity: quantity, ProductType: IsFc });
  }
  render() {
    const { history, classes } = this.props
    const { showComponent } = this.state;
    let wishListData = this.state.wishListData
      ? this.state.wishListData.Data
      : {}
    let products = wishListData ? wishListData.Products : []
    return (
      <PageTemplate
        history={history}
        subSection={false}
        deliverySection={false}
        title={'JioMart'}
      >
        {products.length !== 0 ? (
          products.map(data => {
            return (
              <div style={{ paddingLeft: '15px', paddingRight: '15px' }}>
                <SingleWishListProduct
                  data={data}
                  showProductDisc={this.showProductDisc}
                  deleteWishListItem={this.deleteWishListItem}
                  addToCart={this.addToCart}
                />
              </div>
            )
          })
        ) : <NoResults text="No Wish List" imgSrc={NoWishListImage} showComponent={showComponent} style={{ height: "80vh" }} />
        }
      </PageTemplate>
    )
  }
}
export default WishList
