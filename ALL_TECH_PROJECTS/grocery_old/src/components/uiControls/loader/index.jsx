import React, {PropTypes} from 'react';
import injectSheet from "react-jss";
import style from './style';

@injectSheet(style)
class Loader extends React.Component {
  componentDidMount(){
    document.body.setAttribute("style","overflow:hidden");
  }
  componentWillUnmount(){
    document.body.setAttribute("style","overflow:auto");
  }
  render() {
    let {classes} = this.props;
    return (
      <div className={classes.apiLoader}>
        <span className="apiCenterLoader"></span>
      </div>
    );
  }
}
export default Loader
