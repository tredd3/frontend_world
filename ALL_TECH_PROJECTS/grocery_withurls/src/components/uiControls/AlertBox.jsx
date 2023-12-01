import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { alertBox } from '../../actions/appState';
import store from '../../store';

class AlertBox extends React.Component {
  componentDidMount() {
    document.body.style.overflow = 'scroll';
  }

  componentWillUnmount() {
    // dialog has a side-effect if this not checked
    document.body.style.overflow = 'scroll';
  }

  // eslint-disable-next-line class-methods-use-this
  handleClose() {
    store.dispatch(alertBox({ openAlertBox: false, alertBoxText: '' }));
  }

  render() {
    const {
      open,
      title,
      message = '',
      children = null,
      handleClose
    } = this.props;

    return (
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle style={{ paddingLeft: '18px' }}><span style={{ fontSize: '16px', fontWeight: 600 }}>{title}</span></DialogTitle>
        <DialogContent style={{ padding: '0 18px' }}>
          <DialogContentText id="alert-dialog-description"><span style={{ color: 'black' }}>{message}</span></DialogContentText>
        </DialogContent>
        <DialogActions style={{ display: 'flex', justifyContent: 'flex-end' }}>
          {children}
        </DialogActions>
      </Dialog>
    );
  }
}

export default AlertBox;
