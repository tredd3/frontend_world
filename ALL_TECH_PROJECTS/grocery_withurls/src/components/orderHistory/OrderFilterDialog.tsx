import React, { useState, useEffect } from 'react';
import { withStyles } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import style from './style';
import {
  ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails, ExpandMoreIcon, Typography,
  FormControl, RadioGroup, FormControlLabel, Radio
} from '../Material-UI';
import Filter from '../uiControls/filter';
import { decodeDate } from '../../helpers/utilities';
import { queryStringToObject, objectToQueryString } from '../../helpers/functional';
import { OrderFilters as OrderFiltersType } from '../../types';

export enum OrderStatusEnum {
  ALL_ORDERS = 'AllOrders',
  CANCELLED = 'Cancelled',
  SHIPPED = 'Shipped',
  DELIVERED = 'Delivered'
}

enum TimePeriodFilters {
  LAST_30_DAYS = 'Last 30 Days',
  LAST_6_MONTHS = 'Last 6 Months',
  YEAR_2020 = '2020',
  YEAR_2019 = '2019',
  YEAR_2018 = '2018',
  YEAR_2017 = '2017'
}

type Props = {
  classes: any;
  anchorEl: Element | null;
  onClose: () => void;
  onClear: () => void;
  onChange: (filters: OrderFiltersType) => void;
  isVisible: boolean;
};

const OrderStatusFilters: {
  label: string;
  value: OrderStatusEnum;
}[] = [{
  label: 'All orders',
  value: OrderStatusEnum.ALL_ORDERS
}, {
  label: 'Cancelled orders',
  value: OrderStatusEnum.CANCELLED
}, {
  label: 'Shipped orders',
  value: OrderStatusEnum.SHIPPED
}, {
  label: 'Delivered orders',
  value: OrderStatusEnum.DELIVERED
}];

export const getTimePeriodFilterParams = (timePeriodFilter: string): OrderFiltersType['timeFilter'] => {
  let greaterThanDate = '';
  let lessThanDate = '';

  switch (timePeriodFilter) {
    case TimePeriodFilters.LAST_30_DAYS:
      greaterThanDate = decodeDate(new Date(), '30days');
      lessThanDate = decodeDate(new Date());
      break;
    case TimePeriodFilters.LAST_6_MONTHS:
      greaterThanDate = decodeDate(new Date(), '6months');
      lessThanDate = decodeDate(new Date());
      break;
    case TimePeriodFilters.YEAR_2020:
      greaterThanDate = '01-JAN-2020';
      lessThanDate = '31-DEC-2020';
      break;
    case TimePeriodFilters.YEAR_2019:
      greaterThanDate = '01-JAN-2019';
      lessThanDate = '31-DEC-2019';
      break;
    case TimePeriodFilters.YEAR_2018:
      greaterThanDate = '01-JAN-2018';
      lessThanDate = '31-DEC-2018';
      break;
    case TimePeriodFilters.YEAR_2017:
      greaterThanDate = '01-JAN-2017';
      lessThanDate = '31-DEC-2017';
      break;
    default:
      break;
  }

  return { greaterThanDate, lessThanDate };
};

