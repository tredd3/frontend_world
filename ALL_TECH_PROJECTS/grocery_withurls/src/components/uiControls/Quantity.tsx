/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { memo, useState, useEffect } from 'react';
import { range } from '../../helpers/functional';
import { getConfig } from '../../services/config';
import { ConfigPivot } from '../../types';

const wrapper = css`
  border-radius: 4px;
  border: 1px solid rgb(165, 165, 165);
  background-image: linear-gradient(to bottom, #f9fafc, #f4f5f8, #f0f1f4, #ececf0, #e8e7ec);
  display: flex;
  justify-content: center;
`;

const wrapperInner = css`
  position: relative;
  text-align: center;
  width: 70px;
`;

const quantity = css`
  position: absolute;
  top: 50%;
  padding-left: 5px;
  transform: translate(0, -56%);
  z-index: 0;
  font-size: 14px;
  font-weight: 600;
  pointer-events: none;
`;

// eslint-disable-next-line max-len
const downArrow = 'data:image/svg+xml;charset=US-ASCII,%3Csvg%20height%3D%225.401%22%20viewBox%3D%220%200%209.475%205.401%22%20width%3D%229.475%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%20%20%3Cpath%20d%3D%22M4.269%2C5.206%20L0.194%2C1.132a0.664%2C0.664%200%2C0%201%2C0.938%20-0.938l3.6%2C3.605%203.6%2C-3.6a0.664%2C0.664%200%2C0%201%2C0.938%200.938l-4.074%2C4.074a0.663%2C0.663%200%2C0%201%2C-0.938%200Z%22%20fill%3D%22%23000%22%2F%3E%0A%3C%2Fsvg%3E';

const selectStyles = css`
  display: block;
  font-size: 14px;
  font-weight: 600;
  color: #333;
  padding: 7px 15px 7px 35px;
  width: 100%;
  height: 100%;
  max-width: 100%; 
  max-height: 100%; 
  box-sizing: border-box;
  margin: 0;
  border: none;
  box-shadow: none;
  appearance: none;
  background-color: linear-gradient(to bottom, #f9fafc, #f4f5f8, #f0f1f4, #ececf0, #e8e7ec);
  background-image: url(${downArrow}), linear-gradient(to bottom, #f9fafc, #f4f5f8, #f0f1f4, #ececf0, #e8e7ec);
  background-repeat: no-repeat, repeat;
  background-position: right 5px top 50%, 0 0;
  background-size: .65em auto, 100%;

  &:focus {
    border-color: #333;
    box-shadow: none;
    box-shadow: 0 0 0 3px -moz-mac-focusring;
    outline: none;
  }
`;

const optionStyle = css`font-weight: 400;`;

type QuantityProps = {
  onChange: React.ChangeEventHandler<HTMLSelectElement>;
  value: number;
}

const Quantity: React.FC<QuantityProps> = ({ onChange, value }) => {
  const [config, setConfig] = useState<ConfigPivot | null>(null);

  const maxQuantity = config ? Number(config.maxQuantityLimitPerItem) : 20;

  useEffect(() => {
    const setConfigToState = async () => {
      const config = await getConfig();
      setConfig(config);
    };

    setConfigToState();
  }, []);

  return (
    <div css={wrapper}>
      <div css={wrapperInner}>
        <div css={quantity}>Qty:</div>
        <select css={selectStyles} value={value} onChange={onChange}>
          {
            range(maxQuantity)
              .map(i => (
                <option css={optionStyle} key={i + 1} value={i + 1}>
                  {i + 1}
                </option>
              ))
          }
        </select>
      </div>
    </div>
  );
};

export default memo(Quantity);
