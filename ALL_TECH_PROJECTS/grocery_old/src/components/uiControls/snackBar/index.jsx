import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import PropTypes from 'prop-types';
import style from './style';
import injectSheet from "react-jss";
import {
  toggleSnackBar
} from "../../../actions/appState";
import store from '../../../store';

@injectSheet(style)
class SnackbarWrapper extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      flag: true
    }
  }
  handleClose = () => {
    const { snackBarText, snackBarType } = store.getState().app
    this.setState({ flag: false }, () => store.dispatch(toggleSnackBar(false, snackBarText, snackBarType)))
  }
  componentDidMount() {
    this.setState({ flag: this.props.flag })
  }
  componentDidUpdate(prevProps) {
    let { flag } = this.props;
    if (prevProps.flag !== flag) {
      this.setState({ flag: flag })
    }
  }
  render() {
    let { flag } = this.state;
    let { message, type, classes } = this.props;
    return (
      <div className={classes.snackBar}>
        <Snackbar
          className={type + " heightHack"}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          open={flag}
          autoHideDuration={3000}
          onClose={this.handleClose}
          ContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={<span id="message-id">{message}</span>}
        />
      </div>
    );
  }
}

SnackbarWrapper.propTypes = {
  message: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  flag: PropTypes.bool.isRequired
};
export default SnackbarWrapper
