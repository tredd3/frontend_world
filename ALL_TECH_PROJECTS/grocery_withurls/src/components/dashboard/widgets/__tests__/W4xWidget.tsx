import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import W4xWidget from '../W4xWidget';
import { pivotDashboardResponse, W4x, DashboardResponseType } from '../../../../services/dashboard2';
import mockDB from '../../../../mocks/db.json';

jest.mock('../../../../helpers/analytics');
jest.mock('../../../../intents');

const mockWidgetData = pivotDashboardResponse(mockDB.dashboard.Data as DashboardResponseType)
  .find(({ type }) => type === 11) as W4x;

describe('W4xWidget widget tests', () => {
  it('should render the widget correctly', () => {
    const { asFragment } = render(
      <MemoryRouter>
        <W4xWidget
          widgetData={mockWidgetData}
        />
      </MemoryRouter>
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
