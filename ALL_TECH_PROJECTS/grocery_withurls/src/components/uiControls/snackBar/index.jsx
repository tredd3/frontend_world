import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import { withStyles } from '@material-ui/core';
import style from './style';
import { toggleSnackBar } from '../../../actions/appState';
import store from '../../../store';
import { SuccessWhite, ErrorWhite } from '../../../assets/images/svg';
import { shouldLiftSnackbar } from '../../../helpers/utilities';

export default withStyles(style)(
  class SnackbarWrapper extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        flag: true
      };
    }

    componentDidMount() {
      this.setState({ flag: this.props.toggleFlag || this.props.flag });
    }

    componentDidUpdate(prevProps) {
      const { flag, toggleFlag } = this.props;
      if ((prevProps.flag !== flag) || (prevProps.toggleFlag !== toggleFlag)) {
        // eslint-disable-next-line react/no-did-update-set-state
        this.setState({ flag: toggleFlag || flag });
      }
    }

    handleClose = () => {
      const { snackBarText, snackBarType } = store.getState().app;
      this.setState({ flag: false }, () => store.dispatch(toggleSnackBar(false, snackBarText, snackBarType)));
    }

    render() {
      const { flag } = this.state;
      const {
        message, type, classes
      } = this.props;
      return (
        <div className={classes.snackBar}>
          <Snackbar
            className={shouldLiftSnackbar() ? (`${type} bottom57`) : type}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left'
            }}
            open={flag}
            autoHideDuration={3000}
            onClose={this.handleClose}
            ContentProps={{ 'aria-describedby': 'message-id' }}
            message={(
              <span id="message-id" style={{ display: 'flex', marginLeft: '-10px' }}>
                <div style={{ marginRight: 10 }}>
                  {type === 'success' ? <SuccessWhite /> : <ErrorWhite style={{ fontSize: 10 }} />}
                </div>
                <div>{message}</div>
              </span>
            )}
          />
        </div>
      );
    }
  }
);
