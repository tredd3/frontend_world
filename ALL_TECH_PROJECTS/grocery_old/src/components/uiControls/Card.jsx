import React from 'react';
import STYLE_CONST from '../../constants/style';
import injectSheet from 'react-jss';

const style = {
  card:{
    padding: STYLE_CONST.screenPadding,
    backgroundColor: STYLE_CONST.white.white
  }
}

@injectSheet(style)
class Card extends React.Component {
  render() {
    let {classes, children} = this.props;
    let clsName = this.props.clsName || "defaultCard";
    return (
      <div className={classes.card + " " + clsName}>
        {children}
      </div>
    );
  }
}
export default Card
