import React from "react";
import { Typography } from "@material-ui/core";
import Slider from "../../assets/images/svg/Slider.svg";
import injectSheet from "react-jss";
import style from "./style";
import { ReactComponent as FilterIcon } from '../../assets/images/svg/Filter.svg';
@injectSheet(style)

class ResultSortFunctionality extends React.Component {

    render() {
        const { classes, removeFilter, filterCount } = this.props;
        return (
            <div className={classes.sortFunctionalityDiv}>
                <span className={classes.totalResults}>
                    {this.props.totalResult + " RESULTS"}
                </span>
                {!removeFilter ?
                    <div className={classes.sortFilterDiv} onClick={this.props.handleClick}>
                        <FilterIcon />
                        <span> Sort/Filter</span>
                        {filterCount ? <span style={{ color: "red" }}>{`(${filterCount})`}</span> : null}
                    </div> : null}
            </div>
        )
    }
}

export default ResultSortFunctionality;