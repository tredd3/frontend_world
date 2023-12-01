import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import Quantity from '../Quantity';

describe('Quantity', () => {
  it('should render a quantity dropdown and call onChange', () => {
    const onChange = jest.fn();
    const { getByRole, getByText, queryAllByRole } = render(
      <Provider
        store={createStore(
          state => state,
          { config: { MAX_QTY_LIMIT_PER_ITEM: 20 } }
        )}
      >
        <Quantity value={1} onChange={onChange} />
      </Provider>
    );

    expect(getByRole('combobox')).toBeInTheDocument();
    expect(getByText('Qty:')).toBeInTheDocument();
    expect(queryAllByRole('option')).toHaveLength(20);
    fireEvent.change(getByRole('combobox'), { target: { value: '5' } });
    expect(onChange).toHaveBeenCalledTimes(1);
  });
});
