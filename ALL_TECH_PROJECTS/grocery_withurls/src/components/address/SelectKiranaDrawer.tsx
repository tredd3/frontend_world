import { SwipeableDrawer } from '@material-ui/core';
import React from 'react';
import { Close } from '@material-ui/icons';
import Button from '../uiControls/button';

type SelectKiranaDrawerProps = {
  open: boolean;
  onClose: () => void;
  onOpen: () => void;
  goToSelectKirana: () => void;
  skipKirana: () => void;
}

const SelectKiranaDrawer: React.FC<SelectKiranaDrawerProps> = ({
  open, onClose, onOpen, goToSelectKirana, skipKirana
}) => (
  <SwipeableDrawer
    open={open}
    onClose={onClose}
    onOpen={onOpen}
    anchor="bottom"
    disableSwipeToOpen
  >
    <div style={{ margin: 15 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <h2 className="fs14 semiBold">Faster delivery from local shops</h2>
        <Close
          style={{
            margin: '12px',
            fontSize: '16px',
            fontFamily: 'inherit',
            color: '#999999'
          }}
          onClick={onClose}
        />
      </div>
      <p className="fs14">
        Some items in your shopping cart can be fulfilled
        faster by partner Kirana shops in your locality.
      </p>
      <Button
        style={{ margin: '15px 0' }}
        text="Select local kirana partner"
        name="selectKirana"
        type="solidTulip"
        onClick={goToSelectKirana}
      />
      <Button
        text="Skip"
        name="skip"
        type="solidGray"
        onClick={skipKirana}
      />
    </div>
  </SwipeableDrawer>
);

export default SelectKiranaDrawer;
