import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { pivotProduct } from '../../../services/helpers/pivots';
import WishListItem from '../WishListItem';
import { APIProduct } from '../../../types';
import * as analytics from '../../../helpers/analytics';

const mockedItem = {
  MRP: 60,
  SP: 58.8,
  CategoryName: 'Fruit Juice',
  ProductOtherImage: [
    'https://api.reliancesmart.in//images/?name=images/hbf/h68/9006373404702.jpg',
    'https://api.reliancesmart.in//images/?name=images/h2c/hbb/9006338408478.jpg',
    'https://api.reliancesmart.in//images/?name=images/h84/h32/9006353350686.jpg',
    'https://api.reliancesmart.in//images/?name=images/h5c/hae/9006365081630.jpg',
    'https://api.reliancesmart.in//images/?name=images/he2/h0b/9006370127902.jpg'
  ],
  ProductName: 'Kato Grape Juice with Nata De Coco 330 ml',
  StoreProductId: '1000001710092643_fc',
  ProductImage: 'https://api.reliancesmart.in//images/?name=images/hbf/h68/9006373404702.jpg',
  StorePincode: '410210',
  FcId: 'VS33',
  ProductSkuId: 10092643,
  ProductSkuName: '1',
  BrandName: 'Kato',
  ProductId: 100081004,
  ProductLastUpdatedDate: '1577748676000',
  IsKA: 0,
  IsFc: 1,
  BrandId: 10004969,
  IsUKA: 0,
  isDCKA: 0,
  CategoryId: 10001089,
  Barcode: '490606980',
  CategoryIds: [
    1,
    10001761,
    10001770,
    10001089
  ],
  CategoryNames: [
    'Kirana / Provision store / Supermarket',
    'Health Drinks & Beverages',
    'Soft Drinks',
    'Fruit Juice'
  ],
  CGST: '0.0',
  IGST: '0.0',
  SGST: '0.0',
  CESS: '0.0',
  ADC: '0.0',
  IndustryId: '1',
  CompanyName: 'Taveephol Product Co., Ltd.',
  ProductAlias: 'Kato Grape Juice with Nata De Coco 330 ml 1 pcs',
  IsAvailable: 1,
  // eslint-disable-next-line max-len
  Description: 'Feel refreshed with the heavenly taste of Kato Kato Grape Juice with Nata De Coco. It tastes amazing, gives you an instant energy kick and quenches your thirst. It is also made from the finest quality of grapes and combines quality and affordability at the same time. So whether you are a child or an adult, this grape juice will satisfy your Grape cravings any time of the year. So go ahead, buy Kato Grape Juice with Nata De Coco online today!',
  ManufacturerAddress: 'null',
  // eslint-disable-next-line max-len
  Disclaimer: 'Despite our attempts to provide you with the most accurate information possible, the actual packaging, ingredients and colour of the product may sometimes vary. Please read the label, directions and warnings carefully before use.',
  SkuBulletPoint: [
    'Grape Flavour'
  ],
  BestBeforeDate: '1591079400000',
  SelectedQuantity: 0,
  FCProductId: '1000000000611413',
  UQOCID: '6',
  UQOCNAME: 'Pieces',
  UQCSHORTNAME: 'pcs'
};

describe('WishListItem component unit tests', () => {
  it('should render the component correctly', () => {
    const trackProductAnalyticsSpy = jest.spyOn(analytics, 'trackProduct').mockImplementation(jest.fn());
    const onClickItemSpy = jest.fn();
    const onClickAddSpy = jest.fn();
    const onClickDeleteSpy = jest.fn();

    const pivotedProduct = pivotProduct(mockedItem as unknown as APIProduct);

    const { asFragment, container, getByText } = render(<WishListItem
      product={pivotedProduct}
      onClickItem={onClickItemSpy}
      onClickAdd={onClickAddSpy}
      onClickDelete={onClickDeleteSpy}
    />);

    expect(asFragment()).toMatchSnapshot();

    fireEvent.click(container.firstChild as HTMLElement);
    expect(onClickItemSpy).toHaveBeenCalledTimes(1);
    expect(onClickItemSpy).toHaveBeenLastCalledWith(mockedItem.ProductSkuId);
    expect(trackProductAnalyticsSpy).not.toHaveBeenCalled();

    fireEvent.click(getByText('Add to cart'));
    expect(onClickAddSpy).toHaveBeenCalledTimes(1);
    expect(onClickAddSpy).toHaveBeenLastCalledWith(pivotedProduct);
    expect(trackProductAnalyticsSpy).toHaveBeenLastCalledWith('addToCart', {
      productID: mockedItem.ProductSkuId,
      quantity: 1,
      price: mockedItem.MRP,
      productCategory: mockedItem.CategoryName,
      purchaseJourney: 'Wishlist',
      brandName: mockedItem.BrandName,
      productName: mockedItem.ProductName
    });

    fireEvent.click(getByText('Delete'));
    expect(onClickDeleteSpy).toHaveBeenCalledTimes(1);
    expect(onClickDeleteSpy).toHaveBeenLastCalledWith(mockedItem.ProductSkuId);
    expect(trackProductAnalyticsSpy).toHaveBeenLastCalledWith('removeFromWishlist', {
      productID: mockedItem.ProductSkuId,
      quantity: 1,
      price: mockedItem.MRP,
      productCategory: mockedItem.CategoryName,
      purchaseJourney: 'Wishlist',
      brandName: mockedItem.BrandName,
      productName: mockedItem.ProductName
    });
  });
});
