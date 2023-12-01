import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

class AlertBox extends React.Component {
    render() {

        const { open, handleClose, handleConfirmButton } = this.props;
        return (
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"You have removed all items from the shipment."}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Do you want to proceed?
          </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={e => handleClose()} color="primary">
                        NO
          </Button>
                    <Button onClick={e => handleConfirmButton()} color="primary" >
                        YES
          </Button>
                </DialogActions>
            </Dialog>
        )
    }
}
export default AlertBox;