import * as React from "react";
import { Button } from "../../materialUI";
interface IProps {
  buttonText: string;
  variant?: string;
  disabled?: boolean;
  onClick: any;
  style?: React.CSSProperties;
}
class CustomButton extends React.Component<IProps, {}> {
  render() {
    return (
      <Button
        variant="outlined"
        mini
        style={{
          backgroundColor: this.props.disabled
            ? "rgba(0,182,182,0.5)"
            : "rgb(0,182,182)",
          width: "80%",
          margin: "45px 20%",
          color: "white",
          ...this.props.style
        }
        }
        color="primary"
        disabled={this.props.disabled}
        onClick={this.props.onClick}
      >
        {this.props.buttonText}
      </Button>
    );
  }
}
export default CustomButton;
