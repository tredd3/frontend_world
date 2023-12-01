/** @jsx jsx */
import React, { useState, useEffect, useCallback } from 'react';
import { jsx, css } from '@emotion/core';
import { useHistory, useParams } from 'react-router-dom';
import PageTemplate from '../uiControls/PageTemplate/PageTemplate';
import {
  FormControl, FormControlLabel, RadioGroup, Radio
} from '../Material-UI';
import Button from '../uiControls/button';
import Loader from '../uiControls/Loader';
import {
  PaymentMethodsReturnType, getPaymentModes, PaymentMethodId
} from '../../services/cart';
import { InfoTiny } from '../../assets/images/svg';
import { trackShipments, trackPage } from '../../helpers/analytics';
import useQueryParams from '../../hooks/use-query-params';

const styles = {
  button: css`
    margin: 15px;
    text-align: center;
  `,
  header: css`
    font-size: 16px;
    width: 100%;
    background-color: #004D9C;
    display: flex;
    color: #FFF;
    align-items: center;
    min-height: 50px;
  `,
  headerItem: css`
    flex-grow: 1;
    width: 50%;
    height: 100%;
    font-weight: 600;
    font-size: 16px;

    &:first-of-type {
      padding-left: 15px;
      border-right: 1px solid #6492c3;
    }

    &:last-child {
      text-align: right;
      padding-right: 15px;
    }
  `,
  formContainer: css`
    margin: 15px;
    font-size: 14px;

    & .formControlLabel {
      margin: 0;
      border: 1px solid #DBDBDB;
      position: relative;
      padding: 7px 12px;
      background-color: #fff
    }

    & .formControlLabel:last-child {
      margin-top: 15px;
    }
  `,
  formTitle: css`
    font-weight: 600;
    font-size: 14px;
  `,
  form: css`
    width: 100%;
  `,
  formControlLabel: css`
    margin: 0;
    border: 1px solid #DBDBDB;
    position: relative;
    padding: 7px 12px;
    background-color: #fff;

    &:not(:last-child) {
      margin-bottom: 15px;
    }
  `,
  formLabel: (isSelected: boolean) => css`
    color: ${isSelected ? 'hsla(208, 100%, 37%, 1)' : '#333'};
    font-size: 14px;
  `,
  storeLabel: css`
    font-size: 12px;
  `,
  storeLabelCaption: css`
    font-weight: 600;
  `,
  radioButton: css`
    margin-right: 8px;
    padding: 0px;
  `
};

const SelectPaymentMethodPage: React.FC = () => {
  const history = useHistory();
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<PaymentMethodId | null>(null);
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethodsReturnType | null>(null);
  const { id } = useParams();
  const queryParam = useQueryParams();

  const addressId = Number(id);
  const dateId = Number(queryParam('date'));

  useEffect(() => {
    (async () => {
      const paymentMethods = await getPaymentModes(addressId, dateId);
      setPaymentMethods(paymentMethods);
      setSelectedPaymentMethod(paymentMethods.paymentMethods[0].id);
    })();
  }, [addressId, dateId]);

  useEffect(() => { trackPage('Payment Page'); }, []);

  const onClickContinue = useCallback(() => {
    trackShipments('selectPaymentMethod');
    history.push(`/cart/addresses/${addressId}/place-order?date=${dateId}&payment=${selectedPaymentMethod}`);
  }, [history, dateId, selectedPaymentMethod, addressId]);

  const onChangePaymentMethod = (_event: unknown, value: string) => {
    setSelectedPaymentMethod(value as PaymentMethodId);
  };

  return (
    <PageTemplate
      history={history}
      subSection={false}
      deliverySection={false}
      lefticon2={false}
      righticon2={false}
      righticon1={false}
      title="Select a Payment Method"
      footerNode={(
        <div css={styles.button}>
          <Button text="Continue" type="solidTulip" onClick={onClickContinue} />
        </div>
      )}
    >
      {!paymentMethods
        ? <Loader />
        : (
          <React.Fragment>
            <div css={styles.header}>
              <div css={styles.headerItem}>Total Amount</div>
              <div css={styles.headerItem}>
                {`₹ ${paymentMethods.totalPayableAmount.toFixed(2)}`}
              </div>
            </div>
            <div css={styles.formContainer}>
              <h3 css={styles.formTitle}>Choose Payment Options</h3>
              <FormControl component="fieldset" style={{ width: '100%' }}>
                <RadioGroup
                  aria-label="Choose delivery date"
                  name="delivery"
                  value={selectedPaymentMethod}
                  onChange={onChangePaymentMethod}
                >
                  {paymentMethods.paymentMethods.map(({
                    id, label, enabled, disabledReason
                  }) => (
                    <FormControlLabel
                      css={styles.formControlLabel}
                      value={id}
                      disabled={!enabled}
                      key={id}
                      control={(<Radio color="primary" css={styles.radioButton} />)}
                      label={(
                        <div>
                          <span
                            css={styles.formLabel(id === selectedPaymentMethod)}
                          >
                            {label}
                          </span>
                          <br />
                          {(id === selectedPaymentMethod) ? (
                            <div css={styles.storeLabel}>
                              <span css={styles.storeLabelCaption}>Served by</span>
                              <span>{` ${paymentMethods.storeName}`}</span>
                            </div>
                          ) : null}
                          {!enabled ? (
                            <span>
                              <InfoTiny />
                                &nbsp;
                              {disabledReason}
                            </span>
                          ) : null}
                        </div>
                      )}
                      labelPlacement="end"
                    />
                  ))}
                </RadioGroup>
              </FormControl>
            </div>
          </React.Fragment>
        )}
    </PageTemplate>
  );
};

export default SelectPaymentMethodPage;
