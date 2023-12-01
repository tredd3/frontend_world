import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import DeleteDialog from '../ConfirmDialog';

describe('Delete Dialog Box', () => {
  it('is rendered when open, has a title, text and two buttons', () => {
    const { getByTestId } = render(<DeleteDialog open />);
    expect(getByTestId('delete-dialog')).toBeInTheDocument();
  });

  it('is not rendered when not open', () => {
    const { queryByTestId } = render(<DeleteDialog />);
    expect(queryByTestId('delete-dialog')).toBeNull();
  });

  it('should call the correct callbacks when the buttons are clicked', () => {
    const onClose = jest.fn();
    const onConfirm = jest.fn();
    const { getByText } = render(<DeleteDialog open onClose={onClose} onConfirm={onConfirm} />);

    fireEvent.click(getByText('Yes'));
    expect(onConfirm).toBeCalled();

    fireEvent.click(getByText('No'));
    expect(onClose).toBeCalled();
  });
});
