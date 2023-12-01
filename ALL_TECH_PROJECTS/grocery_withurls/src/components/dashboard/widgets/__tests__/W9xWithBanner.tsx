import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { mocked } from 'ts-jest/utils';
import W9xWithBannerWidget from '../W9xWithBanner';
import { pivotDashboardResponse, W9xWithBanner, DashboardResponseType } from '../../../../services/dashboard2';
import mockDB from '../../../../mocks/db.json';
import * as analytics from '../../../../helpers/analytics';

jest.mock('../../../../helpers/analytics');

const { track } = mocked(analytics);

const mockWidgetData = pivotDashboardResponse(mockDB.dashboard.Data as DashboardResponseType)
  .find(({ type }) => type === 16) as W9xWithBanner;

describe('W9xWithBannerWidget tests', () => {
  it('should render the widget correctly', () => {
    const { asFragment } = render(
      <MemoryRouter>
        <W9xWithBannerWidget
          widgetData={mockWidgetData}
        />
      </MemoryRouter>
    );

    expect(asFragment()).toMatchSnapshot();
  });

  it('should handle click action correctly for banner links if App interface is not defined', () => {
    const { getByTestId } = render(
      <MemoryRouter>
        <W9xWithBannerWidget
          widgetData={mockWidgetData}
        />
      </MemoryRouter>
    );

    mockWidgetData.banners.forEach((_banner, index) => {
      fireEvent.click(getByTestId(`banner-link-${index}`));
      expect(track).toHaveBeenCalledTimes(index + 1);
      expect(track.mock.calls[index]).toMatchSnapshot();
    });
  });
});
