import React from 'react';
import { withStyles } from '@material-ui/core';
import {
  AddressHomeOn, AddressHomeOff, AddressWorkOn, AddressWorkOff, AddressOthersOn, AddressOthersOff
} from '../../assets/images/svg';
import {
  FormControlLabel, RadioGroup, Radio
} from '../Material-UI';
import style from './style';
import { APIAddress } from '../../types';

const AddressTagField: React.FC<{value: APIAddress['addressTag']; classes?: any}> = ({ value, classes }) => (
  <RadioGroup
    name="addressTag"
    className={classes.flex}
    style={{ flexDirection: 'row' }}
    value={value}
  >
    <FormControlLabel
      className={classes.formControlLabelRoot}
      value="home"
      label=""
      control={(
        <Radio
          classes={{ checked: classes.radioOn, root: classes.radioOff }}
          disableRipple
          className={`${classes.pad5} ${classes.padLeftZero}`}
          icon={(
            <>
              <AddressHomeOff />
              <span className="radio-label">Home</span>
            </>
          )}
          checkedIcon={(
            <>
              <AddressHomeOn />
              <span className="radio-label">Home</span>
            </>
          )}
        />
      )}
    />
    <FormControlLabel
      className={classes.formControlLabelRoot}
      value="work"
      label=""
      control={(
        <Radio
          classes={{ checked: classes.radioOn, root: classes.radioOff }}
          disableRipple
          className={classes.pad5}
          icon={(
            <>
              <AddressWorkOff />
              <span className="radio-label">Work</span>
            </>
          )}
          checkedIcon={(
            <>
              <AddressWorkOn />
              <span className="radio-label">Work</span>
            </>
          )}
        />
      )}
    />
    <FormControlLabel
      className={classes.formControlLabelRoot}
      label=""
      value={value !== 'home' && value !== 'work' ? value : ''}
      control={(
        <Radio
          classes={{ checked: classes.radioOn, root: classes.radioOff }}
          disableRipple
          className={classes.pad5}
          icon={(
            <>
              <AddressOthersOff />
              <span className="radio-label">Others</span>
            </>
          )}
          checkedIcon={(
            <>
              {' '}
              <AddressOthersOn />
              <span className="radio-label">Others</span>
            </>
          )}
        />
      )}
    />
  </RadioGroup>
);

export default withStyles(style)(AddressTagField);
