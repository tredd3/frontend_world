import promiseMemoize from 'promise-memoize';
import { ValueOf, KiranaPivot, APIKirana } from '../types';
import { getAddressById, getDefaultAddress } from './address';
import makeApiCall from './helpers/make-api-call';
import { apiRoutes } from './api-routes';
import { getUser } from './user';
import paginated, { Paginated } from './helpers/paginated';

const kiranaSort = {
  0: 'closest-first',
  3: 'alphabetical'
} as const;

export type KiranaSortOptions = ValueOf<typeof kiranaSort>;

const filterIdFromKiranaSort = (sort: KiranaSortOptions): keyof typeof kiranaSort => (
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  Number(Object.keys(kiranaSort)
    .find(key => kiranaSort[key as unknown as keyof typeof kiranaSort] === sort)!) as keyof typeof kiranaSort
);

type GetKiranasOptions = {
  page?: number;
  sort?: KiranaSortOptions;
  addressId?: number;
}

type GetKiranasRequestBody = {
  Lat: number;
  Long: number;
  Pincode: number;
  CustomerId: number;
  IsFavorite: 1;
  PageNo: number;
  FilterType: keyof typeof kiranaSort;
};

type GetKiranaResponse = {
  Stores: APIKirana[];
  Invites: APIKirana[];
  NextPage: number | null;
};

const convertAPIKiranaToKirana = (apiKirana: APIKirana): KiranaPivot => ({
  id: apiKirana.StoreId,
  mId: apiKirana.MID,
  name: apiKirana.Name,
  image: apiKirana.Image,
  minOrder: apiKirana.MinOrder,
  isClosed: Boolean(apiKirana.IsClosed),
  deliveryTime: {
    from: apiKirana.NextDelivery.split('-')[0],
    to: apiKirana.NextDelivery.split('-')[1]
  },
  rating: {
    amount: apiKirana.Rating,
    outOf: apiKirana.RatingOutOf
  },
  distance: {
    amount: apiKirana.Distance,
    unit: apiKirana.Unit as 'm' | 'km'
  },
  categoryName: apiKirana.CategoryName,
  phoneNumber: apiKirana.StoreMobile,
  location: {
    address: apiKirana.Address,
    lat: apiKirana.Lat,
    lng: apiKirana.Lon,
    pincode: apiKirana.StorePincode
  },
  nextDelivery: apiKirana.NextDelivery
});

// eslint-disable-next-line camelcase, @typescript-eslint/camelcase
export const DEPRECATED_convertKiranaToAPIKirana = (kirana: KiranaPivot): APIKirana => ({
  StoreId: kirana.id,
  MID: kirana.mId,
  Name: kirana.name,
  Image: kirana.image,
  MinOrder: kirana.minOrder,
  Rating: kirana.rating.amount,
  RatingOutOf: kirana.rating.outOf,
  Distance: kirana.distance.amount,
  Unit: kirana.distance.unit,
  CategoryName: kirana.categoryName,
  StoreMobile: kirana.phoneNumber,
  Address: kirana.location.address,
  Lat: kirana.location.lat,
  Lon: kirana.location.lng,
  IsClosed: kirana.isClosed ? 1 : 0,
  NextDelivery: `${kirana.deliveryTime.from}-${kirana.deliveryTime.to}`,
  StorePincode: kirana.location.pincode
});

type GetKiranasReturnType = {
  invites: KiranaPivot[];
  kiranas: KiranaPivot[];
  nextPage: number | null;
};

export const getKiranas = async ({
  page = 0, sort = 'closest-first', addressId
}: GetKiranasOptions = {}): Promise<GetKiranasReturnType> => {
  const matchingAddress = addressId
    ? await getAddressById(addressId)
    : await getDefaultAddress();

  if (!matchingAddress) throw new Error('Please select an address in your profile');

  const { pincode, latitude, longitude } = matchingAddress;

  const { Stores, Invites, NextPage } = await makeApiCall<GetKiranasRequestBody, GetKiranaResponse>(
    apiRoutes.getStores, {
      body: {
        Lat: latitude,
        Long: longitude,
        Pincode: pincode,
        CustomerId: (await getUser()).userId,
        IsFavorite: 1,
        PageNo: page,
        FilterType: filterIdFromKiranaSort(sort)
      }
    }
  );

  return {
    kiranas: Stores.map(convertAPIKiranaToKirana),
    invites: Invites.map(convertAPIKiranaToKirana),
    nextPage: NextPage || 0
  };
};

export type PaginatedKiranas = Paginated<{
  kiranas: KiranaPivot[];
  invites: KiranaPivot[];
}>

export const internalGetKiranaPage = promiseMemoize(async (
  pageNumber = 0,
  { addressId, sort = 'closest-first' }: {addressId?: number; sort: ValueOf<typeof kiranaSort>}
) => {
  const matchingAddress = addressId
    ? await getAddressById(addressId)
    : await getDefaultAddress();

  if (!matchingAddress) throw new Error('Please select an address in your profile');

  const { pincode, latitude, longitude } = matchingAddress;

  const { Stores, Invites, NextPage } = await makeApiCall<GetKiranasRequestBody, GetKiranaResponse>(
    apiRoutes.getStores, {
      body: {
        Lat: latitude,
        Long: longitude,
        Pincode: pincode,
        CustomerId: (await getUser()).userId,
        IsFavorite: 1,
        PageNo: pageNumber,
        FilterType: filterIdFromKiranaSort(sort)
      }
    }
  );

  return {
    nextPage: NextPage || null,
    data: {
      kiranas: Stores.map(convertAPIKiranaToKirana),
      invites: Invites.map(convertAPIKiranaToKirana)
    }
  };
}, { resolve: 'json' });

export const getPaginatedKiranas = paginated(
  internalGetKiranaPage,
  (oldData, newData) => ({
    kiranas: [...(oldData ? oldData.kiranas : []), ...newData.kiranas],
    invites: [...(oldData ? oldData.invites : []), ...newData.kiranas]
  })
);
