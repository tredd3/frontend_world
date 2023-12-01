import React from 'react';
import HorizontalScrollableIconsWidget from './widgets/HorizontalScrollableIcons';
import PagerWidget from './widgets/Pager';
import ThinCarouselBannerWidget from './widgets/ThinCarouselBanner';
import BigSquareCarouselBannerWidget from './widgets/BigSquareCarouselBanner';
import HorizontalProductsWidget from './widgets/HorizontalProducts';
import SmallSquareCarouselBannerWidget from './widgets/SmallSquareCarouselBanner';
import W4xWidget from './widgets/W4xWidget';
import W9xWidget from './widgets/W9xWidget';
import W4xWithBannerWidget from './widgets/W4xWithBanner';
import W9xWithBannerWidget from './widgets/W9xWithBanner';
import {
  HorizontalScrollableIcons,
  Pager,
  ThinCarouselBanner,
  BigSquareCarouselBanner,
  SmallSquareCarouselBanner,
  HorizontalProducts,
  W4x,
  W9x,
  W4xWithBanner,
  W9xWithBanner,
  Widget
} from '../../services/dashboard2';

export const renderWidget = (widgetData: Widget) => {
  const { type } = widgetData;

  switch (type) {
    case 1:
      return <HorizontalScrollableIconsWidget widgetData={widgetData as HorizontalScrollableIcons} />;

    case 3:
      return <PagerWidget widgetData={widgetData as Pager} />;

    case 4:
      return <ThinCarouselBannerWidget widgetData={widgetData as ThinCarouselBanner} />;

    case 5:
      return <BigSquareCarouselBannerWidget widgetData={widgetData as BigSquareCarouselBanner} />;

    case 6:
      return <SmallSquareCarouselBannerWidget widgetData={widgetData as SmallSquareCarouselBanner} />;

    case 7:
      return <HorizontalProductsWidget widgetData={widgetData as HorizontalProducts} />;

    case 11:
      return <W4xWidget widgetData={widgetData as W4x} />;

    case 12:
      return <W9xWidget widgetData={widgetData as W9x} />;

    case 15:
      return <W4xWithBannerWidget widgetData={widgetData as W4xWithBanner} />;

    case 16:
      return <W9xWithBannerWidget widgetData={widgetData as W9xWithBanner} />;

    default:
      return null;
  }
};

