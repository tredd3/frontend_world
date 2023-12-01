import API_ROUTES from '../helpers/network/api-routes';
import { fetchApi } from '../helpers/network/fetch';

// action type
export const HOMEPAGE_SEEMORE = 'HOMEPAGE_SEEMORE';

// action creator
const homePageSeeMoreAction = (data, pagination) => ({
  type: HOMEPAGE_SEEMORE,
  data,
  pagination
});

export const homePageSeeMore = (() => {
  let pageNum = 0; let Type = 0; let SubType = 0; let
    BannerId = 0;
  return function homePageSeeMore({
    type, subType, bannerId, increasePagenumber = false
  }) {
    if (increasePagenumber) {
      pageNum += 1;
    } else {
      pageNum = 0;
      Type = type;
      SubType = subType;
      BannerId = bannerId;
    }
    return (dispatch, getState) => {
      const userId = getState().user.userId || 10701039;
      const {
        pincode = 0, latitude = 0, longitude = 0, storeId = 0
      } = getState().userAddress.address;

      const body = {
        bannerId: BannerId,
        isFC: 1,
        latitude: latitude || 0,
        longitude: longitude || 0,
        mobileNo: '0000000000',
        pageNum,
        pincode: pincode || 0,
        size: 20,
        storeId,
        subType: SubType,
        type: Type,
        userId
      };

      return fetchApi({ url: API_ROUTES.viewAllDashboard, body, showSnackbar: false })
        .then(response => dispatch(homePageSeeMoreAction(response, increasePagenumber)));
    };
  };
})();
