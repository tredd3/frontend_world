import * as React from 'react';
import { TextField } from '../Material-UI';
// 1 for is text field shaded 0 for if text field not shaded
type InputProps = {
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
  padding: '25px 0px 10px'
};

const InputTextField: React.FC<InputProps> = props => (
  <TextField
    label={props.label}
    InputLabelProps={{
      style: {
        color: '#8C8C8C',
        marginTop: '16px',
        ...props.InputLabelProps
      }
    }}
    InputProps={{
      style: {
        ...props.InputProps
      }
    }}
    placeholder={props.placeholder}
    fullWidth
    type={props.type}
    name={props.name}
    onChange={props.onChange}
    value={props.value}
    autoFocus={props.autoFocus}
    onKeyPress={props.onKeyPress}
    onFocus={props.onFocus}
    style={{ ...fieldCss, ...props.style }}
    disabled={props.disabled}
    inputRef={props.inputRef}
  />
);
export default InputTextField;
