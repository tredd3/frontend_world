import React from 'react';
import { connect } from "react-redux";
import style from "./style";
import injectSheet from "react-jss";
import Card from '../../uiControls/Card';
import { ReactComponent as NoAddress } from '../../../assets/images/svg/noaddress.svg';
import Button from '../../uiControls/button';
import RadioWrapper from '../../uiControls/radio';
import { deleteAddress, getAddress } from '../../../actions/address';
import Skeleton from '../../hoc/skeleton';
import { AddressHomeOn, AddressWorkOn, AddressOthersOn } from "../../../assets/images/svg";

@injectSheet(style)
@connect(state => {
  return {
    userAddress: state.userAddress
  }
}, dispatch => {
  return {
    deleteAddress: id => {
      dispatch(deleteAddress(id))
    },
    getAddress: () => {
      return dispatch(getAddress())
    }
  }
})
class AddressList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedAddress: 0
    }
  }
  handleEdit = (id) => () => {
    this.props.history.push("/account/address/edit/" + id);
  }

  handleDelete = (id) => () => {
    console.log("Delete: " + id);
    this.props.deleteAddress(id);
  }

  handleSelect = (e) => {
    let id = parseInt(e.target.value);
    this.setState({ selectedAddress: id });
    if(typeof this.props.parentHandler === "function") this.props.parentHandler(id);
  }

  addAddress = () => {
    this.props.history.push("/account/address/add");
  }

  componentDidMount() {
    Promise.all([this.props.getAddress()]).then(()=>this.setDefaultAddress());
    ;
  }
  componentDidUpdate(prevProps) {
    if (prevProps.userAddress.addresses.length !== this.props.userAddress.addresses.length) {
      this.setDefaultAddress()
    }
  }
  setDefaultAddress = () => {
    // let selectedAddress = this.props.userAddress.addresses.length > 0 && parseInt(this.props.userAddress.addresses[0].addressId);
    // let selectedAddress = this.props.userAddress.addresses.length > 0 && this.props.userAddress.addresses.filter(addr=>addr.isDefault)[0]["addressId"] || 0
    let selectedAddress = this.props.userAddress.addresses.length > 0 && this.props.userAddress.addresses.filter(addr=>addr.isDefault)[0] && this.props.userAddress.addresses.filter(addr=>addr.isDefault)[0]["addressId"] || 0
    // let selectedAddress = this.props.userAddress.address.addressId;
    this.setState({ selectedAddress })
  }

  addressIcon = (type) => {
    switch(type){
      case "Home": 
        return (<AddressHomeOn />);
      case "Work": 
        return (<AddressWorkOn />);
      case "Others":
        return (<AddressOthersOn />);
      default: 
        return null
      }
  }

  render() {
    let { classes, userAddress, action } = this.props
    let { selectedAddress } = this.state;
    
  
    return (
      <div className={classes.addressList}>
        <Skeleton>
          <Card clsName="addressListCard">
            <p className="head fs14">
              <span className="semiBold">MY ADDRESSES</span>
              <span onClick={this.addAddress}>+ Add Address</span>
            </p>
            {
              userAddress.addresses.length == 0 ? (
                <div className="noAdd">
                  <NoAddress />
                  <p className="noAddressText fs18 semiBold">No Address !</p>
                  <p className="noAddressSubText fs14">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod</p>
                </div>
              ) : (
                  userAddress.addresses.map((address,i) => {
                    let radioAddress = {
                      name: "addresses",
                      selected: selectedAddress.toString(),
                      clsName: "",
                      rootClsName: "",
                      groups: [
                        {
                          val: address.addressId.toString(),
                          label: address.firstName + ' ' + address.lastName,
                          labelPlacement: "end",
                          clsName: '',
                          radioClasses: { root: classes.radioPadBottom}
                        }
                      ],
                      parentHandler: this.handleSelect
                    }
                    return (
                      <Card key={i} clsName="addressBox">
                        <RadioWrapper radioGroup={radioAddress} />
                        {address.isDefault? (<div style={{marginLeft: "auto", backgroundColor: "#616267", fontSize: 9, textTransform: "uppercase", padding: "0 5px",color: "#fff", position: "absolute", right: 10, top: 10}}> default address</div>): null }
                        <div className={selectedAddress !== address.addressId ? "unselected" : "selected"}>
                          <p className="fs14 semiBold">{this.addressIcon(address.addressTag)}{' '}{address.addressTag}</p>
                          <p className="fs12">
                            {address.address + " " + address.addressLine1 + " " + address.addressLine2 + " " + address.addressLine3 } <br />
                              { " " + address.cityName + " " + address.pincode}
                          </p>
                          <p className="fs12">{address.phoneNumber}</p>
                        </div>
                        <div className="buttons">
                          <span onClick={this.handleEdit(address.addressId)}>
                            <Button text="Edit" name="edit" type="solidGray" />
                          </span>
                          {!address.isDefault ?(<span onClick={this.handleDelete(address.addressId)}>
                            <Button text="Delete" name="delete" type="solidGray" />
                          </span>): null}
                        </div>
                      </Card>
                    )
                  })
                )
            }
          </Card>
        </Skeleton>
      </div>
    );
  }
}

export default AddressList
