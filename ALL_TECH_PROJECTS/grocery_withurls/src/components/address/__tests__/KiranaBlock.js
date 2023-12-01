import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import KiranaBlock from '../KiranaBlock';

describe('KiranaBlock', () => {
  it("should render an add link if a storeId isn't provided", () => {
    const { getByRole } = render(
      <Router history={createMemoryHistory()}>
        <KiranaBlock selectKiranaHref="/some/link" />
      </Router>
    );

    expect(getByRole('link')).toBeInTheDocument();
    expect(getByRole('link').getAttribute('href')).toBe('/some/link');
  });

  it('should render a kirana if a storeId is provided', () => {
    const onDeleteClick = jest.fn();
    const { getByRole, getAllByRole } = render(
      <Router history={createMemoryHistory()}>
        <KiranaBlock
          selectKiranaHref="/some/link"
          storeId={123123}
          storeName="Acme Shop"
          onDeleteClick={onDeleteClick}
        />
      </Router>
    );

    getAllByRole('link').forEach(link => (
      expect(link.getAttribute('href')).toBe('/some/link')
    ));

    expect(getAllByRole('link')[0].textContent).toInclude('Acme Shop');
    fireEvent.click(getByRole('button'));
    expect(onDeleteClick).toHaveBeenCalledTimes(1);
  });
});
