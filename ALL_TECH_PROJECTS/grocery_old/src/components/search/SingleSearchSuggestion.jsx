import * as React from "react";
import Typography from '@material-ui/core/Typography';
import IconRight from '@material-ui/icons/ChevronRight';
import style from "./style";
import injectSheet from "react-jss";
import Divider from "@material-ui/core/Divider";
import RightArrow from "@material-ui/icons/KeyboardArrowRight";

@injectSheet(style)

class SingleSearchSuggestion extends React.Component{
    render()
    {
        const {classes} = this.props;
        var replaceText = this.props.inputText;
        replaceText = replaceText.bold();
        return(
            <div>
                <div className={classes.suggestionDiv1}>
                  <div className={classes.suggestionDiv2} onClick = {(e)=>{this.props.onClickSingleSearchSuggestion()}}>
                  <Typography className = {classes.textStyle1} >
                      {/* {this.styleString(this.props.displayText, this.props.inputText)} */}
                      {this.props.displayText}
                    </Typography>
                    <RightArrow className={classes.rightArrowIcon}/>
                  </div>
                    <Divider className={classes.suggestionDivider}/>
            </div>
            </div>
        )
    }
}
export default SingleSearchSuggestion;