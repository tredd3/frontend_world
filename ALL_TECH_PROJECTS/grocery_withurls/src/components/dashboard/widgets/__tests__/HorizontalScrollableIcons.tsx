import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { mocked } from 'ts-jest/utils';
import HorizontalScrollableIconsWidget from '../HorizontalScrollableIcons';
import { pivotDashboardResponse, HorizontalScrollableIcons, DashboardResponseType } from '../../../../services/dashboard2';
import mockDB from '../../../../mocks/db.json';
import * as analytics from '../../../../helpers/analytics';

jest.mock('../../../../helpers/analytics');
jest.mock('../../../uiControls/HorizontalSlider', () => {
  const MockedHorizontalSlider: React.FC = ({ children }) => (
    <div>
      <div>HorizontalSlider Placeholder</div>
      {children}
    </div>
  );

  return {
    __esModule: true,
    default: MockedHorizontalSlider
  };
});

const { setPurchaseJourney, trackLink } = mocked(analytics);

const mockWidgetData = pivotDashboardResponse(mockDB.dashboard.Data as DashboardResponseType)
  .find(w => w.type === 1) as HorizontalScrollableIcons;

describe('HorizontalScrollableIconsWidget tests', () => {
  beforeEach(() => {
    trackLink.mockClear();
    setPurchaseJourney.mockClear();
  });

  it('should render the widget correctly', () => {
    const { asFragment } = render(
      <MemoryRouter>
        <HorizontalScrollableIconsWidget
          widgetData={mockWidgetData}
        />
      </MemoryRouter>
    );

    expect(asFragment()).toMatchSnapshot();
  });

  it('should handle click action correctly for banner links', () => {
    const { getByTestId } = render(
      <MemoryRouter>
        <HorizontalScrollableIconsWidget
          widgetData={mockWidgetData}
        />
      </MemoryRouter>
    );

    mockWidgetData.banners.forEach((_banner, index) => {
      fireEvent.click(getByTestId(`banner-link-${index}`));
      expect(trackLink).toHaveBeenCalledTimes(index + 1);
      expect(trackLink.mock.calls[index]).toMatchSnapshot();
      expect(setPurchaseJourney).toHaveBeenCalledTimes(index + 1);
      expect(setPurchaseJourney.mock.calls[index]).toMatchSnapshot();
    });
  });
});
