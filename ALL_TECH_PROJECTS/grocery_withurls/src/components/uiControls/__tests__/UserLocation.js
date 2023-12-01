import React from 'react';
import { render, fireEvent, wait } from '@testing-library/react';
import UserLocation, { LocationDrawer } from '../UserLocation';
import * as UserService from '../../../services/user';
import * as AddressService from '../../../services/address';
import * as Intents from '../../../intents';
import mockDB from '../../../mocks/db.json';
import { pivotAPIUser } from '../../../services/helpers/pivots';

describe('User Location', () => {
  it('should display userLocation component', async () => {
    const mockGetUser = async () => (pivotAPIUser(mockDB.user.Data));
    const getUser = jest.spyOn(UserService, 'getUser').mockImplementation(mockGetUser);
    const { getByTestId } = render(<UserLocation />);
    await wait();
    expect(getUser).toBeCalledTimes(1);
    expect(getByTestId('user-location')).toBeInTheDocument();
  });

  it('when isEditable, should display locationDrawer', async () => {
    const mockGetUser = async () => (pivotAPIUser(mockDB.user.Data));
    jest.spyOn(UserService, 'getUser').mockImplementation(mockGetUser);
    const { getByTestId, queryByTestId } = render(<UserLocation isEditable />);
    await wait();
    expect(getByTestId('user-location')).toBeInTheDocument();
    fireEvent.click(queryByTestId('user-location'));
    await wait();
    expect(queryByTestId('location-drawer')).toBeInTheDocument();
  });
});

describe('Location Drawer', () => {
  let locationDrawer;
  beforeEach(() => {
    locationDrawer = render(<LocationDrawer isLocationDrawerOpen hideLocationDrawer={jest.fn()} showLocationDrawer={jest.fn()} />);
  });

  it('should contain the location and pincode buttons initially', () => {
    const { getByTestId, getByText } = locationDrawer;
    expect(getByTestId('location-drawer')).toBeInTheDocument();
    expect(getByText('Use my current location')).toBeInTheDocument();
    expect(getByText('Enter a pincode')).toBeInTheDocument();
  });

  it('should display pincode input when `Enter a pincode` button is clicked', () => {
    const { getByText, getByPlaceholderText } = locationDrawer;
    fireEvent.click(getByText('Enter a pincode'));
    expect(getByPlaceholderText('Enter Pincode')).toBeInTheDocument();
    expect(getByText('Enter a pincode')).toBeDisabled();
    fireEvent.change(getByPlaceholderText('Enter Pincode'), { target: { value: '123456' } });
    expect(getByText('Enter a pincode')).not.toBeDisabled();
  });

  it('should display an error when an unservicable pincode is entered', async () => {
    const { getByText, getByPlaceholderText, queryByTestId } = locationDrawer;
    const mockIsAreaServiceable = async () => false;
    const isServiceable = jest.spyOn(AddressService, 'isAreaServiceable').mockImplementation(mockIsAreaServiceable);
    fireEvent.click(getByText('Enter a pincode'));
    const unservicablePincode = '123456';
    fireEvent.change(getByPlaceholderText('Enter Pincode'), { target: { value: unservicablePincode } });
    fireEvent.click(getByText('Enter a pincode'));
    await wait();
    expect(queryByTestId('pincode-error').textContent)
      .toContain(`Currently service not available in your pincode ${unservicablePincode}. Try a different location`);
    expect(isServiceable).toBeCalledTimes(1);
    expect(isServiceable.mock.calls[0][0]).toBeObject({ pincode: unservicablePincode });
  });

  it('should call update user when a serviceable pincode is entered', async () => {
    const { getByText, getByPlaceholderText } = locationDrawer;
    const mockIsAreaServiceable = async () => true;
    const mockUpdateUser = async () => ({});
    jest.spyOn(AddressService, 'isAreaServiceable').mockImplementation(mockIsAreaServiceable);
    jest.spyOn(window.location, 'reload').mockImplementation(() => ({}));
    const updateUser = jest.spyOn(UserService, 'updateUser').mockImplementation(mockUpdateUser);
    fireEvent.click(getByText('Enter a pincode'));
    const serviceablePincode = '123456';
    fireEvent.change(getByPlaceholderText('Enter Pincode'), { target: { value: serviceablePincode } });
    fireEvent.click(getByText('Enter a pincode'));
    await wait();
    expect(updateUser).toBeCalledTimes(1);
    expect(updateUser.mock.calls[0][0]).toBeObject({ pincode: serviceablePincode });
    updateUser.mockClear();
  });

  it('should call native intent when clicked on get location', async () => {
    const { getByText } = locationDrawer;
    const latLngFromNative = { lat: '91.9', lng: '95.0' };
    const mockUpdateUser = async () => ({});
    const mockGetLatLng = async () => (latLngFromNative);
    const updateUser = jest.spyOn(UserService, 'updateUser').mockImplementation(mockUpdateUser);
    const getLatLng = jest.spyOn(Intents, 'getLatLng').mockImplementation(mockGetLatLng);
    fireEvent.click(getByText('Use my current location'));
    await wait();
    expect(updateUser).toBeCalledTimes(1);
    expect(getLatLng).toBeCalledTimes(1);
    expect(updateUser.mock.calls[0][0]).toBeObject(latLngFromNative);
  });

  it('should call display an error if an invalid pincode is entered', async () => {
    const { getByText, getByPlaceholderText, queryByText } = locationDrawer;
    fireEvent.click(getByText('Enter a pincode'));
    const serviceablePincode = '123e56';
    fireEvent.change(getByPlaceholderText('Enter Pincode'), { target: { value: serviceablePincode } });
    expect(queryByText('Enter Valid 6-digit pincode')).not.toBeInTheDocument();
    fireEvent.click(getByText('Enter a pincode'));
    await wait();
    expect(getByText('Enter Valid 6-digit pincode')).toBeInTheDocument();
  });
});
