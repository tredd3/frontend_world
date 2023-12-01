import * as React from "react";
class IconStyle extends React.Component {
  render() {
    return (
      <div style={{ bottom: "30px", right: "25px", position: "absolute" }}>
        {this.props.children}
      </div>
    );
  }
}
export default IconStyle;
