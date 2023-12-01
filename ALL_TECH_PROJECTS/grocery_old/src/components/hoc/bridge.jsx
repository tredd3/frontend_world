import React from 'react';
import { bridgeHelper } from '../../helper/bridge/bridgeHelper';
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom'

@connect(state => {
  return {
    user: state.user
  }
})
class Bridge extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      flag: false,
      showError: false,
      errorMsg: "",
      showLoader: false
    }
  }

  async componentDidMount() {
    console.log(process.env.APP_TYPE)
    if (process.env.APP_TYPE != "web") {
      let flag = await bridgeHelper({
        history: this.props.history
      });
      console.log("||||User State in Bridge |||| " + JSON.stringify(this.props.user));
      this.setState({ flag: flag }, () => {
        console.log("Load Flag: " + this.state.flag);
      });
    }
    else {
      let app = process.env.APP_TYPE
      this.setState({ flag: true }, () => {
      });
    }
  }


  render() {
    let { flag } = this.state;
    let { showError, errorMsg, showLoader } = this.state;
    return (
      <>
        {flag ? this.props.children : null}
      </>
    );
  }
}
export default withRouter(Bridge);
