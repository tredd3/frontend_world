import React, { PropTypes } from "react";
import style from "./style";
import injectSheet from "react-jss";
import { Switch } from "@material-ui/core";

@injectSheet(style)
class JioSwitch extends React.Component {
  render() {
    let { classes, value, onChange, checked} = this.props;
    return (
        <Switch
            checked={checked}
            classes={{
                root: classes.jioSwitchRoot,
                switchBase: classes.jioSwitchBase,
                bar: classes.jioBar,
                icon: classes.jioIcon,
                checked: classes.jioChecked,
            }}
            disableRipple
            onChange={onChange}
            value={value}
        />
    );
  }
}
export default JioSwitch;
