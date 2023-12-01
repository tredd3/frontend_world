/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import React, {
  useCallback, useEffect, useState, useMemo
} from 'react';
import { useParams, useHistory } from 'react-router-dom';
import {
  withStyles, FormControl, RadioGroup, FormControlLabel, Radio
} from '@material-ui/core';
import { Sort } from '@material-ui/icons';
import { updateAddressWithKirana, deleteKiranaFromAddress, getStoreIdFromAddressId } from '../../services/address';
import { getPaginatedKiranas, KiranaSortOptions } from '../../services/kirana';
import UserLocation from '../uiControls/UserLocation';
import { NoAddress } from '../../assets/images/svg';
import style from './style';
import SortFilter from './sortFilter';
import SingleKirana from './singleKirana';
import KiranaSelectionButtons from './KiranaSelectionButtons';
import ConfirmRemoveKiranaDialog from '../address/ConfirmDialog';
import useSnackbar from '../../hooks/use-snackbar';
import useBoolean from '../../hooks/use-boolean';
import Loader from '../uiControls/Loader';
import SelectedKirana from './SelectedKirana';
import usePaginatedService from '../../hooks/use-paginated-service';
import PaginatedList from '../uiControls/PaginatedList';

const styles = {
  kiranaInviteWrapper: css`
    background-color: #fff;
    margin: 20px 15px;
  `,
  kiranaHeading: css`
    margin: 10px 15px 5px 0;
    font-size: 14px;
    font-weight: 300;
  `,
  kiranaHeaderWrapper: css`
    background-color: #fff;
    display: flex;
    justify-content: space-between;
    margin: 15px 15px 0 15px;
  `,
  kiranaSortButton: css`
    display: flex;
    align-items: center;
    color: hsla(208, 100%, 37%, 1);
    border: 0;
    background: 0;
    font-size: 14px;
  `
};

