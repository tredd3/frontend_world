import React from 'react';
import injectSheet from 'react-jss';
import style from './style';
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Popper from "@material-ui/core/Popper";
import Paper from "@material-ui/core/Paper";

@injectSheet(style)

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
        this.props.handleClose();
    }

    render() {
        const { classes, children, arrow = true, anchorEl } = this.props;
        return (
            <section>
                <div className={classes.backdrop} />
                <Popper
                    className={classes.popper}
                    placement="bottom-end"
                    open={true}
                    anchorEl={anchorEl}
                    modifiers={{
                        arrow: {
                            enabled: true,
                            element: this.arrowRef,
                        },
                        preventOverflow: {
                            enabled: true,
                            boundariesElement: anchorEl
                        }
                    }}
                >
                    {({ TransitionProps }) => (
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
            </section >
        );
    }
}
export default Filter
