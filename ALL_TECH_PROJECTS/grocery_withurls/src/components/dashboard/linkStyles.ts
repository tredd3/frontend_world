import { css } from '@emotion/core';

const baseStyles = css`
  text-decoration: none;
  outline: none;
`;

export default css`
  ${baseStyles};

  :hover, :focus, :visited, :active {
    ${baseStyles}
  }
`;
