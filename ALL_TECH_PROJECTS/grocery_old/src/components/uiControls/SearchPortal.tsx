import * as React from "react";
import * as ReactDOM from "react-dom";
import Header from "./Header";
import Clear from "@material-ui/icons/Clear";
import SearchBar from "./SearchBar";
import { Typography } from "@material-ui/core";
import { Paper } from "@material-ui/core";

const makeRoot = document.getElementById("root") as HTMLElement;

interface IProps {
  click: any; //left icon click button
  data: string[]; //data coming up
  field: string; //header title
  change: any;
  value: string; //whom we are updating
  toggleName: string; //toggle to come out of the portal
}
interface IState {
  searchInput: string;
}

class SearchPortal extends React.Component<IProps, IState> {
  constructor(props: any) {
    super(props);
    this.state = { searchInput: "" };
  }

  handleSearchClear = (searchValue: string) => {
    if (!searchValue) {
      this.setState({ searchInput: searchValue });
    }
  };

  handleKeypress = (e: any, searchValue: any) => {
    if (e.keyCode === 13 || e.key === "Enter") {
      this.setState({ searchInput: searchValue });
    }
  };

  isSearched = (searchTerm: any) => (item: string) =>
    item.toLowerCase().includes(searchTerm.toLowerCase());

  update = (value: string) => {
    return (e: any) => {
      this.props.change(value, this.props.value, this.props.toggleName);
      //   document.body.style = "overflow: auto";
    };
  };

  render() {
    var filterValue = this.state.searchInput;
    const headertitle = this.props.field;
    return ReactDOM.createPortal(
      <div
        style={{
          position: "fixed",
          overflow: "scroll",
          top: "0",
          bottom: "0",
          left: "0",
          right: "0",
          backgroundColor: "white",
          zIndex: 2
        }}
      >
        <Header
          title={headertitle}
          lefticon1={<Clear style={{ marginRight: "14px" }} />}
          leftclick1={this.props.click}
        />
        <SearchBar
          hintText="Search"
          handleSearchUpdate={this.handleSearchClear}
          handleKeypress={this.handleKeypress}
        />
        <Typography
          style={{
            background: "lightgray",
            paddingLeft: "16px",
            paddingTop: "10px",
            paddingBottom: "10px"
          }}
        />
        <div>
          {this.props.data
            .filter(this.isSearched(filterValue))
            .map((item: string) => (
              <div key={item}>
                <Paper>
                  <Typography
                    component="p"
                    key={item}
                    style={{
                      padding: "16px"
                    }}
                    onClick={this.update(item)}
                  >
                    {item}
                  </Typography>
                </Paper>
              </div>
            ))}
        </div>
      </div>,
      makeRoot
    );
  }
}
export default SearchPortal;
