import * as React from 'react';
import Search from '@material-ui/icons/Search';
import Clear from '@material-ui/icons/Clear';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Input } from '../Material-UI';
import store from '../../store';
import { searchTextAction } from '../../actions/shopByCategories';
import { pipe } from '../../helpers/functional';
import { searchResultsUrl } from '../../helpers/urls';

export default pipe(
  withRouter,
  connect(state => ({ searchText: state.searchText }))
)(
  class SearchBar extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        inputText: '',
        listening: false
      };
      const { showSearchedText = false } = this.props;
      if (showSearchedText === true && this.props.searchText !== '' && this.props.searchText !== {}) {
        this.searchedText = this.props.searchText;
      } else {
        this.searchedText = '';
      }
    }

    componentDidMount = () => {
      if (this.searchedText !== '' && this.searchedText !== undefined) {
        this.setState({
          inputText: this.searchedText
        });
      }
    };

    /*
      Will be called when the user starts typing the text in text field
    */
    handleSearchUpdate = e => {
      e.persist(); // since synthetic event object is used in a async way i.e after certain time
      // all the event properties(like keycode) were nullified
      this.setState({
        inputText: e.target.value
      });
      if (this.props.handleSearchUpdate) this.props.handleSearchUpdate(e.target.value);
    };

    handleFocus = called => e => {
      if (!called && this.props.handleFocus) {
        this.props.handleFocus(e.target.value);
      }
    };

    handleKeypress = e => {
      const { disableKeypress = false, history } = this.props;
      if (!disableKeypress && (e.keyCode === 13 || e.key === 'Enter')) {
        const productName = e.target.value;
        store.dispatch(searchTextAction(productName));
        history.push(searchResultsUrl(productName));
      }
    };

    handleClearButton = () => {
      if (this.props.handleFocus) {
        this.props.handleFocus();
      } else {
        this.setState({ inputText: '' });
        this.props.handleSearchUpdate('');
      }
    };

    render() {
      const hintStyle = {
        fontSize: '13px',
        fontFamily: 'inherit',
        ...this.props.hintStyle
      };
      const searchWrapperStyle = {
        display: 'flex',
        borderBottom: '1px solid #999999',
        padding: '3px',
        borderRadius: '2px',
        ...this.props.searchWrapperStyle
      };
      const { hintText } = this.props;
      let inputText;
      if (this.props.inputText) {
        inputText = this.props.inputText;
      } else {
        inputText = this.state.inputText;
      }
      const { shouldInputAutoFocus } = this.props;

      return (
        <div style={searchWrapperStyle}>
          <Search
            style={{
              margin: '6px',
              fontSize: '16px',
              fontFamily: 'inherit',
              color: '#999999'
            }}
          />
          <Input
            placeholder={this.state.listening === true ? 'Listening' : hintText}
            fullWidth
            rows={1}
            autoFocus={shouldInputAutoFocus}
            value={inputText}
            onKeyPress={this.handleKeypress}
            onFocus={this.handleFocus(false)}
            onChange={this.handleSearchUpdate}
            disableUnderline
            style={hintStyle}
          />
          {inputText.length > 0 ? (
            <Clear
              style={{
                margin: '6px',
                fontSize: '16px',
                fontFamily: 'inherit',
                color: '#000000'
              }}
              onClick={this.handleClearButton}
            />
          ) : null}
        </div>
      );
    }
  }
);
