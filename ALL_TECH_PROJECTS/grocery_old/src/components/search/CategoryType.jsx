import * as React from "react";
import Typography from '@material-ui/core/Typography';
import IconRight from '@material-ui/icons/ChevronRight';
import style from "./style";
import injectSheet from "react-jss";

@injectSheet(style)


class CategoryType extends React.Component {

    render() {
        const { classes } = this.props;
        return (
            <div className={classes.categoryType}>
                <div className={classes.categoryTypeImageTitle}>
                    <img src={this.props.categoryTypeImage} alt="no image" style={{ width: "38px", height: "38px", marginRight: "10px" }} />
                    <Typography className={classes.textStyle1}>
                        {this.props.categoryTypeTitle}
                    </Typography>
                </div>
                <IconRight />
            </div>
        )
    }

}

export default CategoryType;