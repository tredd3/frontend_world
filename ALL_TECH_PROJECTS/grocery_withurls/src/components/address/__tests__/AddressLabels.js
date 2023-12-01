import React from 'react';
import { render } from '@testing-library/react';
import { DefaultLabel, NewLabel } from '../AddressLabels';

describe('DefaultLabel', () => {
  it('should not show a default label when show is false', () => {
    const { queryByText } = render(<DefaultLabel show={false} />);
    expect(queryByText('Default address')).not.toBeInTheDocument();
  });

  it('should show a default label when show is true', () => {
    const { getByText } = render(<DefaultLabel show />);
    expect(getByText('Default address')).toBeInTheDocument();
  });
});

describe('NewLabel', () => {
  it('should not show a new label when addedDate is too old', () => {
    const date = new Date();
    date.setMinutes(date.getMinutes() - 6);
    const { queryByText } = render(<NewLabel addedDate={date} />);
    expect(queryByText('New')).not.toBeInTheDocument();
  });

  it('should show a new label when addedDate is recent', () => {
    const date = new Date();
    date.setMinutes(date.getMinutes() - 2);
    const { getByText } = render(<NewLabel addedDate={date} />);
    expect(getByText('New')).toBeInTheDocument();
  });
});
