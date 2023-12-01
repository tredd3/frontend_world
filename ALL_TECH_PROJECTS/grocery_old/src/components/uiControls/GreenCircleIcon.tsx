import * as React from "react";
import PanoramaFishEye from "@material-ui/icons/PanoramaFishEye";
import Done from "@material-ui/icons/Done";
interface IProps {
  inputLabelProps?: React.CSSProperties;
}
class GreenCircleIcon extends React.Component<IProps, {}> {
  render() {
    return (
      <div style={{ position: "relative", ...this.props.inputLabelProps }}>
        <PanoramaFishEye
          style={{
            color: "green",
            position: "absolute",
            right: "50px",
            top: "10px"
          }}
        />
        <Done
          style={{
            color: "green",
            position: "absolute",
            fontSize: "12px",
            right: "56px",
            top: "16px"
          }}
        />
      </div>
    );
  }
}
export default GreenCircleIcon;
