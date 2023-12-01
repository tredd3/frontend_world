import API_ROUTES from "../helper/network/api-routes"
import { fetchApi } from "../helper/network/fetch";
import { selectAddr } from "./address"

export const CHANGE_KIRANA = 'CHANGE_KIRANA'
export const ADD_KIRANAS = 'ADD_KIRANAS'
export const ADD_INVITES = 'ADD_INVITES'


export const changeKiranaAction = (kirana) => ({
  type: CHANGE_KIRANA,
  kirana
})

export const addKiranas = (kiranas) => ({
  type: ADD_KIRANAS,
  kiranas
})

export const addInvites = (invites) => ({
  type: ADD_INVITES,
  invites
})


export const getAllStores = (PageNo = 0, FilterType = 0) => {
  return (dispatch, getState) => {

    const { pincode, latitude, longitude, userId } = getState().userAddress.address
    fetchApi({
      url: API_ROUTES.getStores,
      body: {
        Lat: latitude,
        Long: longitude,
        Pincode: pincode,
        CustomerId: userId,
        IsFavorite: 1,
        PageNo,
        FilterType
      }
    }).then(res =>
      Promise.all([
        dispatch(addKiranas(res.Data.Stores)),
        //dispatch(addInvites(res.Data.Invites))
      ])
    )
      .catch(e => {
        console.log("ERROR in getting Stores ")
      });
  }
}

const addUpdateAddress = (data) => {
  return fetchApi({
    url: API_ROUTES.saveAddress,
    body: data
  })
    .then(response => {
      return response
    })
    .catch(error => {
      throw error
    })
}



export const saveStoreWithAddress = (kirana, history) => {
  return (dispatch, getState) => {
    const { address } = getState().userAddress;
    let addr = { ...address, storeId: kirana.StoreId, MID: kirana.MID };
    addUpdateAddress(addr)
      .then(() => {
        localStorage.setItem('defaultAddress', JSON.stringify(addr));
        localStorage.setItem('preferedStore', JSON.stringify(kirana));
        localStorage.setItem('previousCartValue', getState().cart.TotalPay);
        return Promise.all([
          dispatch(selectAddr(addr)),
          dispatch(changeKiranaAction(kirana)),
        ])
      })
      .then(() => {
        //when do we need to Update cart? all time? and when to hit direct delivery Modes.
        const location = {
          pathname: "/cart/update"
        };
        history.push(location);
      })
      .catch(e => {
        console.log("Some error while saving store in address  ")
      })
  }
}

export const changeKirana = (kirana) => {
  return (dispatch, getState) => {
    const { address } = getState().userAddress;
    let addr = { ...address, storeId: kirana.StoreId, MID: kirana.MID };
    localStorage.setItem('defaultAddress', JSON.stringify(addr));
    localStorage.setItem('preferedStore', JSON.stringify(kirana))
    return dispatch(changeKiranaAction(kirana))
    // addUpdateAddress(addr)
    // .then(()=>{
    // return Promise.all([
    // dispatch(selectAddr(addr)),
    // ])
    // })
    // .catch(e=>{
    //   console.log("Some error while selecting kirana came.  ")
    // })
  }
}