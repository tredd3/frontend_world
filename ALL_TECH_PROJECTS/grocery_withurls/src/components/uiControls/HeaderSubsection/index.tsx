/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { memo } from 'react';
import { useHistory } from 'react-router-dom';
import SearchBar from '../SearchBar';

const wrapper = css`
  width: '60%'; 
  padding: 0; 
  color: #fff;
  background-color: #004D9C;
  padding: 0 16px 6px;
`;

type Props = {
  showSearchedText: boolean;
  shouldInputAutoFocus: boolean;
  inputText: string;
  handleFocus: (str: string) => void;
  handleSearchUpdate: (str: string) => void;
};

const HeaderSubsection: React.FC<Props> = ({
  showSearchedText, shouldInputAutoFocus, inputText, handleFocus, handleSearchUpdate
}) => {
  const history = useHistory();
  return (
    <div css={wrapper}>
      <SearchBar
        hintText="what are you looking for?"
        handleFocus={handleFocus}
        handleSearchUpdate={handleSearchUpdate}
        searchWrapperStyle={{ borderBottom: 'none', backgroundColor: '#fff' }}
        inputText={inputText}
        history={history}
        showSearchedText={showSearchedText}
        shouldInputAutoFocus={shouldInputAutoFocus}
      />
    </div>
  );
};
export default memo(HeaderSubsection);
