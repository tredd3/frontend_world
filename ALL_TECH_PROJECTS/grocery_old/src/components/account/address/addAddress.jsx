import React from "react";
import Card from "../../uiControls/Card";
import style from "./style";
import injectSheet from "react-jss";
import { connect } from "react-redux";
import Form from './form';
// import Button from '../../uiControls/button';
import PageTemplate from '../../uiControls/PageTemplate/PageTemplate'

@injectSheet(style)
@connect(state => {
  return {
    user: state.user
  }
})

class AddAddress extends React.Component {
  render() {
    let { classes, user, history } = this.props;
    const { addUser } = this.props.match.params;
    const isaddUser = addUser === "addUser" ? true : false;
    let { firstName, lastName, phoneNumber } = user;
    return (
      <PageTemplate history={history} righticon1={false} righticon2={false} subSection={false}>
        <div className={classes.addAddress}>
          <Card>
            <p className={`fs14 head ${classes.title}`}>Add New Address</p>
            {
              (phoneNumber || isaddUser) ? <Form {...{ firstName, lastName, phoneNumber }} isaddUser={isaddUser} /> : null
            }
          </Card>
        </div>
      </PageTemplate>
    );
  }
}

AddAddress.propTypes = {};
export default AddAddress;
