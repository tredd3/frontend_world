import React from 'react';
import { render } from '@testing-library/react';
import AddressTag from '../AddressTag';

describe('AddressTag', () => {
  it('should display the address tag for home', () => {
    const { getByText } = render(<AddressTag tag="home" />);
    expect(getByText('home')).toBeInTheDocument();
  });

  it('should display the address tag for work', () => {
    const { getByText } = render(<AddressTag tag="work" />);
    expect(getByText('work')).toBeInTheDocument();
  });

  it('should display the address tag for others', () => {
    const { getByText } = render(<AddressTag tag="others" />);
    expect(getByText('others')).toBeInTheDocument();
  });
});
