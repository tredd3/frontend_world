import * as React from "react";
import Snackbar from "@material-ui/core/Snackbar";
import Typography from "@material-ui/core/Typography";

interface Iprops {
  message: string;
}

interface Istate {
  open: boolean;
}

class ErrorMessage extends React.Component<Iprops, Istate> {
  constructor(props: Iprops) {
    super(props);
    this.state = {
      open: true
    };
  }

  handleClose = (event: any) => {
    this.setState({ open: false });
  };

  render() {
    return (
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center"
        }}
        open={this.state.open}
        autoHideDuration={3000}
        onClose={this.handleClose}
        ContentProps={{
          "aria-describedby": "message-id",
          style: {
            borderRadius: "30px",
            backgroundColor: "rgba(49, 49, 49,0.85)"
          }
        }}
        className="check"
        message={
          <span id="message-id" style={{ marginLeft: "33px" }}>
            {this.props.message}
          </span>
        }
        style={{ margin: "0 35px 32px" }}
      // style={{ borderRadius: "30px" }}
      //   action={
      //     <IconButton
      //       key="close"
      //       aria-label="Close"
      //       color="inherit"
      //       onClick={this.handleClose}
      //     >
      //       <CloseIcon />
      //     </IconButton>
      //   }
      />
    );
  }
}

export default ErrorMessage;

export const ValidationError: React.SFC<Iprops> = props => {
  return <Typography style={{ color: "red" }}> {props.message}</Typography>;
};
