import React from 'react';
import { withStyles } from '@material-ui/core';
import style from './style';

export default withStyles(style)(
  ({
    classes, type, name, text, disable = false, onClick, style, wrapperStyle
  }) => (
    <div
      className={`${classes.button} ${classes[type]} ${type} ${classes[disable ? 'disable' : 'enable']}`}
      style={wrapperStyle}
    >
      <button
        type="button"
        disabled={disable}
        name={name}
        style={style}
        onClick={onClick}
      >
        {text}
      </button>
    </div>
  )
);
