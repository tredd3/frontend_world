import React from 'react';
import { withStyles } from '@material-ui/core';
import { connect } from 'react-redux';
import PageTemplate from '../uiControls/PageTemplate/PageTemplate';
import style from './style';
import { fetchApi } from '../../helpers/network/fetch';
import API_ROUTES from '../../helpers/network/api-routes';
import SingleSearchSuggestion from './SingleSearchSuggestion';
import NoResult from '../uiControls/NoResults';
import ShopByCategory from '../shopByCategory/ShopByCategory';
import Category from '../shopByCategory/Category';
import store from '../../store';
import { searchTextAction } from '../../actions/shopByCategories';
import { closeWindow } from '../../intents';
import { pipe } from '../../helpers/functional';
import { track, trackPage, setPurchaseJourney } from '../../helpers/analytics';
import { getUser } from '../../services/user';
import { setFromMyJioSearch, isFromMyJioSearch, removeFromMyJioSearch } from '../../helpers/utilities';
import { searchResultsUrl } from '../../helpers/urls';

export default pipe(
  withStyles(style),
  connect(state => ({
    fetchingApi: state.app.fetchingApi,
    searchText: state.searchText
  }))
)(
  class DashBoardSearch extends React.Component {
    constructor(props) {
      super(props);
      // -> inputText is the props that you are passing to SingleSearchSuggestion... e.g., When you type haldiram.
      //    SingleSearchSuggestion is the case when you are showing a single suggestion.
      // -> Show Suggestion is a flag, whether to render the show Suggestion page or not.
      // -> Response is all the suggested categories that you get, like "Salt & Sugar", "Oral Care" etc.
      // -> suggestionResponse is all the suggestion you get, when you type a text in search bar.
      this.state = {
        suggestionResponse: '',
        showSuggestions: false,
        inputText: '',
        expanded: false
      };
    }

    componentDidMount = () => {
      setFromMyJioSearch();
      window.scrollTo(0, 0);
      this.searchedText = this.props.searchText;
      if (this.searchedText !== '') this.handleSearchUpdate(this.searchedText);
      trackPage('Search Listing Page');
    };

    componentDidUpdate(prevProps) {
      if (prevProps.fetchingApi === true && this.props.fetchingApi === false) {
        // eslint-disable-next-line react/no-did-update-set-state
        this.setState({ showComponent: true });
      }
    }

    fetchSuggestion = async input => {
      let storeRequestParams = {};
      let storeLocationParams = {};
      const user = await getUser();
      const {
        preferences: {
          storeId, pincode, lat, lng
        }
      } = user;

      if (storeId) {
        storeRequestParams = {
          storeId,
          storePincode: pincode
        };

        storeLocationParams = { lat, lon: lng };
      }

      const body = {
        autoSuggestPayload: { searchTerm: input, ...storeRequestParams },
        geoDistance: { lat: 0.0, lon: 0.0, ...storeLocationParams }
      };

      fetchApi({ url: API_ROUTES.getSuggestions, body })
        .then(response => {
          this.setState({ suggestionResponse: response });
        });
    };

    handleSearchUpdate = input => {
      const len = input.length;
      this.setState({
        inputText: input
      });
      // When length is 0, you need to show category list
      // When length is greater than 0, if length is greater than 3, show suggested Suggestion
      // When length is greater than 0, if length is less than 3, show blank page
      if (len > 0) {
        // don't set the state again and again of showSuggestion
        if (this.state.showSuggestions === false) {
          this.setState({ showSuggestions: true });
        }
        if (len >= 3) {
          this.fetchSuggestion(input);
        } else {
          this.setState({
            suggestionResponse: ''
          });
        }
      } else {
        this.setState({
          showSuggestions: false,
          suggestionResponse: ''
        });
        track('nullSearches', {
          internal: {
            searchTerm: this.state.inputText,
            searchType: 'text'
          }
        });
      }
    };

    onClickSingleSearchSuggestion = (
      productName, count, rank
    ) => () => {
      track('internalSearchResult', {
        internal: {
          searchTerm: this.state.inputText,
          searchType: 'text',
          numberOfSearchResult: count,
          resultRank: rank,
          resultSelected: productName
        }
      });
      setPurchaseJourney('Search');
      store.dispatch(searchTextAction(productName));
      const { history } = this.props;
      history.push(searchResultsUrl(productName));
    };

    render() {
      const { history } = this.props;
      const { showComponent } = this.state;
      let suggestions = [];
      suggestions = this.state.suggestionResponse.Data ? this.state.suggestionResponse.Data : [];
      suggestions = suggestions.Suggest ? suggestions.Suggest : [];
      suggestions = suggestions['product-suggest'] ? suggestions['product-suggest'] : [];

      const { inputText } = this.state;
      return (
        <PageTemplate
          history={history}
          showAddress={false}
          deliverySection={false}
          handleSearchUpdate={this.handleSearchUpdate}
          showSearchedText
          {...(!this.state.showSuggestions ? { showCategories: false } : { showCategories: true })}
          backIconCallback={() => {
            if (isFromMyJioSearch()) {
              removeFromMyJioSearch();
              closeWindow();
              return;
            }
            store.dispatch(searchTextAction(''));
            const { history } = this.props;
            history.goBack();
          }}
          whiteBackground
          shouldInputAutoFocus
        >
          <div>
            {this.state.showSuggestions && suggestions.length > 0 ? (
              suggestions.map((data, index) => (
                <SingleSearchSuggestion
                  key={index}
                  displayText={data.displayText}
                  inputText={inputText}
                  onClickSingleSearchSuggestion={this.onClickSingleSearchSuggestion(data.displayText, suggestions.length, index)}
                />
              ))
            ) : null}
          </div>

          {!this.state.showSuggestions ? <ShopByCategory searchVersion history={history} /> : null}
          {suggestions.length === 0 && Category.length > 0 && this.state.inputText.length > 0 ? (
            <div>
              {this.state.inputText.length > 3 && showComponent ? (
                <div style={{ background: '#F2F2F2' }}>
                  <NoResult page="dashSearch" text={this.state.inputText} />
                </div>
              ) : null}
              <ShopByCategory searchVersion history={history} />
            </div>
          ) : null}
        </PageTemplate>
      );
    }
  }
);
