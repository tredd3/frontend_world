import React from "react";
import ReactDOM from "react-dom";
import { connect } from "react-redux";
import {
  Button,
  ChevronRight,
  FormControl,
  InputLabel,
  LocalOffer,
  OutlinedInput,
  Select,
  TextField
} from "../../materialUI";
import ShipmentStyle from "./shipmentStyle";
import injectSheet from "react-jss";
import { cartGetItems, cartRemoveItem } from '../../actions/cart'
import Product from "./Product";

@injectSheet(ShipmentStyle)
@connect(
  state => ({}),
  dispatch => {
      return {
          removeItem: function (product) {
              dispatch(cartRemoveItem(product));
          },
          getCart: function () {
              dispatch(cartGetItems());
          },
      };
  }
)
class Shipment extends React.Component {
  // state = {
  //   quantity: ""
  //   // labelWidth: 0
  // };

  // componentDidMount() {
  //   this.setState({
  //     // labelWidth: ReactDOM.findDOMNode(this.InputLabelRef).offsetWidth,
  //   });
  // }

  // handleChange = (name,product={}) => event => {
  //   this.props.removeItem({...product, Quantity: event.target.value});
  //   // this.setState({ [name]: event.target.value });
  // };

  // componentDidUpdate (prevProps) {
  //   if (prevProps.details !== this.props) {
  //     console.log("Props have change, update quantity");
  //     // this.setState({ kiranas: this.props.kirana.all, invites: this.props.kirana.invites });
  //   }
  // }

  render() {
    console.log("shipment props", this.props);
    const { classes, price, details, sn, total } = this.props;
    return (
      <div className={classes.productList}>
        {/* <div
          style={{
            backgroundColor: "hsla(0, 0%, 94%, 1)",
            padding: "10px"
          }}
        >
          <h3
            style={{
              margin: "0 15px 5px 0",
              fontSize: "14px",
              textTransform: "uppercase"
            }}
          >
            Shipment of {sn} Of {total}
            <span
              style={{
                fontSize: "14px",
                fontWeight: 300,
                textTransform: "lowercase"
              }}
            >
              ({details.TotalItem} Items)
            </span>
          </h3> */}
          {details.Product.map((product, i) => (
              <Product {...product} key={i} />
          ))}
        {/* </div> */}
      </div>
    );
  }
}

export default Shipment;
