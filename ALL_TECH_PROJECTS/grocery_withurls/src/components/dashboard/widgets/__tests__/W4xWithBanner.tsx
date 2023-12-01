import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { mocked } from 'ts-jest/utils';
import W4xWithBannerWidget from '../W4xWithBanner';
import { pivotDashboardResponse, W4xWithBanner, DashboardResponseType } from '../../../../services/dashboard2';
import mockDB from '../../../../mocks/db.json';
import * as analytics from '../../../../helpers/analytics';
import * as intents from '../../../../intents';

jest.mock('../../../../helpers/analytics');
jest.mock('../../../../intents');

const { track } = mocked(analytics);
const { notifyBannerClick } = mocked(intents);

const mockWidgetData = pivotDashboardResponse(mockDB.dashboard.Data as DashboardResponseType)
  .find(({ type }) => type === 15) as W4xWithBanner;

describe('W4xWithBannerWidget widget tests', () => {
  it('should render the widget correctly', () => {
    const { asFragment } = render(
      <MemoryRouter>
        <W4xWithBannerWidget
          widgetData={mockWidgetData}
        />
      </MemoryRouter>
    );

    expect(asFragment()).toMatchSnapshot();
  });

  it('should handle click action correctly for banner links if App interface is not defined', () => {
    const { getByTestId } = render(
      <MemoryRouter>
        <W4xWithBannerWidget
          widgetData={mockWidgetData}
        />
      </MemoryRouter>
    );

    mockWidgetData.banners.forEach((_banner, index) => {
      fireEvent.click(getByTestId(`banner-link-${index}`));
      expect(track).toHaveBeenCalledTimes(index + 1);
      expect(track.mock.calls[index]).toMatchSnapshot();
      expect(notifyBannerClick.mock.calls[index]).toMatchSnapshot();
    });
  });
});
