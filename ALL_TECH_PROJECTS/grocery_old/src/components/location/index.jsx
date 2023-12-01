import React from 'react';
import {Route, Switch} from "react-router-dom";
import SearchLocation from './SearchLocation';
import MapView from './MapView';

export default class Location extends React.Component {
  render() {
    return (
      <Switch>
          <Route exact path={`${this.props.match.url}`} component={MapView}></Route>
          <Route exact path={`${this.props.match.url}/search`} component={SearchLocation}></Route>
        </Switch>
    );
  }
}
