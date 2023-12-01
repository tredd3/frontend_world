import * as React from "react";
import { Input } from "../../materialUI";
interface IProps {
  onChange: any;
  isShaded: boolean;
  value: string;
}
interface IState {
  textResult: string;
}
const shadedBackground = {
  background: "rgb(248,248,248)"
};

const fieldCss = {
  padding: "25px 16px 15px 0px"
};
class CommentBox extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      textResult: ""
    };
  }
  handle = (e: any) => {
    if (e.target.value.length > 300) {
      e.preventDefault();
    } else {
      this.setState({ textResult: e.target.value });
      // this.props.onChange;
    }
  };
  render() {
    return (
      <div style={this.props.isShaded === true ? shadedBackground : {}}>
        <div style={fieldCss}>
          <Input
            //label="Write Comments"
            placeholder="Enter Comments"
            className="testing"
            fullWidth
            rows={4}
            rowsMax={4}
            multiline
            color="blue"
            onKeyDown={this.handle}
            onChange={this.props.onChange}
            disableUnderline={true}
            value={this.props.value}
          />
          <div
            id="feedback"
            style={{
              textAlign: "right",
              fontFamily: "Roboto",
              fontSize: "12px",
              color: "silver"
            }}
          >
            {300 - this.props.value.length} chars left
          </div>
        </div>
      </div>
    );
  }
}
export default CommentBox;
