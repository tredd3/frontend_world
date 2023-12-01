import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { MemoryRouter, Router } from 'react-router-dom';
import { mocked } from 'ts-jest/utils';
import { createMemoryHistory } from 'history';
import ThinCarouselBannerWidget from '../ThinCarouselBanner';
import { pivotDashboardResponse, ThinCarouselBanner, DashboardResponseType } from '../../../../services/dashboard2';
import mockDB from '../../../../mocks/db.json';
import * as analytics from '../../../../helpers/analytics';
import * as intents from '../../../../intents';

jest.mock('../../../../helpers/analytics');
jest.mock('../../../../intents');
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

const { track } = mocked(analytics);
const { notifyBannerClick } = mocked(intents);

const mockWidgetData = pivotDashboardResponse(mockDB.dashboard.Data as DashboardResponseType)
  .find(({ type }) => type === 4) as ThinCarouselBanner;

describe('ThinCarouselBannerWidget widget tests', () => {
  beforeEach(() => {
    track.mockClear();
    notifyBannerClick.mockClear();
  });

  it('should render the widget correctly', () => {
    const { asFragment } = render(
      <MemoryRouter>
        <ThinCarouselBannerWidget
          widgetData={mockWidgetData}
        />
      </MemoryRouter>
    );

    expect(asFragment()).toMatchSnapshot();
  });

  it.each([true, false])('should handle click action correctly if AppInterface isDefined = %s', (isAppInterfaceDefined: boolean) => {
    const history = createMemoryHistory();
    notifyBannerClick.mockImplementation(() => isAppInterfaceDefined);

    const { getByTestId } = render(
      <Router history={history}>
        <ThinCarouselBannerWidget
          widgetData={mockWidgetData}
        />
      </Router>
    );

    mockWidgetData.banners.forEach((_banner, index) => {
      fireEvent.click(getByTestId(`banner-link-${index}`));
      expect(track).toHaveBeenCalledTimes(index + 1);
      expect(track.mock.calls[index]).toMatchSnapshot();
      expect(notifyBannerClick).toHaveBeenCalledTimes(index + 1);
      expect(notifyBannerClick.mock.calls[index]).toMatchSnapshot();
      expect(history.location.pathname + history.location.search).toMatchSnapshot();
    });

    notifyBannerClick.mockRestore();
  });
});
