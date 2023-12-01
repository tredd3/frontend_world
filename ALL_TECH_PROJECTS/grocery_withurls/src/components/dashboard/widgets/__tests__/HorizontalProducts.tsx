import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { mocked } from 'ts-jest/utils';
import HorizontalProductsWidget from '../HorizontalProducts';
import { pivotDashboardResponse, HorizontalProducts, DashboardResponseType } from '../../../../services/dashboard2';
import mockDB from '../../../../mocks/db.json';
import * as analytics from '../../../../helpers/analytics';

jest.mock('../../../../helpers/analytics');
jest.mock('../../../uiControls/horizontalProductsList/HorizontalProductsList', () => {
  const MockedHorizontalProductsList: React.FC = ({ children }) => (
    <div>
      <div>HorizontalProductsList placeholder</div>
      {children}
    </div>
  );

  return {
    __esModule: true,
    default: MockedHorizontalProductsList
  };
});

const { setPurchaseJourney, trackLink } = mocked(analytics);

const mockWidgetData = pivotDashboardResponse(mockDB.dashboard.Data as DashboardResponseType)
  .find(({ type }) => type === 7) as HorizontalProducts;

describe('HorizontalProductsWidget tests', () => {
  beforeEach(() => {
    setPurchaseJourney.mockClear();
    trackLink.mockClear();
  });

  it('should render the widget correctly', () => {
    const { asFragment } = render(
      <MemoryRouter>
        <HorizontalProductsWidget
          widgetData={mockWidgetData}
        />
      </MemoryRouter>
    );

    expect(asFragment()).toMatchSnapshot();
  });

  it('should handle click action for view all link', () => {
    const { getByText } = render(
      <MemoryRouter>
        <HorizontalProductsWidget
          widgetData={mockWidgetData}
        />
      </MemoryRouter>
    );

    fireEvent.click(getByText(mockWidgetData.viewAllLabel));
    expect(setPurchaseJourney).toHaveBeenCalledTimes(1);
    expect(setPurchaseJourney.mock.calls[0]).toMatchSnapshot();
    expect(trackLink).toHaveBeenCalledTimes(1);
    expect(trackLink.mock.calls[0]).toMatchSnapshot();
  });
});
