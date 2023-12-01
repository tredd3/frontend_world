/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import React, {
  useEffect, useState, memo, useCallback
} from 'react';

import { withStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import Radio, { RadioProps } from '@material-ui/core/Radio';
import { getUser, updateUser } from '../../services/user';
import { UserPivot } from '../../types';
import PageTemplate from '../uiControls/PageTemplate/PageTemplate';
import GoldButton from '../uiControls/button';
import Loader from '../uiControls/Loader';
import useBoolean from '../../hooks/use-boolean';
import useSnackbar from '../../hooks/use-snackbar';
import {
  Button, TextField, RadioGroup, FormControlLabel, FormControl
} from '../Material-UI';
import { RightBlack } from '../../assets/images/svg';
import { formatDate } from '../../helpers/functional';
import { trackPage } from '../../helpers/analytics';
import STYLE_CONST from '../../constants/style';

const root = css`
  margin: 15px;
  margin-top: -70px;
`;

const aboutHead = css`
  margin: 70px 0px 20px 0px;
  padding-top: 10px;
  display: flex;
`;

const title = css`
  font-weight: 600;
  color: #333333;
  font-size: 13px;
`;

const labels = css`
  font-size: 12px;
  color: #999999;
`;
const labelError = css`
  font-size: 12px;
  color: #f44336;
`;
const editAction = css`
  font-size: 14px;
  color: #0066C0;
  margin-left: auto;
`;

const aboutCase = css`
 margin: 15px 0px;
`;

const nameCase = css`
 display:flex; 
 flex-direction : row;
`;

const plainNameVal = css`
  font-size: 14px;
  color: #616267;
  padding-bottom:5px;
  overflow-wrap: break-word;
`;

const lastNameCase = css`
  margin: 15px 0px 15px 10px;
`;

const values = css`
  font-size: 14px;
  color: #616267;
  height: 20px;
`;

const flex = css`
  display: flex;
  flex-direction: row;
`;

const labelColor = css`
  color: #616267;
`;

const RadioButton = withStyles({
  root: {
    padding: '3px 12px',
    color: '#0066C0 !important',
    '&$checked': {
      color: '#0066C0 !important'
    }
  }
})((props: RadioProps) => <Radio color="default" {...props} />);

const fs14 = css`
  font-size: ${STYLE_CONST.fontSize.fs14};
  color: #616267;
  font-family: ${STYLE_CONST.fontFamily};
`;

const button = css`
  text-transform: capitalize;
  margin: 0px;
  width: 100%;
  color: #616267;
  border: 1px solid #999999;
  background-color: transparent;
`;

const btnContent = css` 
  display: inline-block;
  margin-right: auto;
`;

const MAX_NAME_FIELD_LENGTH = 50;

const About: React.FC = () => {
  const [user, setUser] = useState<Pick<UserPivot, 'userId' | 'phoneNumber' | 'gender' | 'firstName' | 'lastName' | 'dob' | 'email'>>({
    userId: 0,
    phoneNumber: 0,
    dob: undefined,
    email: '',
    firstName: '',
    gender: 'male',
    lastName: ''
  });
  const [editMode, setEditMode, setViewMode] = useBoolean(false);
  const [emailError, setEmailError] = useState(false);
  const [loader, showLoader, hideLoader] = useBoolean(false);
  const history = useHistory();
  const showSnackbar = useSnackbar();

  const refreshUser = useCallback(async () => {
    showLoader();
    setUser(await getUser());
    hideLoader();
  }, [hideLoader, showLoader]);

  useEffect(() => {
    trackPage('About Page');
    refreshUser();
  }, [refreshUser]);

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { target: { name, value } } = event;
    const parsedValue = value.substr(0, MAX_NAME_FIELD_LENGTH);
    setUser({ ...user, [name as keyof UserPivot]: parsedValue });
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { target: { name, value, checked } } = event;
    if (checked !== undefined) {
      setUser({ ...user, [name as keyof UserPivot]: value });
    }
    if (name.includes('email')) {
      setUser({
        ...user,
        [name as keyof UserPivot]: value
      });
      setEmailError(event.target.value.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i) === null);
    } else {
      setUser({ ...user, [name as keyof UserPivot]: value });
    }
  };

  const handleSave = async () => {
    showLoader();

    try {
      await updateUser(user);
      hideLoader();
      setViewMode();
    } catch (e) {
      showSnackbar({
        message: e.message,
        type: 'error'
      });
      hideLoader();
    }
  };

  if (!user) return null;

  const {
    phoneNumber, gender, firstName, lastName, dob, email
  } = user;

  const footer = editMode
    ? (
      <div style={{ display: 'grid', padding: 10, background: '#fff' }}>
        <GoldButton
          type="solidTulip"
          text="Save"
          disable={(!firstName || !lastName || !gender || (email && emailError))}
          onClick={() => handleSave()}
        />
      </div>
    )
    : null;

  const renderEditMode = () => (
    <React.Fragment>
      <div css={nameCase}>
        <div css={aboutCase}>
          <div css={firstName ? labels : labelError}>First Name</div>
          <TextField
            name="firstName"
            multiline
            inputProps={{ css: { input: fs14 } }}
            fullWidth
            onChange={handleNameChange}
            value={firstName}
            error={!firstName}
          />
        </div>
        <div css={lastNameCase}>
          <div css={lastName ? labels : labelError}>Last Name</div>
          <TextField
            name="lastName"
            multiline
            inputProps={{ css: { input: fs14 } }}
            fullWidth
            onChange={handleNameChange}
            value={lastName}
            error={!lastName}
          />
        </div>
      </div>
      <div css={aboutCase}>
        <div css={labels}>Gender</div>

        <FormControl component="fieldset">
          <RadioGroup
            name="gender"
            css={flex}
            value={gender}
            onChange={handleChange}
          >
            <FormControlLabel
              css={labelColor}
              value="male"
              label="Male"
              control={<RadioButton disableRipple />}
            />
            <FormControlLabel
              css={{ label: labelColor }}
              value="female"
              label="Female"
              control={<RadioButton disableRipple />}
            />
          </RadioGroup>
        </FormControl>
      </div>
      <div css={aboutCase}>
        <div css={labels}>Date of Birth</div>
        <TextField
          name="dob"
          type="date"
          inputProps={{
            max: new Date().toISOString().split('T')[0],
            classes: { input: fs14 },
            value: dob ? formatDate(dob) : ''
          }}
          fullWidth
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            const { target: { name, value } } = event;
            setUser({ ...user, [name as keyof UserPivot]: value ? new Date(value) : undefined });
          }}
        />
      </div>
      <div css={aboutCase}>
        <div css={email && emailError ? labelError : labels}>Email address</div>
        <TextField
          InputProps={{ css: { input: fs14 }, type: 'email' }}
          required
          name="email"
          type="email"
          error={Boolean(email && emailError)}
          helperText={email && emailError ? 'Please provide valid email address.' : ''}
          fullWidth
          onChange={handleChange}
          value={email}
        />
      </div>
    </React.Fragment>
  );

  const renderViewMode = () => (
    <React.Fragment>
      <div css={aboutCase}>
        <div css={labels}>Name</div>
        {' '}
        <div css={plainNameVal}>{`${firstName} ${lastName}`}</div>
        {' '}
      </div>
      <div css={aboutCase}>
        <div css={labels}>Gender</div>
        <div css={values}>
          {gender === 'male' ? 'Male' : (gender === 'female') ? 'Female' : null}
        </div>
      </div>
      <div css={aboutCase}>
        <div css={labels}>Date of Birth</div>
        <div css={values}>{dob ? formatDate(dob) : null}</div>
      </div>
      <div css={aboutCase}>
        <div css={labels}>Email address</div>
        <div css={values}>{email}</div>
      </div>
      <Button
        onClick={() => history.push('/account/addresses')}
        css={button}
      >
        <div css={btnContent}>My Address</div>
        <RightBlack />
      </Button>
    </React.Fragment>
  );

  if (loader) return <Loader />;

  return (
    <PageTemplate
      whiteBackground
      footerNode={footer}
      history={history}
      righticon1={false}
      righticon2={false}
      subSection={false}
    >
      <div css={root}>
        <div css={aboutHead}>
          <div css={`${labels} ${title}`}>My Account</div>
          <div
            css={editAction}
            onClick={() => {
              if (editMode) {
                //  Preserve previous state. if user is in
                // edit mode and cancel operation.
                refreshUser();
                setViewMode();
              } else {
                setEditMode();
              }
            }}
          >
            {(!editMode) ? 'Edit' : 'Cancel'}

          </div>
        </div>
        <div css={aboutCase}>
          <div css={labels}>Mobile Number</div>
          <div css={values}>
            {' '}
            {phoneNumber}
          </div>
        </div>

        {editMode
          ? renderEditMode()
          : renderViewMode()}
      </div>
    </PageTemplate>
  );
};

export default memo(About);
