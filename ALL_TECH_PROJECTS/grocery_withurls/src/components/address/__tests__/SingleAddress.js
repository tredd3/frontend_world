import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import SingleAddress from '../SingleAddress';

const address = {
  firstName: 'John',
  lastName: 'Doe',
  isDefault: true,
  addedDate: '2019-03-05',
  addressTag: 'home',
  addressLine1: 'Line 1',
  addressLine2: 'Line 2',
  addressLine3: 'Line 3',
  phoneNumber: 9100100100
};

describe('SingleAddress', () => {
  it('should render a single address (default address)', () => {
    const onAddressSelected = jest.fn();
    const onDeleteClick = jest.fn();

    const { getByText, queryByRole, queryAllByRole } = render(
      <Router history={createMemoryHistory()}>
        <SingleAddress
          address={address}
          editHref="/path/to/edit"
          isSelected={false}
          kiranaHref="/path/to/kirana"
          onAddressSelected={onAddressSelected}
          onDeleteClick={onDeleteClick}
        />
      </Router>
    );

    expect(getByText('John Doe')).toBeInTheDocument();
    expect(getByText('Default address')).toBeInTheDocument();
    expect(getByText('Line 1, Line 2, Line 3')).toBeInTheDocument();
    expect(getByText('home')).toBeInTheDocument();
    expect(queryByRole('button')).not.toBeInTheDocument();
    queryAllByRole('link').forEach(link => {
      expect(link.getAttribute('href')).toBeOneOf(['/path/to/edit', '/path/to/kirana']);
    });
    expect(getByText('9100100100')).toBeInTheDocument();
    expect(getByText('+ Add kirana partner')).toBeInTheDocument();
  });

  it('should render a single address (non-default address)', () => {
    const onAddressSelected = jest.fn();
    const onDeleteKirana = jest.fn();
    const onDeleteAddress = jest.fn();

    const {
      getByText, getByRole, queryByText
    } = render(
      <Router history={createMemoryHistory()}>
        <SingleAddress
          address={{ ...address, isDefault: false }}
          editHref="/path/to/edit"
          isSelected={false}
          kiranaHref="/path/to/kirana"
          onAddressSelected={onAddressSelected}
          onDeleteKirana={onDeleteKirana}
          onDeleteAddress={onDeleteAddress}
        />
      </Router>
    );

    expect(getByText('John Doe')).toBeInTheDocument();
    expect(queryByText('Default address')).not.toBeInTheDocument();
    expect(getByText('Line 1, Line 2, Line 3')).toBeInTheDocument();
    expect(getByText('home')).toBeInTheDocument();
    expect(getByRole('button')).toBeInTheDocument();
    fireEvent.click(getByRole('button'));
    expect(onDeleteAddress).toHaveBeenCalledTimes(1);
  });
});
