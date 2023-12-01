/* eslint-disable max-len */
import React, { Suspense, lazy, memo } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { useSelector } from "react-redux";
import "./App.css";

import Bridge from "./components/Bridge";
import HomePage from "./components/HomePage";
import Loader from "./components/uiControls/Loader";
import SnackbarWrapper from "./components/uiControls/snackBar";
import ScrollToTop from "./components/ScrollToTop";
import { showSpinner, snackbar } from "./store/selectors/app";
import { SnackbarProvider } from "./hooks/use-snackbar";
import { CartCountProvider } from "./hooks/use-cart-count";
import { CartActionsProvider } from "./hooks/use-cart-actions";
import {
  accountUrl,
  notificationsUrl,
  cartUrl,
  productUrl,
  productSimilarItemsUrl,
  orderPlacedUrl,
  ordersUrl,
  orderSearchUrl,
  wishlistUrl,
  categoriesUrl,
  categoryUrl,
  subCategoryUrl,
  searchUrl,
  searchResultsUrl,
  collectionUrl,
} from "./helpers/urls";

const DashBoardSearch = lazy(
  () =>
    import(
      /* webpackChunkName: "dashBoard-search" */ "./components/search/DashBoardSearch"
    )
);
const ShopByCategory = lazy(
  () =>
    import(
      /* webpackChunkName: "shop-by-category" */ "./components/shopByCategory/ShopByCategory"
    )
);
const ProductDetailPage = lazy(
  () =>
    import(
      /* webpackChunkName: "product-detail-page" */ "./components/products/ProductDetailPage"
    )
);
const Account = lazy(
  () => import(/* webpackChunkName: "account" */ "./components/account")
);
const Cart = lazy(
  () => import(/* webpackChunkName: "cart" */ "./components/cart")
);
const Notifications = lazy(
  () =>
    import(/* webpackChunkName: "notifications" */ "./components/notifications")
);
const OrderDetails = lazy(
  () =>
    import(
      /* webpackChunkName: "order-details" */ "./components/orders/OrderDetails"
    )
);
const OrderPlaced = lazy(
  () =>
    import(
      /* webpackChunkName: "order-placed-page" */ "./components/orders/OrderSuccessPage"
    )
);
const OrderHistoryPage = lazy(
  () =>
    import(
      /* webpackChunkName: "order-history-page" */ "./components/orderHistory/OrderHistoryPage"
    )
);
const OrderSearchPage = lazy(
  () =>
    import(
      /* webpackChunkName: "order-search-page" */ "./components/orderHistory/OrderSearchPage"
    )
);
const WishListPage = lazy(
  () =>
    import(
      /* webpackChunkName: "wishlist" */ "./components/wishList/WishListPage"
    )
);
const CatAndSubcatProducts = lazy(
  () =>
    import(
      /* webpackChunkName: "cat-subcat-products" */ "./components/shopByCategory/catAndSubcatProducts"
    )
);
const SimilarItemsProducts = lazy(
  () =>
    import(
      /* webpackChunkName: "similar-items-products" */ "./components/SimilarItemsProducts"
    )
);
const SearchProducts = lazy(
  () =>
    import(
      /* webpackChunkName: "search-products" */ "./components/search/SearchProducts"
    )
);
const Collections = lazy(
  () => import(/* webpackChunkName: "collections" */ "./components/Collections")
);
const PgReturn = lazy(
  () =>
    import(/* webpackChunkName: "pgredirect" */ "./components/cart/PGReturn")
);

export default memo(() => {
  const spinner = useSelector(showSpinner);
  const snackbarProps = useSelector(snackbar);

  return (
    <Bridge>
      <SnackbarProvider>
        <CartCountProvider>
          <CartActionsProvider>
            {spinner ? <Loader /> : null}
            <SnackbarWrapper {...snackbarProps} />
            <Router basename={process.env.REACT_APP_BASE_ROUTER_NAME}>
              <ScrollToTop />
              <Suspense fallback={<Loader />}>
                <Switch>
                  <Route path={accountUrl} component={Account} />
                  <Route path={cartUrl} component={Cart} />
                  <Route path={notificationsUrl} component={Notifications} />
                  <Route
                    exact
                    path={productSimilarItemsUrl(":skuId")}
                    component={SimilarItemsProducts}
                  />
                  <Route
                    path={productUrl(":skuId")}
                    component={ProductDetailPage}
                  />
                  <Route
                    path={orderPlacedUrl(":skuId")}
                    component={OrderPlaced}
                  />
                  <Route path={ordersUrl} component={OrderHistoryPage} />
                  <Route path={orderSearchUrl} component={OrderSearchPage} />
                  <Route
                    path="/orders/:orderId/:shipmentId?"
                    component={OrderDetails}
                  />
                  <Route path={wishlistUrl} component={WishListPage} />
                  <Route path="/pgloader" component={PgReturn} />
                  <Route
                    exact
                    path={categoriesUrl}
                    component={ShopByCategory}
                  />
                  <Route
                    exact
                    path={categoryUrl(":categoryId")}
                    component={CatAndSubcatProducts}
                  />
                  <Route
                    path={subCategoryUrl(":categoryId", ":subCategoryId")}
                    component={CatAndSubcatProducts}
                  />
                  <Route exact path={searchUrl} component={DashBoardSearch} />
                  <Route
                    path={searchResultsUrl(":searchText")}
                    component={SearchProducts}
                  />
                  <Route
                    path={collectionUrl(":collectionId")}
                    component={Collections}
                  />
                  <Route exact path="/*" component={HomePage} />
                </Switch>
              </Suspense>
            </Router>
          </CartActionsProvider>
        </CartCountProvider>
      </SnackbarProvider>
    </Bridge>
  );
});
