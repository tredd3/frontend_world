import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import SortFilter from '../sortFilter';

describe('Sort Filter', () => {
  it('should render sort dialog when open', () => {
    const { getByTestId } = render(<SortFilter open />);
    expect(getByTestId('sort-filter')).toBeInTheDocument();
  });

  it('should not render sort dialog when not open', () => {
    const { queryByTestId } = render(<SortFilter />);
    expect(queryByTestId('sort-filter')).toBeNull();
  });

  it('should have nothing selected initially if sort value is empty', () => {
    const { getByLabelText } = render(<SortFilter open />);
    expect(getByLabelText('Closest First')).not.toBeChecked();
    expect(getByLabelText('Alphabetical')).not.toBeChecked();
  });

  it('should show the appropriate option to be selected when passed with the sort value', () => {
    const { getByLabelText } = render(<SortFilter sort="closest-first" open />);
    expect(getByLabelText('Closest First')).toBeChecked();
    expect(getByLabelText('Alphabetical')).not.toBeChecked();
  });

  it('should change selection when and option is selected', () => {
    const { getByLabelText } = render(<SortFilter sort="closest-first" open />);
    expect(getByLabelText('Alphabetical')).not.toBeChecked();
    fireEvent.change(getByLabelText('Alphabetical'), { target: { checked: true } });
    expect(getByLabelText('Alphabetical')).toBeChecked();
  });

  it('should call handleSort when a sort option is selected', () => {
    const handleChangeSort = jest.fn();
    const { getByLabelText } = render(<SortFilter sort="closest-first" open handleChangeSort={handleChangeSort} />);
    fireEvent.click(getByLabelText('Alphabetical'));
    expect(handleChangeSort).toBeCalledTimes(1);
  });
});
