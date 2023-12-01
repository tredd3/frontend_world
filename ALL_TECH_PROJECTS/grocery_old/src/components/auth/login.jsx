import React from 'react';
import PageTemplate from '../uiControls/PageTemplate/PageTemplate';
import Card from '../uiControls/Card';
import injectSheet from 'react-jss';
import loginStyle from './loginStyle';
import Button from '../uiControls/button';
import API_ROUTES from '../../helper/network/api-routes';
import { fetchApi } from '../../helper/network/fetch';
import { connect } from "react-redux";
import { getUser, setUser } from '../../actions/user';

@injectSheet(loginStyle)
@connect(state => {
  return {
    user: state.user
  }
}, dispatch => {
  return {
    getUser: function (obj) {
      return dispatch(getUser(obj))
    },
    setUser: function (obj) {
      return dispatch(setUser(obj))
    }
  }
})
class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mobile: "",
      otp: "",
      displayText: "Continue",
      btnName: "continue"
    }
  }
  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value })
  }
  handleSubmit = event => {
    if (event.target.name == "continue") {
      fetch(API_ROUTES.sendOtp, {
        method: 'POST',
        headers: this.getHeaders(),
        body: JSON.stringify({
          "identifiers": [`${this.state.mobile}`]
        })
      })
        .then(res => res.text())
        .then(response => {
          this.setState({ btnName: "verify", displayText: "Verify" })
        })
        .catch(e => {

        })
    }
    if (event.target.name == "verify") {
      fetch(API_ROUTES.verifyOtp, {
        method: 'POST',
        headers: this.getHeaders(),
        body: JSON.stringify({
          "identifier": this.state.mobile,
          otp: this.state.otp,
          shallBecomeIdentifierIfNotTaken: 'F'
        })
      })
        .then(res => res.json())
        .then(response => {
          let BASIC_AUTH = process.env.AUTHORISATION_VALUE;
          return fetch(API_ROUTES.validateuser, {
            method: 'POST',
            headers: { ...this.getHeaders(), "Authorization": "Basic " + BASIC_AUTH, "sso-token": response.ssoToken, 'x-api-key': process.env.API_KEY },
            body: ""
          })

        })
        .then(res => res.json())
        .then(response => {

          // let expires_in = response.expires_in;
          let expiresAt = Date.now() + (response.expires_in * 1000)
          this.props.setUser({ access_token: response.access_tokens, uuid: response.uuid, refresh_token: response.refresh_token, expiresAt, login: true });
          Promise.all([this.props.getUser({ access_token: response.access_tokens, uuid: response.uuid, refresh_token: response.refresh_token, expiresAt })])
            .then(() => {
              this.props.history.push('/')
            })
        })
        .catch(e => { })
    }
  }
  getHeaders = () => {
    return {
      'x-api-key': process.env.API_KEY_LOGIN,
      'app-name': 'RJIL_JioKart',
      'Content-Type': 'application/json'
    }
  }
  componentDidMount() {
    // if(this.props.user.login){
    //   this.props.history.push("/")
    // }
  }
  render() {
    let { history, classes } = this.props;
    let { mobile, otp, displayText, btnName } = this.state;
    return (
      <div className={classes.rootLogin}>
        <Card>
          <input placeholder="Enter Mobile" className="testInput" type="number" maxLength="10" name="mobile" value={this.mobile} onChange={this.handleChange} />
          <input placeholder="Enter Otp" className="testInput" type="number" maxLength="6" name="otp" value={this.otp} onChange={this.handleChange} />
          {
            mobile.length == 10 ? <Button text={displayText} type={"solidTulip"} onClick={this.handleSubmit} name={btnName} /> : null
          }
        </Card>
      </div>
    );
  }
}
export default Login
