import React, { useState, useEffect } from 'react';
import { withStyles } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import style from './style';
import Filter from '../uiControls/filter';
import {
  ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails, ExpandMoreIcon,
  Typography, Checkbox, FormControl, FormControlLabel, RadioGroup, Divider, Radio
} from '../Material-UI';
import { queryStringToObject, objectToQueryString } from '../../helpers/functional';
import { updateSelectedFilters } from '../../helpers/utilities';

const FilterCheckboxList = withStyles(style)(
  ({
    classes, options, isFilterSelected, onChange
  }) => (
    options.map(label => (
      <div className={classes.filterOption} key={label}>
        <FormControlLabel
          className={classes.Checkbox}
          control={(
            <Checkbox
              checked={isFilterSelected(label)}
              value={label}
              label={label}
              onChange={onChange}
              color="primary"
            />
          )}
          label={label}
        />
        <Divider />
      </div>
    ))
  )
);

const FilterRadioList = withStyles(style)(
  ({
    classes, options, isFilterSelected, onChange
  }) => (
    <FormControl component="fieldset" className={classes.formControl}>
      <RadioGroup
        name="Order Status Filter"
        onChange={onChange}
      >
        {options.map(label => (
          <FormControlLabel
            key={label}
            value={label}
            label={label}
            className={classes.RadioButton}
            control={(
              <Radio
                className={classes.radio}
                color="primary"
                checked={isFilterSelected(label)}
              />
            )}
            labelPlacement="start"
          />
        ))}
      </RadioGroup>
    </FormControl>
  )
);

const FilterPanel = withStyles(style)(
  ({
    filterOption, isExpanded, onToggleExpanded, classes,
    selectedFilters, isFilterSelected, onChange
  }) => (
    <ExpansionPanel
      style={{ margin: '0px' }}
      expanded={isExpanded}
      onChange={onToggleExpanded}
    >
      <ExpansionPanelSummary
        expandIcon={<ExpandMoreIcon />}
        className={classes.ExpansionPanelSummary}
      >
        <section className={classes.filters}>
          <Typography>{filterOption.text}</Typography>
          <div className="filtersName">{`${selectedFilters || ''}`}</div>
        </section>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails className={classes.expansionPanelDetails}>
        {filterOption.selection === 'Multiple'
          ? (
            <FilterCheckboxList
              options={filterOption.types.map(({ text }) => text)}
              isFilterSelected={isFilterSelected}
              onChange={onChange}
            />
          )
          : (
            <FilterRadioList
              options={filterOption.types.map(({ text }) => text)}
              isFilterSelected={isFilterSelected}
              onChange={onChange}
            />
          )}
      </ExpansionPanelDetails>
    </ExpansionPanel>
  )
);

const SortFilter = withStyles(style)(
  ({
    classes, onSelectOption, closeFilter, anchorEl, clearFilters, filterOptions
  }) => {
    const [expandedFilterId, setExpandedFilterId] = useState('');
    const [selectedFilters, setSelectedFilters] = useState({});
    const [selectedSort, setSelectedSort] = useState(null);
    const history = useHistory();
    const sortFilterOption = filterOptions.find(({ id }) => id === 'sort');

    useEffect(() => {
      const { sort, ...filters } = queryStringToObject(window.location.search.split('?')[1]);
      setSelectedFilters(filters);

      if (sort && sort[0]) {
        try {
          setSelectedSort(JSON.parse(sort[0]));
        } catch (e) {
          // Do nothing if sort object isn't parseable
        }
      }
    }, []);

    const clearSelectedFilters = () => {
      setSelectedFilters({});
      setSelectedSort(null);

      history.replace({ search: '' });
      clearFilters();
    };

    const onFilterChange = id => e => {
      const { value, checked } = e.target;
      const canSelectMultipleValues = filterOptions.find(({ id: filterId }) => filterId === id).selection === 'Multiple';

      if (id === 'sort') {
        const matchingType = sortFilterOption.types.find(({ text }) => text === value);
        const sortParams = { [matchingType.id]: matchingType.value };
        setSelectedSort(sortParams);

        history.replace({
          search: objectToQueryString({ ...selectedFilters, sort: JSON.stringify(sortParams) })
        });
      } else {
        const updatedFilters = updateSelectedFilters(selectedFilters, { id, value, checked }, canSelectMultipleValues);
        setSelectedFilters(updatedFilters);

        history.replace({
          search: objectToQueryString({ ...updatedFilters, ...(selectedSort && { sort: JSON.stringify(selectedSort) }) })
        });
      }

      onSelectOption();
    };

    const isFilterSelected = id => {
      if (id === 'sort') {
        return text => {
          const matchingType = sortFilterOption.types.find(({ text: filterText }) => filterText === text);

          if (!selectedSort) {
            return false;
          }

          return selectedSort[matchingType.id] === matchingType.value;
        };
      }

      return text => ((selectedFilters[id] && selectedFilters[id].indexOf(text)) > -1);
    };

    return (
      <Filter anchorEl={anchorEl} handleClose={closeFilter}>
        <section>
          <div className={classes.filterHeader}>
            <span className="title">SORT & FILTER</span>
            <span className="clear" onClick={clearSelectedFilters}>CLEAR ALL</span>
          </div>

          <div className={classes.filterOptions}>
            {filterOptions.map(filterOption => (
              <FilterPanel
                key={filterOption.id}
                filterOption={filterOption}
                isExpanded={expandedFilterId === filterOption.id}
                onToggleExpanded={() => setExpandedFilterId(
                  expandedFilterId === filterOption.id ? '' : filterOption.id
                )}
                onChange={onFilterChange(filterOption.id)}
                selectedFilters={selectedFilters[filterOption.id]}
                isFilterSelected={isFilterSelected(filterOption.id)}
              />
            ))}
          </div>
        </section>
      </Filter>
    );
  }
);

export default SortFilter;
