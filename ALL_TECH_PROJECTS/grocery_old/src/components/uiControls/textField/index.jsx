import React from 'react';
import PropTypes from 'prop-types';
import style from './style';
import injectSheet from "react-jss";
import {TextField} from '../../../materialUI/index.tsx';

@injectSheet(style)
class TextFieldWrapper extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      value: ""
    }
  }
  hndleChange = (event) => {
    let value = event.target.value;
    let name = event.target.name;
    this.setState({value});
    this.props.parentHandler(value, name);
  }
  componentDidMount(){
    let {value} = this.props;
    this.setState({value});
  }
  render() {
    let {classes, label, helperText, cls="defaultTextFeild", name, validation={}, InputProps = {}} = this.props;
    let {value} = this.state;
    return (
      <div className={classes.textField}>
        <TextField
        error={validation[name] && validation[name].isInvalid}
        label={label}
        InputProps={InputProps}
        value={value}
        className={cls}
        helperText={helperText}
        onChange = {this.hndleChange}
        name={name}
      />
      </div>
    );
  }
}

TextFieldWrapper.propTypes = {
  value: PropTypes.string || PropTypes.number,
  parentHandler: PropTypes.func.isRequired,
  cls: PropTypes.string,
  label: PropTypes.string,
  helperText: PropTypes.string,
  name: PropTypes.string.isRequired,
  validation: PropTypes.object
};
export default TextFieldWrapper
