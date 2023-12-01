/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { Link } from 'react-router-dom';
import { ReactComponent as EditIcon } from '../../assets/images/svg/address_pencil_outline.xml.svg';
import { ReactComponent as DeleteIcon } from '../../assets/images/svg/delete_icon.svg';

const buttonStyles = css`
  display: inline-block;
  flex: 1;
  appearance: none;
  border: none;
  background: #eee;
  border-radius: 50%;
  padding: 3px 6px;
  text-align: center;
  z-index: 5;
`;

export const EditButton: React.FC<{ href: string }> = ({ href }) => (
  <Link to={href} css={buttonStyles} replace>
    <EditIcon />
  </Link>
);

const deleteButtonStyles = css`
  padding: 5px 7px 5px 7px;
  margin-left: 15px;
`;

export const DeleteButton: React.FC<{ onClick: React.MouseEventHandler<HTMLButtonElement> }> = (
  ({ onClick }) => (
    <button onClick={onClick} css={[buttonStyles, deleteButtonStyles]}>
      <DeleteIcon />
    </button>
  )
);
