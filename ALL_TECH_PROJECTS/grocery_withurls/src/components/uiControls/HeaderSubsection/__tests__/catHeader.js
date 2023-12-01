import { render } from '@testing-library/react';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import CatHeader from '../catHeader';
import { categoriesUrl, wishlistUrl } from '../../../../helpers/urls';

describe('CatHeader', () => {
  it("shouldn't show categories if showCategories is false.", () => {
    const { container } = render(
      <BrowserRouter>
        <CatHeader showCategories={false} />
      </BrowserRouter>
    );

    expect(container.childNodes).toHaveLength(0);
  });

  it('should show categories if showCategories is true.', () => {
    const { queryAllByRole } = render(
      <BrowserRouter>
        <CatHeader />
      </BrowserRouter>
    );

    const links = queryAllByRole('link');
    expect(links).toHaveLength(2);
    expect(links[0].textContent).toBe('Shop ByCategory');
    expect(links[1].textContent).toBe('Wish List');
    expect(links[0].getAttribute('href')).toBe(categoriesUrl);
    expect(links[1].getAttribute('href')).toBe(wishlistUrl);
  });
});