const SelectKirana: React.FC<{ classes: any}> = ({ classes }) => {
  const history = useHistory();
  const { id } = useParams();
  const [anchorEl, setAnchorEl] = useState<Element | null>(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [sort, setSort] = useState<KiranaSortOptions>('closest-first');
  const [selectedStoreId, setSelectedStoreId] = useState<number | null>(null);
  const [isRemoveSelectedKiranaModalShown, openRemoveSelectedKiranaModal, closeRemoveSelectedKiranaModal] = useBoolean(false);
  const [fetchingKiranas, startFetchingKiranas, doneFetchingKiranas] = useBoolean(true);
  const showSnackbar = useSnackbar();
  const addressId = Number(id);
  const redirectPath = history.location.pathname.includes('/cart/') ? `/cart/addresses?addressId=${id}` : '/account/addresses';

  const paginatedResults = usePaginatedService(
    async () => {
      startFetchingKiranas();
      const result = await getPaginatedKiranas({ addressId, sort });
      doneFetchingKiranas();
      return result;
    }, [addressId, sort, startFetchingKiranas, doneFetchingKiranas]
  );

  const getSelectedStoreId = useCallback(async () => {
    getStoreIdFromAddressId(addressId).then(setSelectedStoreId);
  }, [addressId]);

  useEffect(() => { getSelectedStoreId(); }, [getSelectedStoreId]);

  const selectedStore = useMemo(() => (
    paginatedResults.data && [
      ...paginatedResults.data.invites,
      ...paginatedResults.data.kiranas
    ].find(store => store.id === selectedStoreId)
  ), [paginatedResults, selectedStoreId]);

  const kiranas = useMemo(() => (
    paginatedResults.data && paginatedResults.data.kiranas
  ), [paginatedResults]);

  const kiranaInvites = useMemo(() => (
    paginatedResults.data && paginatedResults.data.invites
  ), [paginatedResults]);

  const toggleFilter = useCallback((event: React.MouseEvent) => {
    setAnchorEl(event.currentTarget);
    setIsFilterOpen(!isFilterOpen);
  }, [isFilterOpen]);

  const handleChangeSort = useCallback(async (event: any) => {
    const { value } = event.target;
    setSort(value);
    setIsFilterOpen(false);
  }, []);

  const changeStore = useCallback((event: any) => {
    setSelectedStoreId(Number(event.target.value));
  }, []);

  const onKiranaSelected = useCallback(async () => {
    if (!addressId) return;

    updateAddressWithKirana(addressId, {
      storeId: Number(selectedStoreId),
      storeName: (selectedStore && selectedStore.name) || ''
    }).then(() => (
      history.replace(redirectPath)
    )).catch(showSnackbar);
  }, [addressId, history, redirectPath, selectedStore, selectedStoreId, showSnackbar]);

  const deleteKirana = useCallback(async () => {
    await deleteKiranaFromAddress(addressId);
    closeRemoveSelectedKiranaModal();
    setSelectedStoreId(null);
  }, [addressId, closeRemoveSelectedKiranaModal]);

  const onCancelClick = useCallback(() => {
    history.replace(redirectPath);
  }, [history, redirectPath]);

  return (
    <div className={classes.root}>
      <UserLocation />
      {fetchingKiranas
        ? <Loader />
        : (
          <React.Fragment>
            <SortFilter
              anchorEl={anchorEl}
              open={isFilterOpen}
              sort={sort}
              handleClose={toggleFilter}
              handleChangeSort={handleChangeSort}
            />
            {kiranas && kiranas.length ? (
              <React.Fragment>
                <ConfirmRemoveKiranaDialog
                  open={isRemoveSelectedKiranaModalShown}
                  onClose={closeRemoveSelectedKiranaModal}
                  onConfirm={deleteKirana}
                  title="Remove Kirana"
                  text="This action would remove your Kirana partner and future order
                    delivery will be through a delivered partner. Do you wish to proceed?"
                />

                {selectedStore ? (
                  <SelectedKirana
                    store={selectedStore}
                    onRemoveClick={openRemoveSelectedKiranaModal}
                  />
                ) : null}

                {kiranaInvites && kiranaInvites.length ? (
                  <div css={styles.kiranaInviteWrapper}>
                    <h3 css={styles.kiranaHeading}>
                      Kirana invites for you
                    </h3>
                    <FormControl component="fieldset" className={classes.formControl}>
                      <RadioGroup
                        aria-label="Select your prefered Kirana Store"
                        name="kirana"
                        className={classes.group}
                        value={String(selectedStoreId)}
                        onChange={changeStore}
                      >
                        {kiranaInvites && kiranaInvites.map(store => (
                          <FormControlLabel
                            classes={{ root: classes.radioSpace }}
                            key={store.id}
                            value={String(store.id)}
                            control={<Radio classes={{ root: classes.radioColor }} />}
                            label={<SingleKirana store={store} />}
                            labelPlacement="start"
                          />
                        ))}
                      </RadioGroup>
                    </FormControl>
                  </div>
                ) : null}

                <div css={styles.kiranaHeaderWrapper}>
                  <h3 css={styles.kiranaHeading}>
                    Other Kiranas in your area
                  </h3>
                  <button
                    css={styles.kiranaSortButton}
                    aria-haspopup="true"
                    onClick={toggleFilter}
                  >
                    <Sort />
                    &nbsp; Sort
                  </button>
                </div>

                {kiranas ? (
                  <div css={styles.kiranaInviteWrapper}>
                    <FormControl component="fieldset" style={{ marginBottom: 120 }} className={classes.formControl}>
                      <RadioGroup
                        aria-label="Select your prefered Kirana Store"
                        name="kirana"
                        className={classes.group}
                        value={String(selectedStoreId)}
                        onChange={changeStore}
                      >
                        <PaginatedList
                          list={kiranas && kiranas.filter(store => store.id !== selectedStoreId)}
                          loadNextPage={paginatedResults.loadNextPage}
                          rowRenderer={({ item: store }) => (
                            <FormControlLabel
                              classes={{ root: classes.radioSpace }}
                              key={store.id}
                              value={String(store.id)}
                              control={<Radio classes={{ root: classes.radioColor }} />}
                              label={<SingleKirana store={store} />}
                              labelPlacement="start"
                            />
                          )}
                        />
                      </RadioGroup>
                    </FormControl>
                  </div>
                ) : null}
                <KiranaSelectionButtons
                  onCancel={onCancelClick}
                  onSelectKirana={onKiranaSelected}
                  isSaveButtonDisabled={!selectedStoreId}
                />
              </React.Fragment>
            ) : (
              <div className="noAdd">
                <NoAddress />
                <p className="noAddressText fs18 semiBold">No kirana found!</p>
                <p className="noAddressSubText fs14" />
              </div>
            )}
          </React.Fragment>
        )}
    </div>
  );
};

export default withStyles(style)(SelectKirana);
