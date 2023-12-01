import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import mockDB from '../../../mocks/db.json';
import CategoryItem from '../CategoryItem';
import { trackLink } from '../../../helpers/analytics';

const getSubcategoryData = jest.fn(() => mockDB.categories.Data.Categories[0]);
const subCategory = mockDB.categories.Data.Categories[0];

jest.mock('../../../helpers/analytics', () => ({
  trackLink: jest.fn()
}));

describe('CategoryItem', () => {
  it('should render a category item with image and name', () => {
    const history = createMemoryHistory();
    const {
      getByAltText, getByRole, getByText
    } = render(
      <Router history={history}>
        <CategoryItem
          key={0}
          data={subCategory}
          parentCategoryName="CategoryName"
          subcategoryData={getSubcategoryData}
          parentCatId="parentCatId"
        />
      </Router>
    );
    expect(getByAltText(subCategory.CategoryName)).toBeInTheDocument();
    expect(getByRole('img')).toBeInTheDocument();
    expect(getByAltText(subCategory.CategoryName).getAttribute('src')).toContain(subCategory.CategoryImage);
    expect(getByText(subCategory.CategoryName)).toBeInTheDocument();
  });

  it('should call trackLink on clicking on rendered item', () => {
    const history = createMemoryHistory();
    const {
      getByTestId
    } = render(
      <Router history={history}>
        <CategoryItem
          key={0}
          data={subCategory}
          parentCategoryName="CategoryName"
          subcategoryData={getSubcategoryData}
          parentCatId="parentCatId"
        />
      </Router>
    );
    fireEvent.click(getByTestId('category-item'));
    expect(trackLink).toHaveBeenCalledTimes(1);
    expect(trackLink).toHaveBeenCalledWith(`Shop By Category | CategoryName | ${subCategory.CategoryName}`, 'HomeScreenClicks', 'Top');
    expect(history.location.pathname).toBe(`/categories/parentCatId/${subCategory.CategoryId}`);
  });
});
