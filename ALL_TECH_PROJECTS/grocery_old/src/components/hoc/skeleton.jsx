import React from 'react';
import {bridgeHelper} from '../../helper/bridge/bridgeHelper';
import { connect } from "react-redux";

@connect(state => {
  return{
    app: state.app
  }
})
class Skeleton extends React.Component {
  render() {
    return (
      <>
      {!this.props.app.fetchingApi ? this.props.children : null}
      </>
    );
  }
}
export default Skeleton;
