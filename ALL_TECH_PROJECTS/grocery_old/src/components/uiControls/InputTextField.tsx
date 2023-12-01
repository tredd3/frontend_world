import * as React from "react";
import { TextField } from "../../materialUI";
//1 for is text field shaded 0 for if text field not shaded
interface IProps {
  type?: string;
  label?: string;
  placeholder?: string;
  onChange?: (e: any) => void;
  value?: string;
  autoFocus?: boolean;
  onKeyPress?: (e: any) => void;
  style?: React.CSSProperties;
  onFocus?: (e: any) => void;
  InputLabelProps?: object;
  InputProps?: object; // for styling div wrapper of input field
  inputProps?: object; // for styling input field itself
  name?: string;
  disabled?: boolean;
  inputRef?: any;
}

const fieldCss = {
  padding: "25px 0px 10px"
};

class InputTextField extends React.Component<IProps, {}> {
  render() {
    return (
      <TextField
        label={this.props.label}
        InputLabelProps={{
          style: {
            color: "#8C8C8C",
            marginTop: "16px",
            ...this.props.InputLabelProps
          }
        }}
        InputProps=
        {{
          style: {
            ...this.props.InputProps
          }
        }}
        inputProps=
        {{
          style: {
            ...this.props.inputProps
          }
        }}
        placeholder={this.props.placeholder}
        fullWidth
        type={this.props.type}
        name={this.props.name}
        onChange={this.props.onChange}
        value={this.props.value}
        autoFocus={this.props.autoFocus}
        onKeyPress={this.props.onKeyPress}
        onFocus={this.props.onFocus}
        style={{ ...fieldCss, ...this.props.style }}
        disabled={this.props.disabled}
        inputRef={this.props.inputRef}
      //  required={true}
      />
    );
  }
}
export default InputTextField;
