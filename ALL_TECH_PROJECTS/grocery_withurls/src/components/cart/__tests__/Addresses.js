import React from 'react';
import { render, wait, fireEvent } from '@testing-library/react';
import { MemoryRouter, Router, Route } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import Addresses from '../Addresses';
import {
  getAddresses, getDefaultAddress, getAddressById, deleteKiranaFromAddress
} from '../../../services/address';
import { getUser } from '../../../services/user';
import { SnackbarProvider } from '../../../hooks/use-snackbar';

jest.mock('../../../services/address', () => ({
  getAddresses: jest.fn(),
  getDefaultAddress: jest.fn(),
  getAddressById: jest.fn(),
  deleteKiranaFromAddress: jest.fn()
}));

jest.mock('../../../services/user', () => ({
  getUser: jest.fn()
}));

const addressWithoutStore = {
  id: 123123,
  pincode: 400701,
  latitude: 19.5,
  longitude: 72.8,
  firstName: 'FirstName',
  lastName: 'LastName',
  addressTag: 'home',
  address: 'Composite address',
  addressLine1: 'Address line 1',
  addressLine2: 'Address line 2',
  addressLine3: 'Address line 3',
  cityName: 'Atlantis',
  isDefault: true
};

describe('Cart addresses listing', () => {
  it('should render an empty address list correctly', async () => {
    getAddresses.mockImplementation(async () => []);
    getDefaultAddress.mockImplementation(async () => undefined);

    const { getByText, queryByText } = render(
      <MemoryRouter>
        <Addresses />
      </MemoryRouter>
    );

    await wait();

    expect(getByText('My addresses')).toBeInTheDocument();
    expect(getByText('+ Add address')).toBeInTheDocument();
    expect(getByText('noaddress.svg')).toBeInTheDocument();
    expect(queryByText('Deliver to this address')).not.toBeInTheDocument();
  });

  it.skip('should behave as expected when there\'s no store associated with the address', async () => {
    getAddresses.mockImplementation(async () => [addressWithoutStore]);
    getDefaultAddress.mockImplementation(async () => addressWithoutStore);
    getAddressById.mockImplementation(async () => addressWithoutStore);
    getUser.mockImplementation(async () => ({ preferences: {} }));

    const history = createMemoryHistory();
    history.push('/cart/addresses');

    const { getByText, getByRole } = render(
      <Router history={history}>
        <Route path="/cart/addresses" component={Addresses} />
      </Router>
    );

    await wait();

    expect(getByText('Default address')).toBeInTheDocument();
    expect(getByText('FirstName LastName')).toBeInTheDocument();
    expect(getByText('home')).toBeInTheDocument();
    expect(getByRole('radio')).toBeInTheDocument();

    expect(history.location.search).toBe('?addressId=123123');

    const addressEditIcon = getByText('address_pencil_outline.xml.svg');
    expect(addressEditIcon).toBeInTheDocument();
    expect(addressEditIcon.parentNode.href).toEndWith('/cart/addresses/123123/map');

    expect(getByText('+ Add kirana partner')).toBeInTheDocument();

    expect(getByText('Deliver to this address')).toBeInTheDocument();
    fireEvent.click(getByText('Deliver to this address'));
    await wait();

    expect(getByText('Select local kirana partner')).toBeInTheDocument();
    fireEvent.click(getByText('Select local kirana partner'));
    await wait();

    expect(history.location.pathname).toBe('/cart/addresses/123123/select-kirana');
  });

  // eslint-disable-next-line max-len
  it.skip('should behave as expected when there\'s a store associated with the address, which matches the user\'s preferred address', async () => {
    const addressWithStore = {
      ...addressWithoutStore,
      storeId: 123456,
      storeName: 'Acme Inc.'
    };
    getAddresses.mockImplementation(async () => [addressWithStore]);
    getDefaultAddress.mockImplementation(async () => addressWithStore);
    getAddressById.mockImplementation(async () => addressWithStore);
    getUser.mockImplementation(async () => ({ preferences: { storeId: 123456 } }));
    deleteKiranaFromAddress.mockImplementation(async () => null);

    const history = createMemoryHistory();
    const { getByText, getByRole, getAllByText } = render(
      <SnackbarProvider>
        <Router history={history}>
          <Route path="/cart/addresses" component={Addresses} />
        </Router>
      </SnackbarProvider>
    );

    history.push('/cart/addresses');
    await wait();

    expect(getByText('Default address')).toBeInTheDocument();
    expect(getByText('FirstName LastName')).toBeInTheDocument();
    expect(getByText('home')).toBeInTheDocument();
    expect(getByRole('radio')).toBeInTheDocument();

    expect(history.location.search).toBe('?addressId=123123');

    const [addressEditIcon, kiranaEditIcon] = getAllByText('address_pencil_outline.xml.svg');
    expect(addressEditIcon).toBeInTheDocument();
    expect(addressEditIcon.parentNode.href).toEndWith('/cart/addresses/123123/map');

    expect(getByText('Acme Inc.')).toBeInTheDocument();
    expect(kiranaEditIcon).toBeInTheDocument();
    expect(kiranaEditIcon.parentNode.href).toEndWith('/cart/addresses/123123/select-kirana');

    const kiranaDeleteIcon = getByText('delete_icon.svg');
    expect(kiranaDeleteIcon).toBeInTheDocument();
    fireEvent.click(kiranaDeleteIcon);
    expect(deleteKiranaFromAddress.mock.calls.length).toBe(1);
    expect(deleteKiranaFromAddress.mock.calls[0][0]).toBe(123123);

    // The delete kirana action above doesn't actually work because
    // of the mocks. So, it doesn't affect the rest of the tests.
    expect(getByText('Deliver to this address')).toBeInTheDocument();
    fireEvent.click(getByText('Deliver to this address'));
    await wait();

    expect(history.location.pathname).toEndWith('/cart/addresses/123123/delivery-options');
  });
});
