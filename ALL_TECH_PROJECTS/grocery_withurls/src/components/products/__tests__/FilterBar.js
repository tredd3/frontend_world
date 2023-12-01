import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import FilterBar from '../FilterBar';

describe('FilterBar', () => {
  it('should render just a count if nothing else is provided (plural)', () => {
    const { getByText } = render(<FilterBar resultsCount={100} />);

    expect(getByText('100 results')).toBeInTheDocument();
  });

  it('should render just a count if nothing else is provided (singular)', () => {
    const { getByText } = render(<FilterBar resultsCount={1} />);

    expect(getByText('1 result')).toBeInTheDocument();
  });

  it('should show a button to toggle filters if openFilter is provided', () => {
    const openFilter = jest.fn();
    const { getByRole } = render(
      <FilterBar resultsCount={100} openFilter={openFilter} />
    );
    expect(getByRole('button')).toHaveTextContent('Sort/Filter');

    fireEvent.click(getByRole('button'));
    expect(openFilter).toHaveBeenCalledTimes(1);
    expect(openFilter.mock.calls[0][1]).toBe(true);
  });

  it('should show the filter count when provided', () => {
    const openFilter = jest.fn();
    const { getByRole, getByText } = render(
      <FilterBar resultsCount={100} openFilter={openFilter} filterCount={3} />
    );

    expect(getByRole('button')).toHaveTextContent('Sort/Filter');
    expect(getByText('(3)')).toBeInTheDocument();
  });
});
