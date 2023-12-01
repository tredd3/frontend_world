import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render, fireEvent } from '@testing-library/react';
import { EditButton, DeleteButton } from '../AddressButtons';

describe('AddressButtons', () => {
  it('should render an edit button', () => {
    const { getByRole } = render(
      <Router history={createMemoryHistory()}>
        <EditButton href="/some/path" />
      </Router>
    );

    expect(getByRole('link')).toBeInTheDocument();
    expect(getByRole('link').getAttribute('href')).toBe('/some/path');
  });

  it('should render a delete button', () => {
    const onClick = jest.fn();
    const { getByRole } = render(<DeleteButton onClick={onClick} />);
    expect(getByRole('button')).toBeInTheDocument();
    fireEvent.click(getByRole('button'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
