import React from 'react';
import injectSheet from 'react-jss';
import style from './style';
import Filter from "../uiControls/filter";
import {
    ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails, ExpandMoreIcon, Typography,
    FormControl, RadioGroup, FormControlLabel, Radio
} from "../../materialUI"

@injectSheet(style)

class OrderFilter extends React.Component {

    render() {
        const { classes, handleClose, anchorEl, orderTypeFilter, timeFilter, orderStatusFilter, timePeriodFilter, clearAll } = this.props;
        return (
            <Filter anchorEl={anchorEl} handleClose={handleClose}>
                <section>
                    <div className={classes.filterHeader}>
                        <span className="title">SORT & FILTER</span>
                        <span className="clear" onClick={clearAll}>CLEAR ALL</span>
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
                                <Typography className="subHeading">{orderTypeFilter}</Typography>
                            </div>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails className={classes.expansionPanelDetails}>
                            <FormControl component="fieldset" className={classes.formControl}>
                                <RadioGroup
                                    name="Order Status Filter"
                                    value={orderTypeFilter}
                                    onChange={orderStatusFilter}
                                >
                                    <FormControlLabel
                                        value="All orders" label="All orders"
                                        className={classes.filterOption}
                                        control={<Radio className={classes.radio} color="primary" />}
                                        labelPlacement="start"
                                    />
                                    <FormControlLabel
                                        value="Confirmed orders" label="Confirmed orders"
                                        className={classes.filterOption}
                                        control={<Radio className={classes.radio} color="primary" />}
                                        labelPlacement="start"
                                    />
                                    <FormControlLabel
                                        value="Cancelled orders" label="Cancelled orders"
                                        className={classes.filterOption}
                                        control={<Radio className={classes.radio} color="primary" />}
                                        labelPlacement="start"
                                    />
                                    <FormControlLabel
                                        value="Delivered orders" label="Delivered orders"
                                        className={classes.filterOption}
                                        control={<Radio className={classes.radio} color="primary" />}
                                        labelPlacement="start"
                                    />
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
                                <Typography className="subHeading">{timeFilter}</Typography>
                            </div>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails className={classes.expansionPanelDetails}>
                            <FormControl component="fieldset" className={classes.formControl}>
                                <RadioGroup
                                    name="Time Period Filter"
                                    value={timeFilter}
                                    onChange={timePeriodFilter}
                                >
                                    <FormControlLabel
                                        value="Last 30 Days" label="Last 30 Days"
                                        className={classes.filterOption}
                                        control={<Radio className={classes.radio} color="primary" />}
                                        labelPlacement="start"
                                    />
                                    <FormControlLabel
                                        value="Last 6 Months" label="Last 6 Months"
                                        className={classes.filterOption}
                                        control={<Radio className={classes.radio} color="primary" />}
                                        labelPlacement="start"
                                    />
                                    <FormControlLabel
                                        value="2019" label="2019"
                                        className={classes.filterOption}
                                        control={<Radio className={classes.radio} color="primary" />}
                                        labelPlacement="start"
                                    />
                                    <FormControlLabel
                                        value="2018" label="2018"
                                        className={classes.filterOption}
                                        control={<Radio className={classes.radio} color="primary" />}
                                        labelPlacement="start"
                                    />
                                    <FormControlLabel
                                        value="2017" label="2017"
                                        className={classes.filterOption}
                                        control={<Radio className={classes.radio} color="primary" />}
                                        labelPlacement="start"
                                    />
                                    <FormControlLabel
                                        value="2016" label="2016"
                                        className={classes.filterOption}
                                        control={<Radio className={classes.radio} color="primary" />}
                                        labelPlacement="start"
                                    />
                                </RadioGroup>
                            </FormControl>
                        </ExpansionPanelDetails>
                    </ExpansionPanel>
                    </div>
                </section>
            </Filter>
        );
    }
}

export default OrderFilter
