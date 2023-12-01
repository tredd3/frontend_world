import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import Error from '../Error';

describe('Error component', () => {
  afterEach(cleanup);

  it('should render correctly', () => {
    const { asFragment } = render(<Error />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly when cta is enabled', () => {
    const { asFragment } = render(<Error ctaEnabled />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('should override props correctly', () => {
    const { asFragment } = render(<Error ctaEnabled ctaText="Dummy CTA Text" errorMessage="My custom error" />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('should invoke cta handler correctly', () => {
    const mockFn = jest.fn();
    const { getByText } = render(<Error ctaEnabled onClickCta={mockFn} ctaText="My CTA" />);
    fireEvent.click(getByText('My CTA'));
    expect(mockFn).toHaveBeenCalled();
  });
});
