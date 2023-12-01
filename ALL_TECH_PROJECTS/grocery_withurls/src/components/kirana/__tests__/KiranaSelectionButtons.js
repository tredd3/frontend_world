import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import KiranaSelectionButtons from '../KiranaSelectionButtons';

describe('KiranaSelectionButtons', () => {
  it('should show cancel and save buttons', () => {
    const { getByText } = render(<KiranaSelectionButtons />);
    expect(getByText('Cancel')).toBeInTheDocument();
    expect(getByText('Save')).toBeInTheDocument();
    expect(getByText('Save')).not.toBeDisabled();
  });

  it('should call the appropriate callback functions', () => {
    const onCancel = jest.fn();
    const onSelectKirana = jest.fn();
    const { getByText } = render(<KiranaSelectionButtons onCancel={onCancel} onSelectKirana={onSelectKirana} />);
    fireEvent.click(getByText('Cancel'));
    expect(onCancel).toBeCalledTimes(1);
    fireEvent.click(getByText('Save'));
    expect(onSelectKirana).toBeCalledTimes(1);
  });

  it('save button should be disabled when isSaveButtonDisabled', () => {
    const { getByText } = render(<KiranaSelectionButtons isSaveButtonDisabled />);
    expect(getByText('Save')).toBeDisabled();
  });
});
