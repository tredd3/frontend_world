import * as React from "react";
import * as ReactDOM from "react-dom";
import SingleSearchSuggestion from "../search/SingleSearchSuggestion";
import NoResult from "../uiControls/NoResults";

class Suggestions extends React.Component {

    onClickSingleSearchSuggestion = (productName) => e => {
        console.log("CLICKED");
        console.log(this.props);
        const { history } = this.props;
        // history.goBack();
        history.push(`/productsList/${productName}`);
        // const { history } = this.props;
        // history.push(`/productsList/${productName}`);
    }

    render() {
        let suggestedDataArray = [];
        suggestedDataArray = this.props.suggestedDataArray;
        return ReactDOM.createPortal(
            (suggestedDataArray.length > 0) ? (<div
                style={{
                    position: "absolute",
                    top: "0",
                    bottom: "0",
                    left: "0",
                    right: "0",
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "white",
                    zIndex: 2
                }}>
                {suggestedDataArray.map((data, index) => {
                    return (
                        <SingleSearchSuggestion key={index} displayText={data.displayText} inputText={this.props.inputText}
                            onClickSingleSearchSuggestion={this.onClickSingleSearchSuggestion(data.displayText)}
                        />
                    )
                }
                )
                }
            </div>
            ) : (
                    <div
                        style={{
                            position: "fixed",
                            top: "127px",
                            bottom: "0",
                            left: "0",
                            right: "0",
                            justifyContent: "center",
                            alignItems: "center",
                            backgroundColor: "white",
                            zIndex: 2
                        }}>
                        <NoResult text="No results" />
                    </div>

                ), document.getElementById(this.props.id)
        )
    }
}
export default Suggestions;