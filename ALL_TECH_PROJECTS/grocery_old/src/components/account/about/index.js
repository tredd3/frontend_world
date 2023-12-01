import React from "react";
import style from "./style";
import injectSheet from "react-jss";
import { connect } from "react-redux";
import PageTemplate from '../../uiControls/PageTemplate/PageTemplate';
import GoldButton from '../../uiControls/button';
import { Button, TextField, RadioGroup, Radio,FormControlLabel, FormControl, FormLabel } from '../../../materialUI'
import { RightBlack } from "../../../assets/images/svg";
import { API_ROUTES } from "../../../helper/network/api-routes";
import { fetchApi } from "../../../helper/network/fetch";
import { updateUser } from "../../../actions/user"

@injectSheet(style)
@connect(state => {
  return {
    user: state.user,
    defaultAddress: state.userAddress.address
  }
},
dispatch => ({
  updateUser: data => dispatch(updateUser(data))
})
)
class About extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      isEdit: false,
      name:props.user.firstName +' '+props.user.lastName ,
      phoneNumber:props.user.phoneNumber,
      email:props.user.email,
      gender:props.user.gender,
      dob:props.user.dob, 
    }
  }

  handleChange = event => {
    if(event.target.checked !== undefined) {
      this.setState({ [event.target.name]: event.target.checked });
    }

    this.setState({ [event.target.name]: event.target.value });
  };

  handleSave = () => {
    this.props.updateUser({...this.state})
  }

  render() {
    let { classes, user, history, defaultAddress } = this.props;

    let { isEdit, name, phoneNumber, email, gender, dob } = this.state;
    let footer = isEdit ? (<div style={{display: 'grid', padding:10, background: "#fff"}}>
      <GoldButton 
        type="solidTulip"
        text={"Save"}
        disable={!(name && phoneNumber && email && gender && dob)}
        onClick={()=>this.handleSave()}
        /></div>) : null;
    return (
      <PageTemplate whiteBackground footerNode={footer} history={history} righticon1={false} righticon2={false} subSection={false}>
        <div className={classes.root}>
            <div className={'about-head'}>
              <div className={'labels title'}>My Account</div>
              <div className={'edit-action'} onClick={()=>this.setState({isEdit:!isEdit})}>{(!isEdit) ? "Edit" : "Cancel"}</div>
            </div>
            <div className={'about-case'}>
              <div className={'labels'}>Mobile Number</div>
              <div className={'values'}> {phoneNumber}</div>
            </div>
            <div className={'about-case'}>
              <div className={'labels'}>Name</div>
              { isEdit ? <TextField name="name" InputProps={{ classes: {input: classes.fs14} }} fullWidth onChange={this.handleChange} value={name} /> : (<div className={'values'}>{name}</div>)}
            </div>
            <div className={'about-case'}>
              <div className={'labels'}>Gender</div>
              { isEdit ? (<FormControl component="fieldset" className={classes.head} >
            <RadioGroup name="gender"
              className={classes.flex}
              value={gender}
              onChange={this.handleChange}
               >
              <FormControlLabel classes={{label: classes.labelColor}} value="1" label="Male" control={<Radio classes={{root: classes.radioRoot, checked: classes.radioChecked}} disableRipple />} />
              <FormControlLabel classes={{label: classes.labelColor}} value="2" label="Female" control={<Radio classes={{root: classes.radioRoot, checked: classes.radioChecked}}  disableRipple />} />
            </RadioGroup>
          </FormControl>) : (<div className={'values'}>{(gender == 1)? "Male" : (gender == "2") ? "female" : null }</div>)}
            </div>
            <div className={'about-case'}>
              <div className={'labels'}>Date of Birth</div>
              { isEdit ? <TextField name="dob" InputProps={{ classes: {input: classes.fs14}, type:'date' }}value={this.state.dob} fullWidth onChange={this.handleChange} value={dob} /> : (<div className={'values'}>{dob}</div>)}
              {/* <div className={'values'}>{dob}</div> */}
            </div>
            <div className={'about-case'}>
              <div className={'labels'}>Email address</div>
              { isEdit ? <TextField  InputProps={{ classes: {input: classes.fs14}, type:'email' }} name="email" fullWidth onChange={this.handleChange} value={email} /> : (<div className={'values'}>{email}</div>)}
              {/* <div className={'values'}>{email}</div> */}
            </div>
            { !isEdit ?(<Button onClick={()=>history.push('/account/addresses')} className={classes.button}>
              <div className="btn-content">My Address</div> <RightBlack />
            </Button>) : null }
        </div>
      </PageTemplate>
    );
  }
}

export default About;
