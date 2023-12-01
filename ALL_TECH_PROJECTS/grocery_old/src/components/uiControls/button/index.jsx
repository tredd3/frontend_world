import React from 'react';
import injectSheet from 'react-jss';
import style from './style';

@injectSheet(style)
class Button extends React.Component {

  render() {
    let { classes, type, name, text, disable = false, onClick, style, wrapperStyle } = this.props;
    let disableCls = disable ? "disable" : "enable";
    return (
      <div className={classes.button + " " + classes[type] + " " + type + " " + classes[disableCls]} style={wrapperStyle} >
        <button type="button" name={name} style={style} onClick={onClick}>
          {text}
        </button>
      </div>
    );
  }
}
export default Button
