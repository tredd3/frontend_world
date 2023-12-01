import React from "react";
import { connect } from "react-redux";
import {
    ChevronRight,
    FormControl
} from "../../../materialUI";
import { cartAddExistingItem, cartAddItem } from "../../../actions/cart"

@connect(
    state => ({}),
    dispatch => {
        return {
            addExistingItem: function (item) {
                dispatch(cartAddExistingItem(item));
            },
            addItem: function (item) {
                dispatch(cartAddItem(item));
            },
        };
    }
)
class Quantity extends React.Component {
    state = {
        quantity: this.props.SelectedQuantity
    };

    handleChange = (name, product) => event => {
        if (this.props.replaceQuantity) {
            this.props.addItem({ ...product, Quantity: parseInt(event.target.value) });
            return;
        }
        this.props.addExistingItem({ ...product, Quantity: parseInt(event.target.value) })
    };

    render() {
        const { quantity, ProductSkuId, IsFc, handleChange, fromWidget = false } = this.props;
        const style = !quantity ? {
            borderRadius: 2,
            width: "65px",
            padding: "4px 1px",
            margin: 0
        } : fromWidget ? {
            borderRadius: 2,
            width: "90%",
            padding: "4px 1px",
            margin: 0
        } : {};
        const arrowStyle = !quantity || fromWidget ? {
            right: 0,
            top: "17px",
        } : {};
        const selectStyle = !quantity ? {
            paddingLeft: "33px"
        } : {};
        const qtyStyle = !quantity ? {
            position: "absolute",
            top: "4px",
            left: "6px",
            fontSize: "14px",
            color: "#333333"
        } : fromWidget ? {
            position: "absolute",
            top: "4px",
            left: "30%",
            fontSize: "14px",
            color: "#333333"
        } : {}
        const dropDownStyle = fromWidget ? {
            fontSize: "14px",
            fontFamily: "inherit",
            background: "transparent",
            border: "none",
            height: '100%',
            outline: "none",
            paddingLeft: "50%"
        } : {
                background: "transparent",
                border: "none",
                height: '100%',
                paddingLeft: 5
            };

        return (<FormControl
            variant="outlined"
            style={{
                ...{
                    margin: "0 10px 0 0",
                    position: "relative",
                    backgroundImage:
                        "linear-gradient(to bottom, #F9FAFC, #E8E7EC)",
                    borderRadius: 2,
                    color: "#333333",
                    fontSize: "14px",
                    fontFamily: "inherit",
                    // padding: "10px 20px 10px 20px",
                    border: "solid #A5A5A5 1px",
                    textTransform: "none",
                    fontWeight: 400,
                    textDecoration: "none",
                    width: "50px"
                }, ...style
            }}
        >
            <span
                style={{
                    ...{
                        position: "absolute",
                        right: "5px",
                        top: "55%",
                        transform: "translate(0, -50%)",
                        pointerEvents: "none"
                    }, ...arrowStyle
                }}
            >
                <ChevronRight
                    style={{
                        transform: "rotate(90deg)",
                        color: "#333333"
                    }}
                />
            </span>
            {(!quantity || fromWidget) ? <span style={qtyStyle}>Qty:</span> : null}
            {quantity ?
                <select
                    className={"select-selected"}
                    value={quantity}
                    // defaultValue={this.state.quantity}
                    onChange={this.handleChange("quantity", {
                        ProductSkuId,
                        ProductType: IsFc
                    })}
                    style={dropDownStyle}
                >
                    {Array(20)
                        .fill("")
                        .map((a, i) => (
                            <option key={i} value={i}>
                                {i}
                            </option>
                        ))}
                </select> : <select
                    className={"select-selected"}
                    // defaultValue={this.state.quantity}
                    onChange={handleChange}
                    style={{
                        ...{
                            fontSize: "14px",
                            fontFamily: "inherit",
                            background: "transparent",
                            border: "none",
                            height: '100%',
                            outline: "none"
                        }, ...selectStyle
                    }}
                >
                    {Array(20)
                        .fill("")
                        .map((a, i) => {
                            if (i === 0) return null;
                            else return (
                                <option key={i} value={i}>
                                    {i}
                                </option>)
                        })}
                    {/* <option value={-1}>
                        -1
                    </option> */}
                </select>}
        </FormControl>)
    }
}

export default Quantity;
