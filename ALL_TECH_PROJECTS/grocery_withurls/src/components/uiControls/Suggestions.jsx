import React from 'react';
import ReactDOM from 'react-dom';
import SingleSearchSuggestion from '../search/SingleSearchSuggestion';
import NoResult from './NoResults';

export default ({
  history, suggestedDataArray, inputText, id
}) => {
  const onClickSingleSearchSuggestion = productName => () => {
    // TODO: This URL doesn't exist
    history.push(`/productsList/${productName}`);
  };

  return ReactDOM.createPortal(
    suggestedDataArray.length > 0 ? (
      <div
        style={{
          position: 'absolute',
          top: '0',
          bottom: '0',
          left: '0',
          right: '0',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'white',
          zIndex: 2
        }}
      >
        {suggestedDataArray.map((data, index) => (
          <SingleSearchSuggestion
            key={index}
            displayText={data.displayText}
            inputText={inputText}
            onClickSingleSearchSuggestion={onClickSingleSearchSuggestion(data.displayText)}
          />
        ))}
      </div>
    ) : (
      <div
        style={{
          position: 'fixed',
          top: '127px',
          bottom: '0',
          left: '0',
          right: '0',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'white',
          zIndex: 2
        }}
      >
        <NoResult text="No results" />
      </div>
    ),
    document.getElementById(id)
  );
};
