import React from 'react';
import { withStyles } from '@material-ui/core';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Popper from '@material-ui/core/Popper';
import Paper from '@material-ui/core/Paper';
import style from './style';

export default withStyles(style)(
  class Filter extends React.Component {
    constructor(props) {
      super(props);

      this.arrowRef = null;

      this.setTextInputRef = element => {
        this.arrowRef = element;
      };
    }

    close = e => {
      e.preventDefault();
      this.props.handleClose(e, false);
    }

    render() {
      const {
        classes, children, arrow = true, anchorEl
      } = this.props;
      return (
        <section>
          <div className={classes.backdrop} />
          <Popper
            className={classes.popper}
            placement="bottom-end"
            open
            anchorEl={anchorEl}
            modifiers={{
              arrow: {
                enabled: true,
                element: this.arrowRef
              },
              preventOverflow: {
                enabled: true,
                boundariesElement: anchorEl
              }
            }}
          >
            {() => (
              <div>
                {arrow ? (
                  <span className={classes.arrow} ref={this.setTextInputRef} />
                ) : null}
                <Paper>
                  <ClickAwayListener onClickAway={this.close}>
                    {children}
                  </ClickAwayListener>
                </Paper>
              </div>
            )}
          </Popper>
        </section>
      );
    }
  }
);
