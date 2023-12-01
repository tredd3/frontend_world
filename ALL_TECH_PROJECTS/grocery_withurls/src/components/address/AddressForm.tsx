import React, { useState, useEffect, useRef } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { withStyles, InputAdornment } from '@material-ui/core';
import { UserPivot } from '../../types';
import SelectKiranaDrawer from './SelectKiranaDrawer';
import style from './style';
import { FormControl, FormGroup, TextField } from '../Material-UI';
import Button from '../uiControls/button';
import AddressTagField from './AddressTagField';
import { addAddress as addAddressService, updateAddress as updateAddressService, getAddressById } from '../../services/address';
import { Pencil } from '../../assets/images/svg';
import useQueryParams from '../../hooks/use-query-params';
import useBoolean from '../../hooks/use-boolean';

type addressFormProps = {
  user: UserPivot;
  classes: any;
};

type AddressFormState = {
  pincode: number;
  phoneNumber: number | null;
  firstName: string;
  lastName: string;
  addressTag: 'work' | 'home' | 'others';
  addressLine1: string;
  addressLine2: string;
  addressLine3?: string;
  cityName: string;
  landmark: string;
  storeId?: number;
  storeName?: string;
  isDefault: boolean;
}

const AddressForm: React.FC<addressFormProps> = ({ classes, user }) => {
  const [isDrawerOpen, openDrawer, closeDrawer] = useBoolean(false);
  const [isPhoneNumberDisabled,, disablePhoneNumber] = useBoolean(true);
  const phoneInput = useRef<HTMLInputElement | null>(null);
  const history = useHistory();
  const { id } = useParams();
  const queryParam = useQueryParams();
  const [addressId, setAddressId] = useState(Number(queryParam('id')));
  const isAddAddressFlow = id === 'add';

  const [address, setAddress] = useState<AddressFormState>({
    phoneNumber: isAddAddressFlow ? user.phoneNumber : null,
    firstName: '',
    lastName: '',
    addressLine1: '',
    addressLine2: '',
    addressLine3: queryParam('area') || '',
    landmark: '',
    cityName: queryParam('city') || '',
    pincode: Number(queryParam('pincode')),
    addressTag: 'home',
    isDefault: false
  });

  const getLabel = (text: string) => <span className={classes.addrLabel}>{text}</span>;

  const handleChange = async (event: React.ChangeEvent<HTMLFormElement>) => {
    const { target: { name, value } } = event;
    setAddress({ ...address, [name as keyof AddressFormState]: value });
  };

  const getRootPath = () => (history.location.pathname.indexOf('cart') > -1 ? 'cart' : 'account');

  const onSubmit = async () => {
    const addressWithoutId = {
      ...address,
      addressString: `${address.addressLine1} ${address.addressLine2}`,
      latitude: Number(queryParam('lat')),
      longitude: Number(queryParam('lng')),
      pincode: Number(queryParam('pincode')),
      phoneNumber: address.phoneNumber!
    };

    if (isAddAddressFlow) {
      const { id } = await addAddressService(addressWithoutId);
      setAddressId(id);
    } else {
      await updateAddressService({ id: Number(id), ...addressWithoutId });
      setAddressId(Number(id));
    }
    openDrawer();
  };

  const goToSelectKirana = () => history.replace(`/${getRootPath()}/addresses/${addressId}/select-kirana`);

  const skipKirana = () => {
    if (getRootPath() === 'cart') {
      history.replace(`/${getRootPath()}/addresses?addressId=${addressId}`);
    } else {
      history.replace(`/${getRootPath()}/addresses`);
    }
  };

  useEffect(() => {
    (async () => {
      if (!isAddAddressFlow) {
        const addressData = await getAddressById(Number(id));
        if (addressData) {
          const {
            firstName, lastName, phoneNumber, addressLine1, addressLine2, landmark, isDefault
          } = addressData;

          setAddress({
            ...address, firstName, lastName, phoneNumber, addressLine1, addressLine2, landmark, isDefault
          });
        }
      }
    })();
  }, [address, id, isAddAddressFlow]);

  return (
    <div>
      <form name="addAddress" className={classes.form} noValidate onChange={handleChange}>
        <div>
          <FormControl component="fieldset" className={classes.head}>
            <AddressTagField value={address.addressTag} />
          </FormControl>
          <TextField
            autoComplete="off"
            type="tel"
            classes={{ root: classes.rootTextField }}
            disabled={isPhoneNumberDisabled}
            className="fullWidth addresFrmInput"
            value={address.phoneNumber}
            name="phoneNumber"
            inputProps={{ ref: phoneInput }}
            // eslint-disable-next-line react/jsx-no-duplicate-props
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Pencil onClick={() => {
                    disablePhoneNumber();
                    if (phoneInput && phoneInput.current) phoneInput.current.select();
                  }}
                  />
                </InputAdornment>
              )
            }}
          />
          {address.addressTag !== 'home' && address.addressTag !== 'work' ? (
            <TextField
              autoComplete="off"
              required
              label={(getLabel("Name you fav(e.g. Dad's Home)"))}
              classes={{ root: classes.rootTextField }}
              className="fullWidth addresFrmInput"
              value={address.addressTag}
              name="addressTag"
              InputProps={{ classes: { root: classes.smallMarg, input: classes.smallPadTop } }}
            />
          ) : null}
          <FormGroup row>
            <TextField
              autoComplete="off"
              required
              label={(getLabel('First Name'))}
              classes={{ root: classes.rootTextField }}
              className="addresFrmInput"
              style={{ width: '45%' }}
              value={address.firstName}
              name="firstName"
              InputProps={{ classes: { root: classes.smallMarg, input: classes.smallPadTop } }}
            />
            <TextField
              autoComplete="off"
              required
              label={(getLabel('Last Name'))}
              classes={{ root: `${classes.rootTextField} ${classes.rightAlign}` }}
              className="addresFrmInput"
              style={{ width: '50%' }}
              value={address.lastName}
              name="lastName"
              InputProps={{ classes: { root: classes.smallMarg, input: classes.smallPadTop } }}
            />
          </FormGroup>
          <TextField
            autoComplete="off"
            required
            label={(getLabel('Flat, House no.'))}
            classes={{ root: classes.rootTextField }}
            InputProps={{ classes: { root: classes.smallMarg, input: classes.smallPadTop } }}
            className="fullWidth addresFrmInput"
            value={address.addressLine1}
            name="addressLine1"
          />
          <TextField
            autoComplete="off"
            required
            label={(getLabel('Building, Company, Apartment'))}
            classes={{ root: classes.rootTextField }}
            InputProps={{ classes: { root: classes.smallMarg, input: classes.smallPadTop } }}
            className="fullWidth addresFrmInput"
            value={address.addressLine2}
            name="addressLine2"
          />
          <TextField
            autoComplete="off"
            required
            label={(getLabel('Area, Colony, Street, Sector, Village'))}
            classes={{ root: classes.rootTextField }}
            InputProps={{ classes: { root: classes.smallMarg, input: classes.smallPadTop } }}
            className="fullWidth addresFrmInput"
            value={address.addressLine3}
            name="addressLine3"
          />
          <FormGroup row>
            <TextField
              disabled={!!address.cityName}
              autoComplete="off"
              label={(getLabel('City'))}
              classes={{ root: classes.rootTextField }}
              style={{ width: '45%' }}
              InputProps={{ classes: { root: classes.smallMarg, input: classes.smallPadTop } }}
              className="addresFrmInput"
              value={address.cityName}
              name="cityName"
            />
            <TextField
              disabled={!!address.pincode}
              autoComplete="off"
              label={(getLabel('Pincode'))}
              classes={{ root: `${classes.rootTextField} ${classes.rightAlign}` }}
              style={{ width: '50%' }}
              InputProps={{ classes: { root: classes.smallMarg, input: classes.smallPadTop } }}
              // eslint-disable-next-line react/jsx-no-duplicate-props
              inputProps={{ type: 'number' }}
              className="addresFrmInput"
              value={address.pincode}
              name="pincode"
            />
          </FormGroup>
          <TextField
            autoComplete="off"
            label={(getLabel('Landmark'))}
            classes={{ root: classes.rootTextField }}
            InputProps={{ classes: { root: classes.smallMarg, input: classes.smallPadTop } }}
            className="fullWidth addresFrmInput"
            value={address.landmark}
            name="landmark"
          />
        </div>
        <span style={{
          position: 'fixed',
          bottom: 0,
          width: 'calc(100% - 30px)',
          paddingBottom: '10px',
          backgroundColor: 'white'
        }}
        >
          <Button
            text="Save"
            name="save"
            type="solidTulip"
            disable={!((address.phoneNumber)
                && address.firstName
                && address.lastName
                && address.addressTag
                && address.addressLine1
                && address.addressLine2
                && address.addressLine3
                && address.cityName
                && address.pincode)}
            onClick={onSubmit}
          />
        </span>
      </form>
      <SelectKiranaDrawer
        open={isDrawerOpen}
        onClose={closeDrawer}
        onOpen={openDrawer}
        goToSelectKirana={goToSelectKirana}
        skipKirana={skipKirana}
      />
    </div>
  );
};

export default withStyles(style)(AddressForm);
