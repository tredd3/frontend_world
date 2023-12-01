/** @jsx jsx */
import React from 'react';
import { jsx, css } from '@emotion/core';
import Button from '../uiControls/button';

const footer = css`
  box-shadow: 0 -1px 5px 0px hsla(0, 0%, 0%, 0.16);
  display: flex;
`;

const buttonWrapper = css`
  width: 100%;
  padding: 0 10px;
  background-color: #fff;
`;

type KiranaSelectionButtonsProps = {
  onCancel: () => void;
  onSelectKirana: () => void;
  isSaveButtonDisabled: boolean;
}

const KiranaSelectionButtons: React.FC<KiranaSelectionButtonsProps> = ({ onCancel, onSelectKirana, isSaveButtonDisabled }) => (
  <div className="footer-div" css={footer}>
    <div css={buttonWrapper}>
      <Button text="Cancel" type="solidGray" onClick={onCancel} />
    </div>
    <div css={buttonWrapper}>
      <Button text="Save" type="solidTulip" onClick={onSelectKirana} disable={isSaveButtonDisabled} />
    </div>
  </div>
);

export default KiranaSelectionButtons;
