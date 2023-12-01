import React from 'react';
import { render } from '@testing-library/react';
import NotificationIcon from '../NotificationIcon';

describe('NotificationIcon', () => {
  it('should render without a notification badge if there are no notifications', () => {
    const { queryByText } = render(<NotificationIcon />);
    expect(queryByText('0')).not.toBeInTheDocument();
  });
});
