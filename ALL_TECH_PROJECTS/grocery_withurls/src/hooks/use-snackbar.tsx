/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import {
  createContext, useContext, useState, useCallback
} from 'react';
import { SuccessWhite, ErrorWhite } from '../assets/images/svg';
import { shouldLiftSnackbar } from '../helpers/utilities';

type SnackbarStatuses = 'error' | 'success' | 'info';

const success = css`background-color: #079A18;`;
const error = css`background-color: #E01E1E;`;
const info = css`background-color: #0066C0;`;

const styleForType = (type: SnackbarStatuses | undefined) => {
  if (type === 'success') return success;
  if (type === 'error') return error;
  return info;
};

const snackbarWrapper = (isLifted: boolean) => css`
  display: flex;
  margin-left: -10px;
  bottom: ${isLifted ? '55px' : '0px'};
  position: fixed;
  width: 100%;
  margin-left: 0;
  padding: 20px;
  color: white;
  z-index: 6;
`;

const iconContainer = css`
  display: inline-block;
  margin-right: 10px;
`;

type ShowSnackbarArgs =
  { message: string; type: SnackbarStatuses }
  | Error;

type ShowSnackbar = (a: ShowSnackbarArgs) => void;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const SnackbarContext = createContext<ShowSnackbar>(
  () => { throw new Error('The snackbar hook can only be used inside the <SnackbarProvider>'); }
);

type SnackbarState = { message?: string; type?: SnackbarStatuses; open: boolean; isLifted: boolean };

const snackbarIcon = (type: SnackbarStatuses | undefined) => {
  if (type === 'success') return <SuccessWhite />;
  return <ErrorWhite css={css`font-size: 10px;`} />;
};

export const SnackbarProvider: React.FC = ({ children }) => {
  const [snackbarState, setSnackbarState] = useState<SnackbarState>({ open: false, isLifted: false });

  const showSnackbar: ShowSnackbar = useCallback(thing => {
    setSnackbarState({
      message: thing.message,
      type: thing instanceof Error ? 'error' : thing.type,
      open: true,
      isLifted: shouldLiftSnackbar()
    });

    setTimeout(() => setSnackbarState({ open: false, isLifted: false }), 3000);
  }, [setSnackbarState]);

  return (
    <SnackbarContext.Provider value={showSnackbar}>
      {children}
      {!snackbarState.open
        ? null
        : (
          <div css={[snackbarWrapper(snackbarState.isLifted), styleForType(snackbarState.type)]}>
            <span css={iconContainer}>{snackbarIcon(snackbarState.type)}</span>
            <span>{snackbarState.message}</span>
          </div>
        )}
    </SnackbarContext.Provider>
  );
};

export default () => useContext(SnackbarContext);
