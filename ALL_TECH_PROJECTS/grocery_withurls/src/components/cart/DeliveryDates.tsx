/** @jsx jsx */
import React, { useEffect, useState, memo } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { css, jsx } from '@emotion/core';
import { withStyles } from '@material-ui/core';
import { getDeliveryDates, doesDeliveryDateChangeCart } from '../../services/cart';
import { DeliveryDatePivot } from '../../types';
import {
  FormControl, FormControlLabel, RadioGroup, Radio
} from '../Material-UI';
import Button from '../uiControls/button';
import { pipe } from '../../helpers/functional';
import useSnackbar from '../../hooks/use-snackbar';
import PageTemplate from '../uiControls/PageTemplate/PageTemplate';
import { trackShipments } from '../../helpers/analytics';
import FooterActionPlaceholder from '../uiControls/FooterActionPlaceholder';
import { closeWindow } from '../../intents';
import { isFromMyJioSearch, removeFromMyJioSearch } from '../../helpers/utilities';

const m15 = css`
  margin: 15px;
  margin-top: -15px;
`;

const formGroupContainer = css`
  border: 1px solid #DBDBDB;
  border-radius: 2px;
  background-color: #fff;
  padding: 5px 15px;
`;

const formGroup = css`
  width: 100%;
  font-weight: 600;
  font-size: 14;
`;

const footerRoot = css`
  border-top: 1px solid #DBDBDB;
  content: '';
  position: relative;
  color: #999999;
  margin: 0 15px;
`;

const cancelButton = css`
  position: absolute;
  top: 0;
  left: 50%;
  margin-right: -50%;
  transform: translate(-50%, -50%);
  padding: 0 10px;
  background-color: #f2f2f2;
`;

const styles = {
  formControlLabel: {
    margin: 0,
    borderRadius: 2
  },
  borderBottom: {
    borderBottom: '1px solid #DBDBDB'
  },
  radioButton: {
    marginLeft: -15,
    color: 'hsla(208, 100%, 37%, 1) !important',
    '&$checked': {
      color: 'hsla(208, 100%, 37%, 1)'
    }
  },
  checkLabel: {
    color: '#0066C0',
    fontWeight: 600,
    fontSize: 14

  },
  uncheckLabel: {
    fontWeight: 600,
    fontSize: 14
  }
};

type Props = {classes: any};

const DeliveryDates: React.FC<Props> = ({ classes }) => {
  const [deliveryDates, setDeliveryDates] = useState<DeliveryDatePivot[] | null>(null);
  const [selectedDateId, setSelectedDateId] = useState<number | null>(null);
  const { id: addressId } = useParams();
  const history = useHistory();
  const showSnackbar = useSnackbar();

  useEffect(() => {
    getDeliveryDates(Number(addressId)).then(setDeliveryDates);
  }, [addressId]);

  const selectDeliveryDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!deliveryDates) return;

    setSelectedDateId(
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      deliveryDates
        .find(deliveryOption => Number(e.target.value) === deliveryOption.id)!
        .id
    );
  };

  const onDateSelected = async () => {
    try {
      trackShipments('confirmDeliveryOption');
      history.push(
        (await doesDeliveryDateChangeCart(Number(addressId), selectedDateId!))
          ? `/cart/addresses/${addressId}/update?date=${selectedDateId}`
          : `/cart/addresses/${addressId}/select-payment?date=${selectedDateId}`
      );
    } catch (e) {
      showSnackbar({
        message: e.message,
        type: 'error'
      });
    }
  };

  const cancelCheckout = () => {
    trackShipments('cancellationFromDeliveryPage');
    if (isFromMyJioSearch()) {
      removeFromMyJioSearch();
      closeWindow();
    } else {
      history.push('/');
    }
  };

  return (
    <PageTemplate
      history={history}
      subSection={false}
      deliverySection={false}
      lefticon2={false}
      righticon2={false}
      righticon1={false}
      lefticon1
      title="Choose Delivery Option"
    >
      <div css={m15}>
        <h3 style={{ paddingTop: 10 }} className="fs14 semiBold">Choose Your Delivery Day</h3>
        {deliveryDates
          ? (
            <div css={formGroupContainer}>
              <FormControl component="fieldset" css={formGroup}>
                <RadioGroup
                  aria-label="Choose a delivery date"
                  name="delivery"
                  value={selectedDateId}
                  onChange={selectDeliveryDate}
                >
                  {deliveryDates.length
                    ? deliveryDates.map((mode, i) => (
                      <FormControlLabel
                        key={mode.id}
                        classes={{
                          // eslint-disable-next-line max-len
                          root: `${classes.formControlLabel} ${(deliveryDates.length - 1) !== i ? classes.borderBottom : ''}`,
                          label: mode.id === selectedDateId
                            ? classes.checkLabel
                            : classes.uncheckLabel
                        }}
                        value={mode.id}
                        control={(
                          <Radio classes={{ root: classes.radioButton }} />
                        )}
                        label={mode.label}
                        labelPlacement="end"
                      />
                    ))
                    : null}
                </RadioGroup>
              </FormControl>
            </div>
          ) : null}
      </div>
      <Button
        wrapperStyle={{ margin: 15, fontWeight: 600, fontSize: 14 }}
        text="Continue"
        type="solidTulip"
        onClick={onDateSelected}
        disable={!selectedDateId}
      />
      <FooterActionPlaceholder>
        <div css={footerRoot}>
          <div
            css={cancelButton}
            className="fs14 regular"
          >
            {' '}
            OR
          </div>
          <div
            style={{ margin: '20px 0' }}
            onClick={cancelCheckout}
            className="fs14 semiBold"
          >
            Cancel and Continue Shopping
          </div>
        </div>
      </FooterActionPlaceholder>
    </PageTemplate>
  );
};

export default pipe(withStyles(styles), memo)(DeliveryDates);
