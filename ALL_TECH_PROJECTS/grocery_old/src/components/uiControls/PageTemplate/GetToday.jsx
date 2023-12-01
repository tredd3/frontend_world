import React, { PropTypes } from 'react';
import Bike from "@material-ui/icons/DirectionsBike";
import Switch from '../../uiControls/Switch'
export default class GetToday extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      getToday: false
    }
  }

  render() {
    return (
      <div style={{ display: 'flex', flexDirection: 'row', backgroundColor: "transparent", alignItems: 'center', padding: '3px 7px', borderBottom: '1px solid hsla(0, 0%, 87%, 1)' }}>
        <div style={{ color: 'hsla(208, 100%, 37%, 1)', marginLeft: 'auto' }}>
          <Bike style={{ fontSize: 14 }} />
        </div>
        <div style={{ color: 'hsla(208, 100%, 37%, 1)', marginLeft: '5px', fontSize: 14 }}>Get Today</div>
        <div style={{ marginLeft: '10px', paddingBottom: '3px' }}><Switch value={"getToday"} checked={this.state.getToday} onChange={(e) => this.setState({ getToday: !this.state.getToday })} /></div>

      </div>
    );
  }
}
