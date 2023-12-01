import STYLE_CONST from '../../constants/style';
const {
    blue,
    red,
    green,
    black,
    white,
    fontWeight
} = STYLE_CONST;
export default {
    totalResults: {
        fontWeight: "bold",
        fontFamily: "OPEN SANS",
        fontSize: "12.5px",
        color: black.black
    },
    sortFunctionalityDiv: {
        display: "flex",
        justifyContent: "space-between",
        padding: "10px 16px"
    },
    sortFilterDiv: {
        display: "flex",
        color: blue.navyBlue,
        alignItems: "center",
        fontSize: "13px",
        "& span": {
            marginLeft: "5px"
        }
    },
    sortFilterImage: {
        marginRight: "5px"
    },
    sortFilterText: {
        marginRight: "15px",
        color: blue.navyBlue,
        fontSize: "12px",
        fontFamily: "OPEN SANS "
    },
    productPic: {
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "contain",
        minWidth: "23%",
        marginRight: "7%"
    },
    priceWrapper: {
        width: "65%"
    },
    buttonsWrapper: {
        display: "flex",
        flexDirection: "column",
        width: "70px",
        marginTop: "5px"
    },
    productName: {
        fontSize: "13px",
        fontFamily: "OPEN SANS REGULAR",
        color: black.black
    },
    detailsWrapper: {
        width: "100%"
    },
    detailsSection: {
        display: "flex",
        justifyContent: "space-between"
    },
    productInfo: {
        display: "flex",
        margin: "8px 0"
    },
    productDiscriptionSection: {
        margin: "15px"
    },
    brandTitle: {
        display: "flex",
        justifyContent: "space-between"
    },
    CategoryName: {
        color: blue.sky,
        fontSize: "13px",
        fontFamily: "OPEN SANS"
    },
    productDescriptionImage: {
        textAlign: "center",
        paddingTop: "35px",
        height: "185px",
        width: "70%",
        margin: "0 auto",
        marginBottom: "40px",
        position: "relative"
    },
    productMRP: {
        marginBottom: "5px",
        fontSize: "14px",
        color: "#444444"
    },
    productPrice: {
        marginBottom: "5px",
        color: "#444444",
        fontSize: "15px",
        fontFamily: "OPEN SANS",
        fontWeight: fontWeight.semiBold,
        "& span": {
            color: red.speechRed
        }
    },
    productSave: {
        marginBottom: "5px",
        color: "#444444",
        fontWeight: fontWeight.semiBold,
        fontSize: "15px",
        fontFamily: "OPEN SANS",
        "& span": {
            color: green.green
        }
    },
    coupon: {
        paddingTop: "3px",
        paddingBottom: "3px"
    },
    quantityButton: {
        marginBottom: "5px"
    },
    addToCartButton: {
        width: "40%"
    },
    buyNowButton: {
        width: "40%"
    },
    divider: {
        background: "#F5F5F5",
        padding: "2px"
    },
    divider2: {
        background: "#F5F5F5",
        padding: "1px",
        marginTop: "5px",
        marginBottom: "5px"
    },
    aboutThisItem: {
        margin: "15px",
        fontFamily: "OPEN SANS",
        fontSize: "14px",
        color: black.black
    },
    additionalInformation: {
        margin: "15px",
        fontFamily: "OPEN SANS",
        fontSize: "14px",
        color: black.black
    },
    similarItem: {
        margin: "15px"
    },
    addAndBuyNow: {
        display: "flex",
        justifyContent: "space-between",
        marginTop: "10px",
        "& span": {
            width: "45%"
        }
    },
    Checkbox: {
        display: "flex",
        justifyContent: "space-between",
        flexDirection: "row-reverse",
        margin: 0,
        "& span": {
            paddingRight: 0
        }

    },
    RadioButton: {
        margin: 0,
        display: "flex",
        justifyContent: "space-between",
        width: "100%",
        alignItems: "center",
        borderBottom: `1px solid ${black.silver}`,
        "& span": {
            paddingRight: 0
        }
    },
    ExpansionPanelSummary: {
        padding: "12px 15px",
        minHeight: "0!important",
        "& div": {
            margin: "0!important"
        },
        "& div:nth-child(2)": {
            padding: 0,
            marginRight: "3px!important"
        }
    },
    expansionPanelDetails: {
        padding: "0 15px",
        flexDirection: "column"
    },
    formControl: {
        width: "100%"
    },
    shareIcon: {
        color: "#8c8a8a"
    },
    deliveryInfIcon: {
        display: "flex",
        justifyContent: "center",
        height: "50px",
        width: "50px",
        background: white.whiteSmoke,
        borderRadius: "50%"
    },
    deliveryInfIcon2: {
        display: "flex",
        justifyContent: "center"
    },
    deliveryInf: {
        display: "flex",
        justifyContent: "space-around",
        marginTop: "10px",
        marginBottom: "10px"
    },
    deliveryInfText: {
        display: "flex",
        justifyContent: "center",
        fontSize: "12px",
        color: black.black,
        fontFamily: "OPEN SANS",
        fontWeight: "530"
    },
    SubcategoryWidget: {
        minWidth: 50,
        maxWidth: 50,
        height: 60,
        boxSizing: 'border-box',
        //minWidth: '30px',
        padding: "8px",
        // paddingBottom: 0,
        marginRight: "8px",
        textAlign: "center",
        '& span': {
            width: 30
        },
        '& img': {
            width: 30
        },
        "& .categoryName": {
            //fontSize: "10px",
            fontSize: 8,
            textAlign: "center",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis"
        }
    },
    filterHeader: {
        backgroundColor: white.whiteSmoke,
        display: "flex",
        justifyContent: "space-between",
        fontSize: "13px",
        fontFamily: "inherit",
        fontWeight: 600,
        padding: "15px",
        width: "auto",
        "& .title": {
            color: black.black
        },
        "& .clear": {
            color: blue.sky
        }
    },
    filterOptions: {
        maxHeight: "300px",
        maxWidth: "220px",
        overflow: "scroll"
    },
    filters: {
        display: "flex",
        flexDirection: "column",
        fontSize: "12px",
        "& .filtersName": {
            color: blue.sky,
            width: "150px",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis"
        }
    }
}
