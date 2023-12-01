/** @jsx jsx */
import { jsx, css, ClassNames } from '@emotion/core';
import { memo } from 'react';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import Filter from '../uiControls/filter';

const sortHeader = css`
  background-color: hsla(0, 0%, 96%, 1);
  display: flex;
  justify-content: space-between;
  padding: 10px;
  font-size: 12px;
  color: hsla(0, 0%, 20%, 1);
`;

const selectedSort = css`
  font-size: 12px;
  color: hsla(0, 0%, 60%, 1);
`;

const formControl = css`
  margin: 0;
  width: 100%;
  min-width: 180px;
  & label:last-child: {
    borderBottom: none;
  }
`;

const radioSpace = css`
  justify-content: space-between;
  border-bottom: 1px solid hsla(0, 0%, 85%, 1);
  margin: 0;
  padding: 0 10px;
`;

const radioPad = css`
  padding-right: 0px;
`;

const container = css`
  display: 'flex';
  flex-direction: 'column';
`;

const sortValues = {
  'closest-first': 'Closest First',
  alphabetical: 'Alphabetical'
};

type SortFilterProps = {
  anchorEl: Element | null;
  handleClose: (event: React.PointerEvent) => void;
  handleChangeSort: React.ChangeEventHandler<{}>;
  sort: string;
  open: boolean;
};

const SortFilter: React.FC<SortFilterProps> = ({
  anchorEl, handleClose, handleChangeSort, sort, open
}) => {
  if (!open) return null;
  return (
    <Filter anchorEl={anchorEl} handleClose={handleClose}>
      <div css={container} style={{ display: 'flex', flexDirection: 'column' }} data-testid="sort-filter">
        <div css={sortHeader}>
          <div>
            SORT
            <div
              css={selectedSort}
            >
              {sortValues[sort]}
            </div>
          </div>
        </div>
        <FormControl
          css={formControl}
          data-testid="sort-radio-group"
        >
          <ClassNames>
            {({ css }) => (
              <RadioGroup
                aria-label="Sort"
                name="Sort"
                value={sort}
                onChange={handleChangeSort}
              >
                {
                  Object.keys(sortValues).map(sortValue => (
                    <FormControlLabel
                      classes={{ root: css(radioSpace) }}
                      value={sortValue}
                      control={<Radio color="primary" classes={{ root: css(radioPad) }} />}
                      label={sortValues[sortValue]}
                      labelPlacement="start"
                      key={sortValue}
                    />
                  ))
                }
              </RadioGroup>
            )}
          </ClassNames>
        </FormControl>
      </div>
    </Filter>
  );
};

export default memo(SortFilter);
