import React from 'react';
import { render } from '@testing-library/react';
import NoResults from '../NoResults';
import { NoWishList } from '../../../assets/images/svg';

describe('NoResults', () => {
  it('should render default text if text is not provided.', () => {
    const { container, getByText } = render(<NoResults />);

    expect(container.childNodes).not.toHaveLength(0);
    expect(getByText('No results found')).toBeInTheDocument();
    expect(getByText('noorder.svg')).toBeInTheDocument();
  });

  it('should show text and icon if provided.', () => {
    const { getByText } = render(<NoResults text="No data found" icon={<NoWishList />} />);

    expect(getByText('No data found')).toBeInTheDocument();
    expect(getByText('nowish.svg')).toBeInTheDocument();
  });
});
