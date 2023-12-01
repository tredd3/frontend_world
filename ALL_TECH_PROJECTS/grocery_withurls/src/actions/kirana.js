import API_ROUTES from '../helpers/network/api-routes';
import { fetchApi } from '../helpers/network/fetch';
import { selectAddr } from './address';
import { cartGetItems } from './cart';
import { updateUser } from './user';
import { toggleSnackBar } from './appState';
// eslint-disable-next-line camelcase, @typescript-eslint/camelcase
import { getKiranas, DEPRECATED_convertKiranaToAPIKirana } from '../services/kirana';

export const CHANGE_KIRANA = 'CHANGE_KIRANA';
export const ADD_KIRANAS = 'ADD_KIRANAS';
export const ADD_INVITES = 'ADD_INVITES';
export const STORE_NEXT_PAGE = 'STORE_NEXT_PAGE';

export const changeKiranaAction = kirana => ({
  type: CHANGE_KIRANA,
  kirana
});

export const addKiranas = kiranas => ({
  type: ADD_KIRANAS,
  kiranas
});

export const addInvites = invites => ({
  type: ADD_INVITES,
  invites
});

export const nextPage = payload => ({
  type: STORE_NEXT_PAGE,
  payload
});

export const getAllStores = (PageNo = 0, FilterType = 'closest-first', addressId = 0) => (dispatch, getState) => (
  getKiranas({
    page: PageNo,
    sort: FilterType,
    addressId
  }).then(({ invites, kiranas, nextPage: next }) => {
    dispatch(addKiranas([
      ...((PageNo !== 0) ? getState().kirana.all : []),
      ...kiranas.map(DEPRECATED_convertKiranaToAPIKirana)
    ]));
    dispatch(addInvites(invites.map(DEPRECATED_convertKiranaToAPIKirana)));
    dispatch(nextPage(next));
  }).catch(error => {
    // const message = error.Control ? error.Control.Message : 'Error in Getting stores. Please try again';
    dispatch(toggleSnackBar(true, error.message, 'error'));
  })
);

const addUpdateAddress = data => fetchApi({
  url: API_ROUTES.saveAddress,
  body: data
});

export const saveStoreWithAddress = (kirana, history) => (dispatch, getState) => {
  const { address } = getState().userAddress;
  const addr = {
    ...address, storeId: kirana.StoreId, storeName: kirana.Name, MID: kirana.MID
  };
  addUpdateAddress(addr)
    .then(() => {
      localStorage.setItem('previousCartValue', getState().cart.TotalPay);
      return Promise.all([
        dispatch(selectAddr(addr)),
        dispatch(changeKiranaAction(kirana))
      ]);
    })
    .then(() => dispatch(cartGetItems()).then(() => {
      const previousCartValue = localStorage.getItem('previousCartValue');
      const { cart } = getState();
      if (Number(previousCartValue) === cart.TotalPay) {
        dispatch(cartGetItems(undefined, 1))
          .then(() => history.push('/cart/delivery-options'));
      } else {
        history.push('/cart/update');
      }
    }));
};

export const removePreferredKirana = () => (dispatch, getState) => (
  Promise.all([dispatch(updateUser({
    ...getState().user,
    storeId: 0,
    storeName: ' '
  })),
  dispatch(changeKiranaAction({}))])
);

export const changeKirana = kirana => (dispatch, getState) => (
  Promise.all([dispatch(updateUser({
    ...getState().user,
    storeId: kirana.StoreId,
    storeName: kirana.Name
  })),
  dispatch(changeKiranaAction(kirana))])
);
