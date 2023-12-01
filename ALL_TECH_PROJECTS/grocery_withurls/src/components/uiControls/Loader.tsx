/** @jsx jsx */
import { jsx, css, keyframes } from '@emotion/core';
import { useEffect, memo } from 'react';
import STYLE_CONST from '../../constants/style';

const apiLoader = css`
  position: fixed;
  background-color: transparent;
  height: 100vh;
  width: 100vw;
  z-index: 999;
  overflow: hidden;
`;

const animName = keyframes`
  0%{
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const apiCenterLoader = css`
  position: absolute;
  top: 0px;
  bottom: 0px;
  left: 0px;
  right: 0px;
  margin: auto;
  border: 2px solid ${STYLE_CONST.blue.cobalt};
  border-left: 2px solid transparent;
  border-radius: 50%;
  width: 32px;
  height: 32px;
  animation: ${animName} 1s linear infinite;
`;

export default memo(() => {
  useEffect(() => {
    document.body.setAttribute('style', 'overflow: hidden');

    return () => document.body.setAttribute('style', 'overflow: auto');
  });

  return (
    <div css={apiLoader}>
      <span css={apiCenterLoader} />
    </div>
  );
});
