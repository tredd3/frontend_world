import React from 'react';
import { render } from '@testing-library/react';
import OfferSticker from '../OfferSticker';

describe('OfferSticker', () => {
  it('should not render anything if the MRP is not greater than SP', () => {
    const { container } = render(<OfferSticker mrp={10} sp={10} />);
    expect(container.childNodes).toHaveLength(0);
  });

  it('should render the discount amount', () => {
    const { getByText } = render(<OfferSticker mrp={10} sp={8} />);
    expect(getByText('20%')).toBeInTheDocument();
    expect(getByText('OFF')).toBeInTheDocument();
  });
});
