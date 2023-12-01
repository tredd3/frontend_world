import * as React from 'react'
import injectSheet from 'react-jss'
import Style from './style'
import PageTemplate from '../uiControls/PageTemplate/PageTemplate'
import ShareIcon from '@material-ui/icons/Share'
import Rating from '../uiControls/rating/index'
import Coupon from '../uiControls/coupon/index'
import Divider from '@material-ui/core/Divider'
import Typography from '@material-ui/core/Typography'
import { connect } from 'react-redux'
import { productDetails } from '../../actions/productDetails'
import { similarItems } from '../../actions/similarItems'
import ImageSlider from '../uiControls/Widgets/Widget3/index'
import Button from '../uiControls/button/index'
import { cartAddExistingItem } from '../../actions/cart'
import SimilarItems from '../uiControls/Widgets/Widget7/index'
import NoResults from "../uiControls/NoResults";
import Quantity from '../uiControls/Quantity'
import UserLocation from '../uiControls/Location/UserLocation'
import Icon2 from '../../assets/images/svg/money-2.svg'
import Icon3 from '../../assets/images/svg/return.svg'
import Icon1 from '../../assets/images/svg/shipped.svg'
import InfoIcon from '../../assets/images/svg/info2.svg'
import Offer from '../uiControls/offer/index'
import Button2 from '@material-ui/core/Button'
import Suggestions from '../uiControls/Suggestions'
import { fetchApi } from '../../helper/network/fetch'
import API_ROUTES from '../../helper/network/api-routes'
import Slider from '../uiControls/ImageOverlay/Slider'
import Drawer from '@material-ui/core/Drawer'
import ExtraInformation from './ExtraInformation'
import store from "../../store";
import {
  toggleSnackBar
} from "../../actions/appState";
import SnackBar from "../uiControls/snackBar/index";
@injectSheet(Style)
@connect(
  state => {
    return {
      productDetailsResult: state.productDetails,
      similarItemResult: state.similarItems,
      fetchingApi: state.app.fetchingApi
    }
  },
  dispatch => {
    return {
      productDetails: function (productSkuId) {
        dispatch(productDetails(productSkuId))
      },
      similarItems: function (categoryId, productSkuId) {
        dispatch(similarItems(categoryId, productSkuId))
      },
      cartAddItem: function (item) {
        return dispatch(cartAddExistingItem(item))
      }
    }
  }
)
class ProductDescription extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      productQuantity: 1,
      showSuggestions: false,
      suggestionReponse: '',
      inputText: '',
      zoomImage: false,
      returnPolicyDrawer: false,
      showComponent: false,
    }
    this.productSkuId = this.props.match.params.productSkuId;
    this.categoryId = this.props.match.params.categoryId;
    this.sliderSettings = {
      dots: true
    }
  }
  componentDidUpdate(prevProps) {
    if (prevProps.fetchingApi === true && this.props.fetchingApi === false) {
      this.setState({ showComponent: true })
    }
  }
  componentDidMount() {
    const { productSkuId, categoryId } = this.props.match.params
    let storeProduct = this.props.productDetailsResult.Data
      ? this.props.productDetailsResult.Data
      : {}
    storeProduct = storeProduct.StoreProduct ? storeProduct.StoreProduct : {}

    if (Object.keys(this.props.productDetailsResult).length === 0) {
      this.props.productDetails(productSkuId)
    } else {
      // if user coming now with different productSkuId, the fetch results again
      if (storeProduct.ProductSkuId !== productSkuId) {
        this.props.productDetails(productSkuId)
      }
    }

    if (Object.keys(this.props.similarItemResult).length === 0) {
      this.props.similarItems(categoryId, productSkuId)
    } else {
      // If user now coming with different ProductSkuId or different CateogoryId
      if (
        storeProduct.ProductSkuId !== productSkuId ||
        storeProduct.CategoryId !== categoryId
      ) {
        this.props.similarItems(categoryId, productSkuId)
      }
    }
  }

  handleQuantity = event => {
    this.setState({ productQuantity: parseInt(event.target.value) })
  }

  // return the jsx for select quantity options
  quantityOptions = () => {
    let result = []
    for (var i = 0; i < 15; i++) {
      result.push(<option>{i}</option>)
    }
    return result
  }

  // trigers when adding an item i.e. clicking on add button
  handleAdd = (productSkuId, IsFc) => e => {
    var quantity = this.state.productQuantity
    this.props.cartAddItem({
      ProductSkuId: this.productSkuId,
      Quantity: quantity,
      ProductType: IsFc
    })
  }

  handleBuyNow = (productSkuId, IsFc) => e => {
    var quantity = this.state.productQuantity
    this.props
      .cartAddItem({
        ProductSkuId: this.productSkuId,
        Quantity: quantity,
        ProductType: IsFc
      })
      .then(
        () => this.props.history.push('/account/select-address')
      )
  }

  handleSeeMore = (productSkuId, categoryId) => {
    return () => {
      let { history } = this.props
      history.push({
        pathname: '/productsList/similarItems',
        state: {
          productSkuId: productSkuId,
          categoryId: categoryId,
          routeType: "SIMILAR_ITEMS"
        }
      })
    }
  }

  onClickSimilaritem = async (productSkuId, categoryId) => {
    this.productSkuId = productSkuId;
    await this.setState({ productQuantity: 1 });
    this.props.productDetails(productSkuId)
    // this.props.similarItems(categoryId, productSkuId);
  }

  //Added : 10/09/17 : Rohit
  handleFocus = () => {
    this.props.history.push('/search')
  }

  fetchSuggestion = input => {
    let body = {
      autoSuggestPayload: { searchTerm: 'fgdd' },
      geoDistance: { lat: 0.0, lon: 0.0 }
    }
    body.autoSuggestPayload.searchTerm = input
    fetchApi({ url: API_ROUTES.getSuggestions, body: body })
      .then(response => {
        this.setState({ suggestionReponse: response })
      })
      .catch(json => {
        // this.setState({ suggestionReponse: suggestionResponse })
      })
  }

  toggleDrawer = (side, open) => event => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return
    }

    // this.setState({ ...state, [side]: open });
    this.setState({
      returnPolicyDrawer: false
    })
  }

  closeSliderPortal = () => {
    this.setState({
      zoomImage: false
    })
  }

  addToWishList = (skuId) => {

    let body = {
      productCategoryId: '',
      productCategoryType: 'Wishlist',
      productType: 1,
      qty: 0,
      skuId: skuId
    }
    fetchApi({ url: API_ROUTES.addItemToWishList, body: body }).then(
      res => {
        // dispatch(productDetailsAction(res))
        store.dispatch(toggleSnackBar(true, "Item added to WishList", "success"))
      },
      error => {
        store.dispatch(toggleSnackBar(true, "Error while Adding to Wishlist", "error"))
        console.log('Error')
      }
    )
  }

  render() {
    console.log(this.state.productQuantity)
    const { classes, history } = this.props
    const { showComponent } = this.state;
    let productSkuId = this.productSkuId;
    let categoryId = this.categoryId;
    let storeProduct = this.props.productDetailsResult.Data
      ? this.props.productDetailsResult.Data
      : {}
    storeProduct = storeProduct.StoreProduct ? storeProduct.StoreProduct : {}
    let productOtherImages = storeProduct.ProductOtherImage
      ? storeProduct.ProductOtherImage
      : []
    // used in WishList
    let skuId = storeProduct.ProductSkuId ? storeProduct.ProductSkuId : "";
    let description = storeProduct.Description ? storeProduct.Description : ''
    let ingredient = storeProduct.Ingredient ? storeProduct.Ingredient : ''
    let nutritionalFacts = storeProduct.NutritionalFacts
      ? storeProduct.NutritionalFacts
      : ''
    let disclaimer = storeProduct.Disclaimer ? storeProduct.Disclaimer : ''

    // const couponAvailable = storeProduct.Coupons ? true : false;
    // const couponValue = couponAvailable ? storeProduct.CouponResult.DiscountAbsValue : "";
    let coupons = storeProduct.Coupons ? storeProduct.Coupons : {}
    let couponAvailable = false,
      couponValue
    if (Object.keys(coupons).length !== 0) {
      couponAvailable = true
      couponValue = coupons.DiscountAbsValue ? coupons.DiscountAbsValue : 0
    }
    let imageData = []
    let portalImageData = []
    for (var i = 0; i < productOtherImages.length; i++) {
      let imageUrl, name, original, thumbnail;
      if (productOtherImages[i].split("/images/")[0] == "https://uat-grocery.ril.com") {
        imageUrl = "https://preprod-static.jiomoney.com/grocery/images/" + productOtherImages[i].split("/images/")[1];
      }
      else {
        imageUrl = productOtherImages[i];
      }
      name = 'image' + i
      imageData.push({ imageUrl, name })
      original = imageUrl;
      thumbnail = imageUrl;
      portalImageData.push({ original, thumbnail })
    }
    //debugger;
    // to show corousel, just for now, adding some more fake data for images
    // for (var i = 0; i < productOtherImages.length; i++) {
    //     singleImageData.imageUrl = productOtherImages[i];
    //     singleImageData.name = "image" + i;
    //     imageData.push(singleImageData);
    // }

    let widgetData = {}
    widgetData.data = {}
    widgetData.data.products = imageData
    let IsFc = storeProduct ? storeProduct.IsFc : ''
    /*
            For similar Items
        */
    let similarItemsData = this.props.similarItemResult.Data
      ? this.props.similarItemResult.Data
      : {}
    similarItemsData = similarItemsData.Products
      ? similarItemsData.Products
      : []
    let widgetDataSimItems = {}
    widgetDataSimItems.title = 'Similar Items'
    widgetDataSimItems.deepLinkText = 'See More'
    widgetDataSimItems.data = {}
    widgetDataSimItems.data.products = similarItemsData ? similarItemsData : []
    var len = Object.keys(storeProduct).length

    let suggestedDataArray = []
    suggestedDataArray = this.state.suggestionReponse
      ? this.state.suggestionReponse.Data
      : []
    suggestedDataArray = suggestedDataArray.Suggest
      ? suggestedDataArray.Suggest
      : []
    suggestedDataArray = suggestedDataArray[`product-suggest`]
      ? suggestedDataArray[`product-suggest`]
      : []
    let inputText = this.state.inputText

    return (
      <div id="fullDiv">
        {len ? (
          <PageTemplate
            history={history}
            whiteBackground
            showCategories={false}
            // handleSearchUpdate={this.handleSearchUpdate}
            handleFocus={this.handleFocus}
          >
            <UserLocation />
            {this.state.showSuggestions ? (
              <Suggestions
                suggestedDataArray={suggestedDataArray}
                inputText={inputText}
                id="target"
                history={history}
              />
            ) : null}
            {this.state.zoomImage ? (
              <Slider
                id="fullDiv"
                portalImageData={portalImageData}
                closeSliderPortal={this.closeSliderPortal}
              />
            ) : null}
            <Drawer
              anchor="bottom"
              open={this.state.returnPolicyDrawer}
              onClose={this.toggleDrawer('bottom', false)}
            >
              <div style={{ margin: '15px' }}>
                <section>
                  <div>
                    <Typography>RETURN POLICY</Typography>
                  </div>
                  <Typography>Perishable Items :</Typography>
                  <Typography>Other Items :</Typography>
                </section>
                <Divider style={{ marginTop: '10px', marginBottom: '10px' }} />
                <section>
                  <div>
                    <Typography>RETURN POLICY</Typography>
                  </div>
                  <Typography>Perishable Items :</Typography>
                  <Typography>Other Items :</Typography>
                </section>
              </div>
            </Drawer>
            <section id="target">
              <section className={classes.productDiscriptionSection}>
                <div className={classes.brandTitle}>
                  <Typography className={classes.CategoryName}>
                    {storeProduct.CategoryName}
                  </Typography>
                  {/* <ShareIcon className={classes.shareIcon} /> */}
                </div>
                <Typography className={classes.productName}>
                  {storeProduct.ProductAlias}
                </Typography>
                {/*<Rating
                  className={classes.ratings}
                  rating={2}
                  totalRatings={5}
                />*/}
                <div className={classes.productDescriptionImage}>
                  <Offer
                    sp={storeProduct.SP}
                    mrp={storeProduct.MRP}
                    style={{ top: '24px', left: '20px', zIndex: 1 }}
                  />
                  <div onClick={e => this.setState({ zoomImage: true })}>
                    <ImageSlider
                      widgetData={widgetData}
                      backgroundSlide={true}
                      customSettings={this.sliderSettings}
                      style={{ width: '70%' }}
                    />
                  </div>
                </div>
                <div>
                  {storeProduct.MRP - storeProduct.SP !== 0 ? (
                    <section>
                      <Typography className={classes.productMRP}>
                        M.R.P : <strike> &#8377; {storeProduct.MRP}</strike>
                      </Typography>

                      <Typography className={classes.productPrice}>
                        Price : <span>&#8377; {storeProduct.SP}</span>{' '}
                        (inclusive of all taxes)
                      </Typography>
                      <Typography className={classes.productSave}>
                        You Save :{' '}
                        <span>
                          &#8377;{' '}
                          {(storeProduct.MRP - storeProduct.SP).toFixed(2)}
                        </span>{' '}
                        ({100 -
                          (storeProduct.SP / storeProduct.MRP).toFixed(2) *
                          100}%)
                      </Typography>
                    </section>
                  ) : (
                      <section>
                        <Typography className={classes.productMRP}>
                          M.R.P : {storeProduct.MRP}
                        </Typography>

                        <Typography className={classes.productPrice}>
                          Price : <span>&#8377; {storeProduct.SP}</span>{' '}
                          (inclusive of all taxes)
                      </Typography>
                      </section>
                    )}

                  <Coupon
                    className={classes.coupon}
                    available={couponAvailable}
                    value={couponValue}
                  />
                  <Quantity
                    handleChange={this.handleQuantity}
                    SelectedQuantity={this.state.productQuantity}
                  />
                  <div className={classes.addAndBuyNow}>
                    <Button
                      onClick={this.handleAdd(productSkuId, IsFc)}
                      text="Add to Cart"
                      name="useLocation"
                      style={{ padding: '7px' }}
                      wrapperStyle={{ width: '46%' }}
                      type="solidGray"
                    />
                    <Button
                      onClick={this.handleBuyNow(productSkuId, IsFc)}
                      text="Buy Now"
                      name="useLocation"
                      style={{ padding: '7px' }}
                      wrapperStyle={{ width: '46%' }}
                      type="solidTulip"
                    />
                  </div>
                  <Button2
                    style={{
                      marginTop: '10px',
                      padding: '0px',
                      color: 'rgb(26, 115, 233)'
                    }}
                    onClick={e => {
                      this.addToWishList(skuId)
                    }}
                  >
                    ADD TO WISHLIST
                  </Button2>
                </div>
              </section>
              <Divider className={classes.divider} />

              <div className={classes.deliveryInf}>
                <div>
                  <span className={classes.deliveryInfIcon2}>
                    <span className={classes.deliveryInfIcon}>
                      <img src={Icon1} />
                    </span>
                  </span>
                  <Typography className={classes.deliveryInfText}>
                    Get Tomorrow
                  </Typography>
                  {/* <Typography className = {classes.deliveryInfText}>
                                    2pm-4pm
                                </Typography> */}
                </div>
                <div>
                  <span className={classes.deliveryInfIcon2}>
                    <span className={classes.deliveryInfIcon}>
                      <img src={Icon2} />
                    </span>
                  </span>
                  <Typography className={classes.deliveryInfText}>
                    Pay on Delivery
                  </Typography>
                  <Typography className={classes.deliveryInfText}>
                    Cash/Card
                  </Typography>
                </div>
                <div>
                  <span className={classes.deliveryInfIcon2}>
                    <span className={classes.deliveryInfIcon}>
                      <img src={Icon3} />
                    </span>
                  </span>
                  <Typography className={classes.deliveryInfText}>
                    Not Returnable
                  </Typography>
                  <div
                    style={{ display: 'flex' }}
                    onClick={e => this.setState({ returnPolicyDrawer: true })}
                  >
                    <img src={InfoIcon} style={{ marginRight: '2px' }} />
                    <Typography
                      className={classes.deliveryInfText}
                      style={{ color: 'rgb(26, 115, 233)' }}
                    >
                      Return policy
                    </Typography>
                  </div>
                </div>
              </div>
              <Divider className={classes.divider} />

              {/* About this item section */}
              <section className={classes.aboutThisItem}>
                <Typography
                  style={{
                    paddingBottom: '5px',
                    fontFamily: 'OPEN SANS',
                    fontSize: '14px',
                    color: '#333333',
                    fontWeight: '600'
                  }}
                >
                  About This Item
                </Typography>
                {description.length !== 0 ? (
                  <div>
                    <ExtraInformation text1="Description" text2={description} />
                    {/* <Divider className={classes.divider2} /> */}
                  </div>
                ) : null}

                {/* {description.length !== 0 ? (
                  <div>
                    <ExtraInformation text1="Ingredients" text2={ingredient} />
                    <Divider className={classes.divider2} />
                  </div>
                ) : null}

                {description.length !== 0 ? (
                  <div>
                    <ExtraInformation
                      text1="Nutritional Facts"
                      text2={nutritionalFacts}
                    />

                  </div>
                ) : null} */}
              </section>

              <Divider className={classes.divider} />
              {/* Additional information section */}
              {/* <section className={classes.additionalInformation}>
                                Additional Information
                            </section>

                            <Divider className={classes.divider} /> */}

              {/* Similar Items section */}

              <section>
                {
                  <SimilarItems
                    widgetData={widgetDataSimItems}
                    handleSeeMore={this.handleSeeMore(productSkuId, categoryId)}
                    onClickSimilaritem={this.onClickSimilaritem}
                  />
                }
              </section>
            </section>
          </PageTemplate>
        ) : (
            <PageTemplate history={this.props.history} whiteBackground>
              <NoResults text="No results Found" showComponent={showComponent} style={{ height: "75vh" }} />
            </PageTemplate>
          )}
      </div>
    )
  }
}
export default ProductDescription
