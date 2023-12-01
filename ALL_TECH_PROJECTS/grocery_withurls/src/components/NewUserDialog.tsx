import React, { useState, useEffect } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { TextField } from './Material-UI';
import Button from './uiControls/button';
import { addUser } from '../services/user';

type NewUserDialogProps = {
  isOpen: boolean;
  close: () => {};
}

const NewUserDialog: React.FC<NewUserDialogProps> = ({ isOpen, close }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [error, setError] = useState('');

  // this is inline with the existing component, needs to be tested
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'scroll';
    };
  }, []);

  return (
    <Dialog
      open={isOpen}
      scroll="paper"
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      data-testid="new-user-dialog"
    >
      <DialogTitle id="alert-dialog-title" style={{ padding: '12px 24px', textAlign: 'center' }}>
        please enter details
      </DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          required
          margin="dense"
          id="firstName"
          label="First Name"
          type="text"
          role="textbox"
          value={firstName}
          onChange={e => setFirstName(e.target.value)}
          fullWidth
          inputProps={{
            'data-testid': 'firstName'
          }}
        />
        <TextField
          required
          margin="dense"
          id="lastName"
          label="Last Name"
          type="text"
          role="textbox"
          value={lastName}
          onChange={e => setLastName(e.target.value)}
          fullWidth
          inputProps={{
            'data-testid': 'lastName'
          }}
        />
      </DialogContent>
      <DialogActions>
        <Button
          text="Continue"
          name="continue"
          type="solidTulip"
          role="button"
          wrapperStyle={{ width: '90%', margin: '0 auto' }}
          onClick={async () => {
            try {
              await addUser({ firstName, lastName });
            } catch (e) {
              setError(e);
            }
            close();
          }}
          disable={!(firstName && lastName)}
        />
      </DialogActions>
      {error && error.length ? (
        <p
          style={{
            color: 'red',
            width: '90%',
            wordBreak: 'break-word',
            margin: '0 auto',
            fontSize: '14px',
            marginBottom: '10px',
            textAlign: 'center'
          }}
          data-testid="error-message"
        >
          {error}
        </p>
      ) : null}
    </Dialog>
  );
};

export default NewUserDialog;