const OrderFilterDialog: React.FC<Props> = ({
  classes,
  anchorEl,
  onClose,
  onClear,
  onChange,
  isVisible
}) => {
  const [selectedFilters, setSelectedFilters] = useState<{ orderTypeFilter?: string; timePeriodFilter?: string } | null>(null);
  const history = useHistory();
  const appendToUrl = (filter: { filterType?: string; filterValue?: string }) => {
    const { location } = history;
    const searchObj = queryStringToObject(location.search.slice(1));
    if (filter.filterType) {
      searchObj[filter.filterType] = filter.filterValue;
      const searchStr = objectToQueryString(searchObj);
      history.replace({ search: searchStr });
    }
  };

  const updateSelectedFilters = (changedFilter: { orderTypeFilter?: string; timePeriodFilter?: string }) => {
    setSelectedFilters({ ...selectedFilters, ...changedFilter });
    const changedType = changedFilter.orderTypeFilter ? 'orderTypeFilter' : 'timePeriodFilter';
    const changedValue = changedFilter[changedType] as string;

    appendToUrl({
      filterType: changedType,
      filterValue: changedValue
    });

    const updatedFilters: OrderFiltersType = { timeFilter: {} };

    if (selectedFilters?.timePeriodFilter) {
      updatedFilters.timeFilter = getTimePeriodFilterParams(selectedFilters.timePeriodFilter);
    }

    if (selectedFilters?.orderTypeFilter) {
      updatedFilters.orderType = selectedFilters.orderTypeFilter;
    }

    if (changedType === 'orderTypeFilter') {
      updatedFilters.orderType = changedValue;
    } else {
      updatedFilters.timeFilter = getTimePeriodFilterParams(changedValue);
    }
    onChange(updatedFilters);
  };

  useEffect(() => {
    const fromQueryString = queryStringToObject(history.location.search.slice(1));
    setSelectedFilters({
      orderTypeFilter: (fromQueryString.orderTypeFilter && fromQueryString.orderTypeFilter[0]),
      timePeriodFilter: (fromQueryString.timePeriodFilter && fromQueryString.timePeriodFilter[0])
    });
  }, [history.location.search]);

  let orderStatusFilterLabel;
  let timePeriodFilterLabel;

  if (selectedFilters) {
    orderStatusFilterLabel = (OrderStatusFilters.find(({ value: filterValue }) => selectedFilters.orderTypeFilter === filterValue))?.label;
    timePeriodFilterLabel = selectedFilters.timePeriodFilter;
  }

  if (!isVisible) { return null; }

  return (
    <Filter anchorEl={anchorEl} handleClose={onClose}>
      <section>
        <div className={classes.filterHeader}>
          <span className="title">SORT & FILTER</span>
          <span
            className={`clear ${!(selectedFilters && Object.keys(selectedFilters).length > 0) ? 'disable' : ''}`}
            onClick={() => {
              setSelectedFilters(null);
              onClear();
            }}
          >
            CLEAR ALL
          </span>
        </div>
        <div className={classes.filterOptions}>
          <ExpansionPanel className={classes.expansionPanel}>
            <ExpansionPanelSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
              className={classes.expansionPanelSummary}
            >
              <div>
                <Typography className="heading">By Order Status</Typography>
                <Typography className="subHeading">{orderStatusFilterLabel}</Typography>
              </div>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails className={classes.expansionPanelDetails}>
              <FormControl component="fieldset" className={classes.formControl}>
                <RadioGroup
                  name="Order Status Filter"
                  value={selectedFilters?.orderTypeFilter || null}
                  onChange={event => {
                    updateSelectedFilters({ orderTypeFilter: event.target.value });
                  }}
                >
                  {OrderStatusFilters.map(filterParam => (
                    <FormControlLabel
                      key={filterParam.value}
                      value={filterParam.value}
                      label={filterParam.label}
                      className={classes.filterOption}
                      control={<Radio className={classes.radio} color="primary" />}
                      labelPlacement="start"
                    />
                  ))}
                </RadioGroup>
              </FormControl>
            </ExpansionPanelDetails>
          </ExpansionPanel>

          <ExpansionPanel className={classes.expansionPanel}>
            <ExpansionPanelSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2a-content"
              id="panel2a-header"
              className={classes.expansionPanelSummary}
            >
              <div>
                <Typography className="heading">By Time Period</Typography>
                <Typography className="subHeading">{timePeriodFilterLabel}</Typography>
              </div>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails className={classes.expansionPanelDetails}>
              <FormControl component="fieldset" className={classes.formControl}>
                <RadioGroup
                  name="Time Period Filter"
                  value={selectedFilters?.timePeriodFilter || null}
                  onChange={event => {
                    updateSelectedFilters({ timePeriodFilter: event.target.value });
                  }}
                >
                  {Object.values(TimePeriodFilters).map(timePeriodFilter => (
                    <FormControlLabel
                      key={timePeriodFilter}
                      value={timePeriodFilter}
                      label={timePeriodFilter}
                      className={classes.filterOption}
                      control={<Radio className={classes.radio} color="primary" />}
                      labelPlacement="start"
                    />
                  ))}
                </RadioGroup>
              </FormControl>
            </ExpansionPanelDetails>
          </ExpansionPanel>
        </div>
      </section>
    </Filter>
  );
};

export default withStyles(style as any)(OrderFilterDialog);
