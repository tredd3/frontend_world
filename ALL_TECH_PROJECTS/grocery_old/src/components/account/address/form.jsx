import React from 'react';
// import TextFieldWrapper from '../../uiControls/textField';
import { FormControl, FormGroup, InputAdornment, FormControlLabel, RadioGroup, Radio, TextField } from '../../../materialUI';
import { AddressHomeOn, AddressHomeOff, AddressWorkOn, AddressWorkOff, AddressOthersOn, AddressOthersOff, Pencil } from "../../../assets/images/svg";
// import { addressFeilds } from '../../../constants/addressConst';
import Button from '../../uiControls/button';
import { saveAddress, updateAddress } from '../../../actions/address';
import { addUser } from '../../../actions/user';
import { connect } from "react-redux";
import { withRouter } from "react-router";
import injectSheet from 'react-jss';
import style from './style'
@withRouter
@connect(state => {
  return {}
}, dispatch => {
  return {
    saveAddress: data => {
      return dispatch(saveAddress(data))
    },
    updateAddress: data => {
      return dispatch(updateAddress(data))
    },
    addUser: function (obj) {
      return dispatch(addUser(obj))
    }
  }
})
@injectSheet(style)
class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      phoneNumber: "",
      isPhoneNumberDisabled: true,
      firstName: "",
      lastName: "",
      address: "",
      addressLine1: "",
      addressLine2: "",
      addressLine3: "",
      cityName: "",
      pincode: "",
      validation: {},
      addressType: 1,
      addressId: 0,
      addressTag: "Home",
    };
    this.phoneInput = React.createRef();
  }

  componentDidMount() {
    this.setState({ ...this.props })
  }
  onChange = (value, name) => {
    this.setState({ [name]: value })
  }

  onSubmit = () => {
    let { addressId, phoneNumber, firstName, lastName, address, addressLine1, addressLine2, addressLine3, cityName, pincode, addressType, addressTag } = this.state;
    const { type, isaddUser, addUser, saveAddress, history, updateAddress } = this.props;
    if (type === "edit") {
      Promise.all([updateAddress({ addressId, phoneNumber, firstName, lastName, address, addressLine1, addressLine2, addressLine3, cityName, pincode, addressType, addressTag })])
        .then(() => history.goBack())
    }
    else {
      if (isaddUser) {
        Promise.all([addUser({ mobileNumber: phoneNumber, firstName, lastName }), saveAddress({ phoneNumber, firstName, lastName, address, addressLine1, addressLine2, addressLine3, cityName, pincode, addressType, addressTag })])
          .then(history.goBack())
        // addUser({ mobileNumber: phoneNumber, firstName, lastName })
        //   .then(() => saveAddress({ phoneNumber, firstName, lastName, address, addressLine1, addressLine2, addressLine3, cityName, pincode, addressType, addressTag }))
        //   .then(history.push('/select-kirana'))
        //   .catch(alert("error"))
      } else {
        Promise.all([saveAddress({ phoneNumber, firstName, lastName, address, addressLine1, addressLine2, addressLine3, cityName, pincode, addressType, addressTag })])
          .then(history.goBack())
      }
    }
  }

  handleChange = event => {
    // let PinRE = /\d{[0-6]}/g;
    if (event.target.name == "pincode" && event.target.value.toString().length > 6) {
      return
    }

    this.setState({ [event.target.name]: event.target.value });
  };

  getLabel = (text) => {
    return <span className={this.props.classes.addrLabel}>{text}</span>
  }

  render() {
    let { phoneNumber } = this.state;
    let { classes } = this.props;
    return (
      <form name="addAddress" className={classes.form} noValidate>
        <div onChange={this.handleChange}>
          <TextField inputProps={{ ref: this.phoneInput }} classes={{ root: classes.rootTextField }} disabled={this.state.isPhoneNumberDisabled} className={"fullWidth addresFrmInput"} value={this.state.phoneNumber} name={'phoneNumber'} InputProps={{ endAdornment: <InputAdornment position="end"><Pencil onClick={() => this.setState({ isPhoneNumberDisabled: false }, () => this.phoneInput.current.select())} /></InputAdornment> }} />
          <FormControl component="fieldset" className={classes.head} >
            <RadioGroup
              name="addressTag"
              className={classes.flex}
              value={this.state.addressTag}
            >
              <FormControlLabel className={classes.formControlLabelRoot} value="Home" control={<Radio classes={{ checked: classes.radioOn, root: classes.radioOff }} disableRipple className={`${classes.pad5} ${classes.padLeftZero}`} icon={(<><AddressHomeOff /><span className="radio-label" >Home</span></>)} checkedIcon={(<><AddressHomeOn /><span className="radio-label">Home</span></>)} />} />
              <FormControlLabel className={classes.formControlLabelRoot} value="Work" control={<Radio classes={{ checked: classes.radioOn, root: classes.radioOff }} disableRipple className={classes.pad5} icon={(<><AddressWorkOff /><span className="radio-label" >Work</span></>)} checkedIcon={(<><AddressWorkOn /><span className="radio-label">Work</span></>)} />} />
              <FormControlLabel className={classes.formControlLabelRoot} value="Others" control={<Radio classes={{ checked: classes.radioOn, root: classes.radioOff }} disableRipple className={classes.pad5} icon={(<><AddressOthersOff /><span className="radio-label">Others</span></>)} checkedIcon={(<> <AddressOthersOn /><span className="radio-label">Others</span></>)} />} />
            </RadioGroup>
          </FormControl>
          <FormGroup row={true}>
            <TextField required label={(this.getLabel("First Name"))} classes={{ root: classes.rootTextField }} className={"addresFrmInput"} value={this.state.firstName} name={'firstName'} InputProps={{ classes: { root: classes.smallMarg, input: classes.smallPadTop } }} />
            <TextField required label={(this.getLabel("Last Name"))} classes={{ root: classes.rootTextField + ' ' + classes.rightAlign }} className={"addresFrmInput"} value={this.state.lastName} name={'lastName'} InputProps={{ classes: { root: classes.smallMarg, input: classes.smallPadTop } }} />
          </FormGroup>
          <TextField required label={(this.getLabel("Flat, House no."))} classes={{ root: classes.rootTextField }} InputProps={{ classes: { root: classes.smallMarg, input: classes.smallPadTop } }} className={"fullWidth addresFrmInput"} value={this.state.address} name={'address'} />
          <TextField required label={(this.getLabel("Building, Company, Apartment"))} classes={{ root: classes.rootTextField }} InputProps={{ classes: { root: classes.smallMarg, input: classes.smallPadTop } }} className={"fullWidth addresFrmInput"} value={this.state.addressLine1} name={'addressLine1'} />
          <TextField required label={(this.getLabel("Area, Colony, Street, Sector, Village"))} classes={{ root: classes.rootTextField }} InputProps={{ classes: { root: classes.smallMarg, input: classes.smallPadTop } }} className={"fullWidth addresFrmInput"} value={this.state.addressLine2} name={'addressLine2'} />
          <FormGroup row={true}>
            <TextField label={(this.getLabel("City"))} classes={{ root: classes.rootTextField }} InputProps={{ classes: { root: classes.smallMarg, input: classes.smallPadTop } }} className={"addresFrmInput"} value={this.state.cityName} name={'cityName'} />
            <TextField label={(this.getLabel("Pincode"))} classes={{ root: classes.rootTextField + ' ' + classes.rightAlign }} InputProps={{ classes: { root: classes.smallMarg, input: classes.smallPadTop } }} inputProps={{ type: "number" }} className={"addresFrmInput"} value={this.state.pincode} name={'pincode'} />
          </FormGroup>
          <TextField label={(this.getLabel("Landmark"))} classes={{ root: classes.rootTextField }} InputProps={{ classes: { root: classes.smallMarg, input: classes.smallPadTop } }} className={"fullWidth addresFrmInput"} value={this.state.addressLine3} name={'addressLine3'} />
        </div>
        <span onClick={this.onSubmit}>
          <Button text="Continue" name="continue" type="solidTulip"
            disable={!(this.state.phoneNumber &&
              this.state.firstName &&
              this.state.lastName &&
              this.state.address &&
              this.state.addressLine1 &&
              this.state.addressLine2 &&
              this.state.cityName &&
              this.state.pincode &&
              this.state.addressTag)} />
        </span>
      </form>
    );
  }
}
export default Form
