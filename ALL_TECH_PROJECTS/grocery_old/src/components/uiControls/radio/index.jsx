import React from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

export default class RadioWrapper extends React.PureComponent {

  render() {
    let {radioGroup} = this.props;
    return (
      <FormControl component="fieldset" className={radioGroup.rootClsName || "deafultRadioRoot"}>
        <RadioGroup
          aria-label="position"
          name={radioGroup.name}
          value={radioGroup.selected}
          onChange={e => radioGroup.parentHandler(e)}
          row
          className={radioGroup.clsName}
        >
        {
          radioGroup.groups.map((group, index) => {
            let activeCls = radioGroup.selected == group.val ? "active" : "inactive"
              return(
                <FormControlLabel
                  classes={group.labelClass}
                  key={index}
                  value={group.val}
                  control={<Radio disableRipple color="primary" classes={group.radioClasses} />}
                  label={group.label}
                  labelPlacement={group.labelPlacement || "end"}
                  className={group.clsName + " " + activeCls || activeCls + " defaultRadioBtn"}
                />
              )
          })
        }
        </RadioGroup>
      </FormControl>
    );
  }
}
