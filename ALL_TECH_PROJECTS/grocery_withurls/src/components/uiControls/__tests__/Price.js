import React from 'react';
import { render } from '@testing-library/react';
import Price from '../Price';

describe('Price', () => {
  it('should display only the sp if mrp is same as sp', () => {
    const { getByText } = render(<Price sp={100} mrp={100} />);

    expect(getByText('₹100')).toBeInTheDocument();
  });

  it('should format the sp with 2 decimal places if the price isn\'t an int', () => {
    const { getByText } = render(<Price sp={12.3} mrp={12.3} />);

    expect(getByText('₹12.30')).toBeInTheDocument();
  });

  it('should display both sp and mrp if sp < mrp, and the discount amount', () => {
    const { getByText } = render(<Price sp={80} mrp={100} />);

    expect(getByText('₹80')).toBeInTheDocument();
    expect(getByText('₹100')).toBeInTheDocument();
    expect(getByText('Save ₹20.00 (20%)')).toBeInTheDocument();
  });
});
