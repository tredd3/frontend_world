import React from 'react';
import PageTemplate from '../../uiControls/PageTemplate/PageTemplate';
import AddressList from './addressList';
import { selectAddress } from '../../../actions/address';
import { connect } from 'react-redux'

// const setAddress = (addressId) => {
//     this.props.selectAddress(addressId);
// }


const mapStateToProps = (state) => ({})

const mapDispatchToProps = (dispatch) => {
    return {
        selectAddress: id => {
            dispatch(selectAddress(id))
        }
    }
}

const Addresses = ({ history, selectAddress }) => (
    <PageTemplate righticon1={false} history={history} righticon2={false} subSection={false}>
        <AddressList history={history} parentHandler={selectAddress} />
    </PageTemplate>);


const AllAddress = connect(
    mapStateToProps,
    mapDispatchToProps
)(Addresses)

export default AllAddress
