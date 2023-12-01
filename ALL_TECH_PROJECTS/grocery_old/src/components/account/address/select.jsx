import React from 'react';
import { connect } from "react-redux";
import style from "./style";
// import injectSheet from "react-jss";
// import Card from '../../uiControls/Card';
// import { ReactComponent as NoAddress } from '../../../assets/images/svg/noaddress.svg';
import Button from '../../uiControls/button';
import PageTemplate from '../../uiControls/PageTemplate/PageTemplate';
import FooterActionPlaceholder from '../../uiControls/FooterActionPlaceholder';
import { SwipeableDrawer } from '../../../materialUI'
import AddressList from './addressList'
// import RadioWrapper from '../../uiControls/radio';
import {selectAddress} from '../../../actions/address';

// @injectSheet(style)
@connect(
  state => ({
    address: state.userAddress.address,
    cart: state.cart
  }),
  dispatch => {
    return {
      selectAddress: id => {
        dispatch(selectAddress(id))
      }
    }
})

class SelectAddress extends React.Component {
  constructor(props){
    super(props)
    this.state={openDrawer: false, selectedAddress: ''}
  }
  deliverToAddress = () => {
    const { address } = this.props;
    // console.log("this address selected is  ", address)
    // Make Decision to Open Drawer for 
    // action1: SKIP: choose defaultStoreId mentioned in address
    // action2: SelectKirana: StoreID in address undefined or 0. 

    // Prefered store id if present, and selected address pincode is same, then go ahead with that updated cart 
    // prefered store id is not present , show bar , select delivery address

    localStorage.setItem('previousCartValue', this.props.cart.TotalPay);

    if(address.storeId === 0 || address.storeId === undefined ) {
      this.setState({openDrawer: true})
    }
    else if(address.storeId !==0 || address.storeId !== undefined ) {

      this.props.history.push({pathname: '/cart/update'})
    }
  }
  toggleDrawer = (open) => event => {
    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    let stateObj = {
      openDrawer: open
    }
    this.setState(stateObj);
  }

  setAddress = (addressId) => {
    this.setState({selectedAddress: addressId},this.props.selectAddress(addressId))
    // this.props.selectAddress(addressId);
  }
  
  skip = () => {
    this.props.history.push({pathname: '/cart/delivery-options'})
  }
  
  render() {
    let {classes,history } = this.props;
    let footer = <div style={{display: 'grid', padding:10, background: "#fff"}}><Button text={"Deliver to this address"} type="solidTulip" onClick={()=>this.deliverToAddress()} /></div>;
    
    
    return (
        <PageTemplate footerNode={footer} history={history} title={'Choose Delivery Address'} lefticon1={false} righticon1={false} righticon2={false} subSection={false}>
            <AddressList history={history} parentHandler={this.setAddress} />
            
            <SwipeableDrawer
              open={this.state.openDrawer}
              onClose={this.toggleDrawer(false)}
              onOpen={this.toggleDrawer(true)}
              anchor="bottom"
            >
              <div style={{margin:15}}>
                <h2 className={'fs14 semiBold'}>Faster Delivery From Local Shops</h2>
                <p className={'fs14'}>Some items in your shopping car can be fulfiled faster by partner Kirana shops in your locality.</p>
                <Button style={{margin: '15px 0'}} text="Select Local Kirana Partner" name="selectKirana" type="solidTulip" onClick={()=>{
                  history.push({pathname: '/select-kirana-deliver'})
                }} />
                <Button text="Skip" name="skip" type="solidGray" onClick={()=>{
                  history.push({pathname: '/cart/delivery-options'})
                }} />
              </div>
            </SwipeableDrawer>
        </PageTemplate>
    );
  }
}

export default SelectAddress
