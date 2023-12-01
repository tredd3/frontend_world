
import React, { PropTypes } from "react";
import Card from "../../uiControls/Card";
import style from "./style";
import injectSheet from "react-jss";
import { connect } from "react-redux";
import Form from './form';
import Button from '../../uiControls/button';
import {getIndexOf} from '../../../helper/utilites';

@injectSheet(style)
@connect(state => {
  return{
    userAddress: state.userAddress,
  }
})
class UpdateAddress extends React.Component {

  render() {
    let { classes } = this.props;
    let {addresses} = this.props.userAddress;
    let id = this.props.match.params.id;
    let index = getIndexOf(addresses, "addressId", id);
    return (
      <div className={classes.addAddress}>
        <Card>
          <p className="fs14 head">Edit Address</p>
          {
            addresses[index].phoneNumber ?  <Form {...{...addresses[index], type: "edit"}} /> : null
          }
        </Card>
      </div>
    );
  }
}

export default UpdateAddress;
