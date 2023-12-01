import * as React from "react";
import { Input } from "../../materialUI";
import Search from "@material-ui/icons/Search";
import Clear from "@material-ui/icons/Clear";
// import Speech from "./Speech";
// import Mic from "@material-ui/icons/Mic";
interface IProps {
  style?: React.CSSProperties;
  hintStyle?: React.CSSProperties;
  clearIconStyle?: React.CSSProperties;
  handleSearchUpdate?: any;
  handleKeypress?: any;
  handleFocus?: any;
  hintText?: string;
  searchwrapperStyle?: React.CSSProperties;
  hintHeight?: number;
  inputStyle?: React.CSSProperties;
}

interface IStateType {
  inputText: string;
  listening: Boolean;
}

// Commenting below speech recognition code , as this is breaking MyJio webview because it doesnt support it yet. 

// const SpeechRecognition: any = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
// const recognition = new SpeechRecognition()
// recognition.continous = true
// recognition.interimResults = true
// recognition.lang = 'en-IN'
class SearchBar extends React.Component<IProps, IStateType> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      inputText: "",
      listening: false
    };
  }

  // handleListen = () => {
  //   this.setState(
  //     {
  //       listening: true
  //     }, () => {
  //       recognition.start();
  //       console.log("stared listening")
  //       let finalTranscript = ''
  //       recognition.onresult = (event: any) => {
  //         if (event.results[0].isFinal) {
  //           let i = event.resultIndex;
  //           finalTranscript = event.results[i][0].transcript
  //         }
  //         this.props.handleSearchUpdate(finalTranscript);
  //         this.setState({
  //           inputText: finalTranscript,
  //           listening: false
  //         })

  //       }
  //       recognition.onend = () => {
  //         console.log('Stopping Speech')
  //         this.setState({
  //           listening: false
  //         })
  //       }
  //     }
  //   )
    // handle speech recognition here
  // }

  /*
    Will be called when the user starts typing the text in textfield
  */
  handleSearchUpdate = (e: any) => {
    e.persist(); //since synthetic event object is used in a async way i.e after certain time  
    //all the event properties(like keycode) were nullified
    this.setState({
      inputText: e.target.value
    });
    if (this.props.handleSearchUpdate)
      this.props.handleSearchUpdate(e.target.value);
  }

  handleFocus = (called: boolean) => (e: any) => {
    if (!called && this.props.handleFocus) {
      this.props.handleFocus(e.target.value);
      called = true;
    }
  }


  /*
    Will be called when the user presses enter key
  */
  // const handleKeypress = (e: any) => {
  //   props.handleKeypress(e.target.value);
  // }
  render() {

    const hintStyle: React.CSSProperties = {
      fontSize: "13px",
      fontFamily: "inherit", ...this.props.hintStyle
    }
    const searchwrapperStyle: React.CSSProperties = { display: "flex", borderBottom: "1px solid #999999", padding: "3px", borderRadius: "2px", ...this.props.searchwrapperStyle }
    const { hintText } = this.props;
    const inputText = this.state.inputText;
    return (
      <div style={searchwrapperStyle}>
        <Search
          style={{
            margin: "6px",
            fontSize: "16px",
            fontFamily: "inherit",
            color: "#999999"
          }}
        />
        <Input
          placeholder={this.state.listening === true ? "Listening" : hintText}
          fullWidth
          rows={1}
          autoFocus={false}
          value={inputText}
          //onKeyPress={handleKeypress}
          onFocus={this.handleFocus(false)}
          onChange={this.handleSearchUpdate}
          disableUnderline={true}
          style={hintStyle}
        />
        {inputText.length > 0 ?
          (<Clear
            style={{
              margin: "6px",
              fontSize: "16px",
              fontFamily: "inherit",
              color: "#000000"
            }}
            onClick={(e) => {
              this.setState({ inputText: "" });
              this.props.handleSearchUpdate("");
            }}
          />) :
          // this.state.listening === false ? 
          // <Mic style={{
          //   margin: "6px",
          //   fontSize: "16px",
          //   fontFamily: "inherit",
          //   color: "#000000"
          // }} onClick={this.handleListen} /> : 
          // <Mic style={{
          //   margin: "6px",
          //   fontSize: "16px",
          //   fontFamily: "inherit",
          //   color: "blue"
          // }}  />
          null
        }
      </div>
    );
  }
}

export default SearchBar;
