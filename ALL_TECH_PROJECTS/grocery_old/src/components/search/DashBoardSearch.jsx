import * as React from 'react'
import PageTemplate from '../uiControls/PageTemplate/PageTemplate'
import style from './style'
import suggestionResponse from './suggestionResponse'
import injectSheet from 'react-jss'
import { fetchApi } from '../../helper/network/fetch'
import API_ROUTES from '../../helper/network/api-routes'
import SingleSearchSuggestion from './SingleSearchSuggestion'
import NoResult from '../uiControls/NoResults'
import ShopByCategory from '../../components/shopByCategory/ShopByCategory'
import Category from '../shopByCategory/Category';
import { connect } from "react-redux";

@injectSheet(style)

@connect(
  state => {
    return {
      fetchingApi: state.app.fetchingApi
    }
  }
)

class DashBoardSearch extends React.Component {
  constructor(props) {
    super(props)
    // -> inputText is the props that you are passing to SingleSearchSuggestion... e.g., When you type haldiram.
    //    SingleSearchSuggestion is the case when you are showing a single suggestion.
    // -> Show Suggestion is a flag, whether to render the show Suggestion page or not.
    // -> Response is all the suggested categories that you get, like "Salt & Sugar", "Oral Care" etc.
    // -> suggestionResponse is all the suggestion you get, when you type a text in search bar.
    this.state = {
      suggestionReponse: '',
      showSuggestions: false,
      inputText: '',
      expanded: false
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.fetchingApi === true && this.props.fetchingApi === false) {
      this.setState({ showComponent: true })
    }
  }

  // Method to fetch all the suggested results when you type a text on search bar.

  fetchSuggestion = input => {
    let body = {
      autoSuggestPayload: { searchTerm: 'fgdd' },
      geoDistance: { lat: 0.0, lon: 0.0 }
    }
    body.autoSuggestPayload.searchTerm = input
    fetchApi({ url: API_ROUTES.getSuggestions, body: body })
      .then(response => {
        this.setState({ suggestionReponse: response })
      })
      .catch(json => {
        // this.setState({ suggestionReponse: suggestionResponse })
        console.log('Suggestion Response in catch block')
      })
  }

  // Callback function you are passing to the search component.
  handleSearchUpdate = input => {
    let len = input.length
    this.setState({
      inputText: input
    })
    // When length is 0, you need to show category list
    // When length is greater than 0, if length is greater than 3, show suggested Suggestion
    // When length is greater than 0, if length is less than 3, show blank page
    if (len > 0) {
      // don't set the state again and again of showSuggestion
      if (this.state.showSuggestions === false) {
        this.setState({ showSuggestions: true })
      }
      if (len >= 3) {
        this.fetchSuggestion(input)
      } else {
        this.setState({
          suggestionReponse: ''
        })
      }
    } else {
      this.setState({
        showSuggestions: false,
        suggestionResponse: ''
      })
    }
  }

  onClickSingleSearchSuggestion = productName => e => {
    const { history } = this.props
    history.push({
      pathname: `/productsList/${productName}`,
      state: {
        routeType: "SUGGESTION"
      }
    })
  }

  handleChange = CategoryId => (e, isExpanded) => {
    let expand = isExpanded ? CategoryId : false
    this.setState({ expanded: expand })
  }

  render() {
    // To get all the category data
    // Category data is coming from Store
    const { history } = this.props
    const { showComponent } = this.state;
    let suggestedDataArray = []
    suggestedDataArray = this.state.suggestionReponse.Data
      ? this.state.suggestionReponse.Data
      : []
    suggestedDataArray = suggestedDataArray.Suggest
      ? suggestedDataArray.Suggest
      : []
    suggestedDataArray = suggestedDataArray[`product-suggest`]
      ? suggestedDataArray[`product-suggest`]
      : []

    let inputText = this.state.inputText
    return (
      <PageTemplate
        history={history}
        showAddress={false}
        deliverySection={false}
        handleSearchUpdate={this.handleSearchUpdate}
        {...(!this.state.showSuggestions
          ? { showCategories: false }
          : { showCategories: true })}
        whiteBackground
      >
        <div>
          {this.state.showSuggestions && suggestedDataArray.length > 0
            ? suggestedDataArray.map((data, index) => {
              return (
                <SingleSearchSuggestion
                  key={index}
                  displayText={data.displayText}
                  inputText={inputText}
                  onClickSingleSearchSuggestion={this.onClickSingleSearchSuggestion(
                    data.displayText
                  )}
                />
              )
            })
            : null}
          {/* {this.state.showSuggestions && suggestedDataArray.length === 0 ? (
            <NoResult />
          ) : (
            console.log('Showing Suggestion')
          )} */}
        </div>


        {!this.state.showSuggestions ? (
          <ShopByCategory searchVersion={true} history={history} />
        ) : null}
        {
          suggestedDataArray.length === 0 && Category.length > 0 && this.state.inputText.length > 0 ? (
            <div>
              <div style={{ background: "#F2F2F2" }}>
                <NoResult page="dashSearch" text={this.state.inputText} showComponent={showComponent} />
              </div>
              <ShopByCategory searchVersion={true} history={history} />
            </div>
          ) : (null)
        }
      </PageTemplate>
    )
  }
}

export default DashBoardSearch
