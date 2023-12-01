/** @jsx jsx */
import React from 'react';
import { jsx, css } from '@emotion/core';
import ReturnIcon from '@material-ui/icons/Reply';
import CancelIcon from '@material-ui/icons/CancelOutlined';
import { Drawer, Divider } from '../Material-UI';

const styles = {
  policyTitle: css`
    font-weight: 600;
    font-size: 13px;
  `,
  policyBody: css`
    font-size: 10px;
    color: rgb(102, 102, 102);
  `
};

type Props = {
  isOpen: boolean;
  onClose: () => unknown;
}

const ReturnPolicyDrawer: React.FC<Props> = props => {
  const { isOpen, onClose } = props;

  return (
    <Drawer
      anchor="bottom"
      open={isOpen}
      onClose={onClose}
    >
      <div style={{ margin: '15px' }}>
        <section>
          <div style={{ alignItems: 'center', display: 'flex' }}>
            <ReturnIcon />
            <div css={styles.policyTitle}>
              RETURN POLICY
            </div>
          </div>
          <div css={styles.policyBody}>
            We endeavour to provide the best quality products, every single time you order
            with us.
            <br />
            {' '}
            However, if you observe, the product is damaged or different from
            what was ordered or low on the quality. You may return the product at the time
            of delivery to the delivery agent. You can also call your Kirana/delivery point
            for any order related issues post-delivery.
          </div>
        </section>
        <Divider style={{ marginTop: '10px', marginBottom: '10px' }} />
        <section>
          <div style={{ alignItems: 'center', display: 'flex' }}>
            <CancelIcon />
            <div css={styles.policyTitle}>
              CANCELLATION POLICY
            </div>
          </div>
          <div css={styles.policyBody}>
            You can cancel the order anytime till the order is picked by us. Once the order
            is picked ‘Cancel’ button in the my order section will get disabled.
          </div>
        </section>
      </div>
    </Drawer>
  );
};

export default ReturnPolicyDrawer;
