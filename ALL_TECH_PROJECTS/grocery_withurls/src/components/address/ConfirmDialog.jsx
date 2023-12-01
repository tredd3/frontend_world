import React from 'react';
import MButton from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core';
import {
  Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle
} from '../Material-UI';
import style from './style';

export default withStyles(style)(({
  open = false, onClose, onConfirm, classes, title, text
}) => (
  <Dialog
    classes={{ paper: classes.dialogPaper }}
    open={open}
    onClose={onClose}
    aria-labelledby="delete-address-title"
    aria-describedby="delete-address-desc"
    data-testid="delete-dialog"
  >
    <DialogTitle id="remove-kirana-title">{title}</DialogTitle>
    <DialogContent>
      <DialogContentText id="remove-kirana-desc">
        {text}
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <MButton onClick={onClose} color="primary">
        No
      </MButton>
      <MButton onClick={onConfirm} color="primary" autoFocus>
        Yes
      </MButton>
    </DialogActions>
  </Dialog>
));

