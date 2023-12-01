import React from 'react';
import { render } from '@testing-library/react';
import VegNonVeg from '../VegNonVeg';

describe('VegNonVeg', () => {
  it('should render a message for vegetarian products', () => {
    const { container } = render(<VegNonVeg isVeg />);
    expect(container.querySelector('span').textContent)
      .toBe('This is a vegetarian product');
  });

  it('should render a message for non-vegetarian products', () => {
    const { container } = render(<VegNonVeg isVeg={false} />);
    expect(container.querySelector('span').textContent)
      .toBe('This is a non-vegetarian product');
  });
});
