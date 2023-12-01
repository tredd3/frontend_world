import React from 'react';
import injectSheet from 'react-jss';
import style from './style';
import Filter from "../uiControls/filter";
import {
  ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails, ExpandMoreIcon, Typography,
  Checkbox, FormControl, FormControlLabel, RadioGroup, Divider, Radio
} from "../../materialUI"

@injectSheet(style)

class SortFilter extends React.Component {

  filterOptionChange = id => e => {
    this.props.onClickSelectOption(id, e.target.value, e.target.checked)
  }

  selectedFilters = id => {
    const { selectedCategories, selectedBrands, selectedSortBy } = this.props;
    switch (id) {
      case 'categoryName':
        return selectedCategories.length ? selectedCategories.join(", ") : ""
      case 'brandName':
        return selectedBrands.length ? selectedBrands.join(", ") : ""
      case 'sort':
        return selectedSortBy.length ? selectedSortBy.join(", ") : ""
      default:
        return ""
    }
  }

  isFilterSelected = (id, filterValue) => {
    const { selectedCategories, selectedBrands, selectedSortBy } = this.props;
    switch (id) {
      case 'categoryName':
        return selectedCategories.includes(filterValue) ? true : false
      case 'brandName':
        return selectedBrands.includes(filterValue) ? true : false
      case 'sort':
        return selectedSortBy.includes(filterValue) ? true : false
      default:
        return false
    }
  }

  render() {
    const { classes, handleClose, anchorEl, clearAll } = this.props;
    let filterOptionResults = this.props.filterOptionsResults ? this.props.filterOptionsResults : [];

    return (
      <Filter anchorEl={anchorEl} handleClose={handleClose}>
        <section>
          <div className={classes.filterHeader}>
            <span className="title">SORT & FILTER</span>
            <span className="clear" onClick={clearAll}>CLEAR ALL</span>
          </div>

          <div className={classes.filterOptions}>
            {
              filterOptionResults.map((data, index) =>
                <ExpansionPanel style={{ margin: "0px" }} key={index}>
                  <ExpansionPanelSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    className={classes.ExpansionPanelSummary}
                  >
                    <section className={classes.filters}>
                      <Typography >{data.text}</Typography>
                      <div className="filtersName">{this.selectedFilters(data.id)}</div>
                    </section>
                  </ExpansionPanelSummary>
                  <ExpansionPanelDetails className={classes.expansionPanelDetails}>
                    {(data.id !== "ratings" && data.id !== "sort") ?
                      data.types.map((types, index) => {
                        let id = data.id; // id is the type on which filter is applied

                        return (
                          <div className={classes.filterOption} key={index}>
                            <FormControlLabel
                              className={classes.Checkbox}
                              control={
                                <Checkbox
                                  checked={this.isFilterSelected(id, types.text)}
                                  value={types.text}
                                  label={types.text}
                                  onChange={this.filterOptionChange(id)}
                                  color="primary"
                                />
                              }
                              label={types.text}
                            />
                            <Divider />
                          </div>
                        )
                      }) :
                      (<FormControl component="fieldset" className={classes.formControl}>
                        <RadioGroup
                          name="Order Status Filter"
                          onChange={this.filterOptionChange(data.id)}
                        >
                          {data.types.map((type, index) => {
                            return (
                              <FormControlLabel
                                key={index}
                                value={type.text} label={type.text}
                                className={classes.RadioButton}
                                control={<Radio className={classes.radio} color="primary" checked={this.isFilterSelected(data.id, type.text)} />}
                                labelPlacement="start"
                              />
                            )
                          })}
                        </RadioGroup>
                      </FormControl>)
                    }
                  </ExpansionPanelDetails>
                </ExpansionPanel>
              )
            }
          </div>
        </section>
      </Filter>
    );
  }
}

export default SortFilter;