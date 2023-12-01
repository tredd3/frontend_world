import promiseMemoize from 'promise-memoize';
import { APIDashboardProduct } from '../types/api';
import makeApiCall from './helpers/make-api-call';
import { apiRoutes } from './api-routes';
import { DashboardProductPivot } from '../types';
import { pivotDashboardProduct } from './helpers/pivots';
import { getUser } from './user';

type Banner = { id: number; imageUrl: string };
type BannerWithTitle = Banner & { title: string };
type WidgetOfType<T> = { type: T; subType: number };
type BannerWidget<T> = WidgetOfType<T> & { banners: Banner[] };

export type HorizontalScrollableIcons = WidgetOfType<1> & { banners: BannerWithTitle[] };
export type Pager = BannerWidget<3>;
export type ThinCarouselBanner = BannerWidget<4>;
export type BigSquareCarouselBanner = BannerWidget<5>;
export type SmallSquareCarouselBanner = BannerWidget<6> & { title: string }
export type HorizontalProducts = WidgetOfType<7> & {
  title: string;
  viewAllLabel: string;
  products: DashboardProductPivot[];
};
export type W4x = WidgetOfType<11> & { banners: BannerWithTitle[] };
export type W9x = WidgetOfType<12> & { banners: BannerWithTitle[] } & { title: string };
export type W4xWithBanner = BannerWidget<15> & { title: string };
export type W9xWithBanner = BannerWidget<16> & { title: string };

export type Widget =
  HorizontalScrollableIcons
  | Pager
  | ThinCarouselBanner
  | BigSquareCarouselBanner
  | SmallSquareCarouselBanner
  | HorizontalProducts
  | W4x
  | W9x
  | W4xWithBanner
  | W9xWithBanner

type DashboardRequestType = {
  pincode?: number;
  storeId?: number;
};

type APIBanner = {
  bannerId: number;
  imageUrl: string;
};

type APIMiscellaneous = {
  name: string;
  mscId: number;
  imageUrl: string;
}

type APIWidget = {
  type: Widget['type'];
  subType: number;
  title: string;
  deepLinkText: string;
  data: {
    banners: null | APIBanner[];
    products: null | APIDashboardProduct[];
    miscellaneous: null | APIMiscellaneous[];
  };
};

export type DashboardResponseType = {
  widgets: APIWidget[];
};

const widgetBase = (widget: APIWidget) => ({
  type: widget.type,
  subType: widget.subType
});

const apiBannerToBanner = (banner: APIBanner | APIMiscellaneous): Banner => ({
  id: (banner as APIBanner).bannerId || (banner as APIMiscellaneous).mscId,
  imageUrl: banner.imageUrl
});

const createBanners = ({ data: widgetData }: APIWidget): { banners: Banner[] } => ({
  banners: ((widgetData.banners || widgetData.miscellaneous || []) as (APIBanner | APIMiscellaneous)[])
    .map(apiBannerToBanner)
});

const pivotBanner = (widget: APIWidget) => ({
  ...widgetBase(widget),
  ...createBanners(widget)
});

const createBannersWithTitle = (widget: APIWidget): { banners: BannerWithTitle[] } => ({
  banners: ((widget.data.miscellaneous || [])as APIMiscellaneous[])
    .map(banner => ({
      ...apiBannerToBanner(banner),
      title: banner.name
    }))
});

const createProducts = (widget: APIWidget): { products: DashboardProductPivot[] } => ({
  products: widget.data.products!.map(pivotDashboardProduct)
});

const pivotBannersWithTitle = (widget: APIWidget) => ({
  ...widgetBase(widget),
  ...createBannersWithTitle(widget)
});

const pivotProducts = (widget: APIWidget) => ({
  ...widgetBase(widget),
  ...createProducts(widget)
});

export const pivotDashboardResponse = ({ widgets }: DashboardResponseType) => (
  widgets
    .filter(w => w.data.banners || w.data.miscellaneous || w.data.products)
    .map(widget => {
      switch (widget.type) {
        case 1: return pivotBannersWithTitle(widget) as HorizontalScrollableIcons;
        case 3: return pivotBanner(widget) as Pager;
        case 4: return pivotBanner(widget) as ThinCarouselBanner;
        case 5: return pivotBanner(widget) as BigSquareCarouselBanner;
        case 6:
          return {
            ...widgetBase(widget),
            title: widget.title,
            ...createBanners(widget)
          } as SmallSquareCarouselBanner;
        case 7:
          return {
            title: widget.title,
            viewAllLabel: widget.deepLinkText,
            ...pivotProducts(widget)
          } as HorizontalProducts;
        case 11: return pivotBannersWithTitle(widget) as W4x;
        case 12:
          return {
            title: widget.title,
            ...pivotBannersWithTitle(widget)
          } as W9x;
        case 15: return {
          ...widgetBase(widget),
          title: widget.title,
          ...createBanners(widget)
        } as W4xWithBanner;
        case 16: return {
          ...widgetBase(widget),
          title: widget.title,
          ...createBanners(widget)
        } as W9xWithBanner;
        default: return null;
      }
    })
    .filter(<T>(x: T | null): x is T => x !== null)
);

export const getWidgetDefinitions = promiseMemoize(async () => {
  const { preferences: { pincode, storeId = 0 } } = await getUser();

  const apiWidgets = await makeApiCall<DashboardRequestType, DashboardResponseType>(apiRoutes.getDashboard, {
    body: { pincode, storeId }
  });

  return pivotDashboardResponse(apiWidgets);
}, { resolve: 'json' });
