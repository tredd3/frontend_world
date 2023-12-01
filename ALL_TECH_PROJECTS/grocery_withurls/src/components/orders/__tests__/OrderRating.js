import React from 'react';
import {
  render, fireEvent, wait
} from '@testing-library/react';
import OrderRating from '../OrderRating';
import * as ConfigService from '../../../services/config';
import * as OrderService from '../../../services/order';
import mockDB from '../../../mocks/db.json';
import { pivotConfig } from '../../../services/helpers/pivots';

describe('Order Rating', () => {
  it('should render order rating when last order details are not present', async () => {
    const mockGetConfig = async () => ({ ...pivotConfig(mockDB.configurations.Data.Configurations), lastOrderDetails: null });
    const getConfig = jest.spyOn(ConfigService, 'getConfig').mockImplementationOnce(mockGetConfig);
    const { queryByTestId } = render(<OrderRating />);
    await wait();
    expect(getConfig.mock.calls.length).toBe(1);
    expect(queryByTestId('order-rating-dialog')).not.toBeInTheDocument();
    getConfig.mockClear();
  });

  it('should render order rating when last order details are present', async () => {
    const mockGetConfig = async () => pivotConfig(mockDB.configurations.Data.Configurations);
    const getConfig = jest.spyOn(ConfigService, 'getConfig').mockImplementationOnce(mockGetConfig);
    const { queryByTestId } = render(<OrderRating />);
    await wait();
    expect(getConfig.mock.calls.length).toBe(1);
    expect(queryByTestId('order-rating-dialog')).toBeInTheDocument();
    getConfig.mockClear();
  });

  it('should call order service when a rating is selected', async () => {
    const mockRateOrder = async () => null;
    const mockGetConfig = async () => pivotConfig(mockDB.configurations.Data.Configurations);
    const rateOrder = jest.spyOn(OrderService, 'rateOrder').mockImplementationOnce(mockRateOrder);
    const getConfig = jest.spyOn(ConfigService, 'getConfig').mockImplementationOnce(mockGetConfig);
    const { queryByTestId, getByTestId, rerender } = render(<OrderRating />);
    await wait();
    expect(queryByTestId('order-rating-dialog')).toBeInTheDocument();
    fireEvent.click(getByTestId('rating1'));
    rerender();
    await wait();
    expect(queryByTestId('order-rating-dialog')).not.toBeInTheDocument();
    expect(getConfig.mock.calls.length).toBe(1);
    expect(rateOrder.mock.calls.length).toBe(1);
    expect(rateOrder.mock.calls[0][0]).toBe(2);
    getConfig.mockClear();
    rateOrder.mockClear();
  });

  it('should close after skip is clicked with rating zero in the api call', async () => {
    const mockRateOrder = async () => null;
    const mockGetConfig = async () => pivotConfig(mockDB.configurations.Data.Configurations);
    const rateOrder = jest.spyOn(OrderService, 'rateOrder').mockImplementationOnce(mockRateOrder);
    const getConfig = jest.spyOn(ConfigService, 'getConfig').mockImplementationOnce(mockGetConfig);
    const { queryByTestId, getByText, rerender } = render(<OrderRating />);
    await wait();
    expect(queryByTestId('order-rating-dialog')).toBeInTheDocument();
    fireEvent.click(getByText('Skip'));
    rerender();
    await wait();
    expect(queryByTestId('order-rating-dialog')).not.toBeInTheDocument();
    expect(getConfig.mock.calls.length).toBe(1);
    expect(rateOrder.mock.calls.length).toBe(1);
    expect(rateOrder.mock.calls[0][0]).toBe(0);
  });
});
