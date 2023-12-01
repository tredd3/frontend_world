export default {
    coupon: {
        display: 'inline-block',
        "& .couponWrapper": {
            color: '#0066C0',
            marginBottom: "6px",
            border: "1px solid #C4C4C4",
            padding: "4px",
            fontSize: "9px",
            height: "10px",
            "& .coupon": {
                display: "flex",
                "& .couponIcon": {
                    fontSize: "inherit",
                    marginRight: "5px"
                },
                "& .couponText": {
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis"
                }
            }
        }
    },
    productList: {
        border: "1px solid #DBDBDB",
        margin: 10,
        borderRadius: 4,

        "& .product-li": {
            borderBottom: "1px solid #DBDBDB",
        },
        "& .product-li:first-child": {
            borderRadius: "4px 4px 0 0"
        },
        "& .product-li:last-child": {
            borderRadius: "0 0 4px 4px",
            borderBottom: "none"
        },
    }
}