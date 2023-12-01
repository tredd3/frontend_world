import STYLE_CONST from '../../../constants/style';
const { black, blue } = STYLE_CONST;

export default {
    couponWrapper: {
        color: blue.navyBlue,
        marginBottom: "6px",
        border: `1px solid ${black.silver}`,
        padding: "4px 0",
        fontSize: "10px",
        height: "10px",
        "& .coupon": {
            display: "flex",
            "& .couponIcon": {
                fontSize: "inherit",
                margin: "0 2px",
                width: "11px",
                height: "11px"
            },
            "& .couponText": {
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
                marginTop: "-2px"
            }
        }
    },
    noCoupon: {
        visibility: "hidden",
        height: "25px"
    },
    coupon2: {
        display: "flex", justifyContent: "space-between", border: "1px solid", padding: "10px"
    },
    iconText: {
        display: "flex"
    },
    offerIcon: {
        display: "flex", alignItems: "center", marginLeft: "5px", marginRight: "8px", color: "green"
    },
    coupAvlText: {
        color: "#1111afbf"
    },
    isLoginText: {
        color: "#7b6f6f"
    },
    information: {
        display: "flex", alignItems: "center", color: "blue"
    }

}
