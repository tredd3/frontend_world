import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { mocked } from 'ts-jest/utils';
import W9xWidget from '../W9xWidget';
import { pivotDashboardResponse, W9x, DashboardResponseType } from '../../../../services/dashboard2';
import mockDB from '../../../../mocks/db.json';
import * as analytics from '../../../../helpers/analytics';

jest.mock('../../../../helpers/analytics');

const { trackLink } = mocked(analytics);

const mockWidgetData = pivotDashboardResponse(mockDB.dashboard.Data as DashboardResponseType)
  .find(({ type }) => type === 12) as W9x;

describe('W9xWidget tests', () => {
  it('should render the widget correctly', () => {
    const { asFragment } = render(
      <MemoryRouter>
        <W9xWidget
          widgetData={mockWidgetData}
        />
      </MemoryRouter>
    );

    expect(asFragment()).toMatchSnapshot();
  });

  it('should handle click action correctly for banner links if App interface is not defined', () => {
    const { getByTestId } = render(
      <MemoryRouter>
        <W9xWidget
          widgetData={mockWidgetData}
        />
      </MemoryRouter>
    );

    mockWidgetData.banners.forEach((_banner, index) => {
      fireEvent.click(getByTestId(`banner-link-${index}`));
      expect(trackLink).toHaveBeenCalledTimes(index + 1);
      expect(trackLink.mock.calls[index]).toMatchSnapshot();
    });
  });
});
