import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { withStyles } from '@material-ui/core';
import AddAddressForm from './AddressForm';
import style from './style';
import Card from '../uiControls/Card';
import { getUser } from '../../services/user';
import { UserPivot } from '../../types';

const AddAddress: React.FC<{ classes: any }> = ({ classes }) => {
  const { id } = useParams();
  const [user, setUser] = useState<UserPivot | null>(null);

  useEffect(() => {
    const setUserToState = async () => {
      setUser(await getUser());
    };

    setUserToState();
  }, []);

  if (!user) return null;

  return (
    <div className={classes.addAddress} style={{ minHeight: 'calc(100vh - 45px)', background: 'white', paddingBottom: '55px' }}>
      <Card>
        <p className={`fs14 head ${classes.title}`}>
          {id === 'add' ? 'Add new address' : 'Edit address'}
        </p>
        <AddAddressForm user={user} />
      </Card>
    </div>
  );
};

export default withStyles(style)(AddAddress);
