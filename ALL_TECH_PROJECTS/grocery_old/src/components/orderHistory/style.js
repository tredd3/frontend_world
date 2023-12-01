import STYLE_CONST from '../../constants/style';
const { white, black, blue, fontWeight } = STYLE_CONST;
export default {
    title: {
        display: "flex",
        justifyContent: "space-between",
        margin: "65px 16px 20px",
        fontSize: "13px",
        fontFamily: "inherit"
    },
    order: {
        margin: "10px 7px 0",
        padding: "8px 12px",
        backgroundColor: white.white,
        border: `1px solid ${black.silver}`,
        borderRadius: "5px",
        borderLeft: `4px solid ${black.nobel}`
    },
    shipment: {
        marginTop: "7px",
        padding: "8px 12px 3px",
        fontSize: "13px",
        fontFamily: "inherit",
        backgroundColor: white.white,
        border: `1px solid ${blue.sky}`,
        borderRadius: "5px",
        borderLeft: `4px solid ${blue.sky}`
    },
    orderWrapper: {
        display: "flex",
        justifyContent: "space-between"
    },
    orderInfo: {
        flexBasis: "95%"
    },
    orderStore: {
        color: black.nobel,
        fontSize: "10px",
        marginBottom: "3px"
    },
    orderHeader: {
        color: black.black
    },
    orderFooter: {
        color: black.dimGray,
        fontSize: "10px",
        "& span": {
            marginRight: "4px"
        }
    },
    orderChevron: {
        position: "relative",
        top: "12px",
        right: "-8px",
        color: blue.navyBlue
    },
    shipmentHeader: {
        display: "flex",
        justifyContent: "space-between",
        color: "#000",
        "& .totalShipments": {
            color: black.nobel,
            marginLeft: "10px"
        },
        "& .shipmentStatus": {
            color: blue.sky
        }
    },
    shipmentId: {
        color: black.nobel,
        fontSize: "10px",
        marginBottom: "3px"
    },
    shipmentFooter: {
        display: "flex",
        justifyContent: "space-between",
        marginTop: "-10px",
        "& .shipmentDetails": {
            color: black.dimGray,
            fontSize: "10px",
            fontFamily: "inherit",
            display: "flex",
            alignItems: "flex-end",
            "& span": {
                marginRight: "4px"
            }
        },
        "& .shipmentView": {
            color: blue.sky,
            marginTop: "3px"
        }
    },
    orderFilterDiv: {
        display: "flex",
        color: blue.navyBlue,
        alignItems: "center",
        fontSize: "13px",
        "& span": {
            marginLeft: "5px"
        }
    },
    shipmentChevron: {
        position: "relative",
        top: "8px",
        right: "-8px",
    },
    filterHeader: {
        backgroundColor: white.whiteSmoke,
        display: "flex",
        justifyContent: "space-between",
        fontSize: "13px",
        fontFamily: "inherit",
        padding: "16px",
        fontWeight: 600,
        width: "175px",
        "& .title": {
            color: black.black
        },
        "& .clear": {
            color: blue.sky
        }
    },
    filterOptions: {
        maxHeight: "400px",
        overflow: "scroll"
    },
    filterOption: {
        margin: 0,
        display: "flex",
        justifyContent: "space-between",
        padding: "10px 0",
        borderBottom: `1px solid ${black.silver}`
    },
    expansionPanel: {
        margin: 0
    },
    expansionPanelSummary: {
        padding: "0 16px",
        "& div:nth-child(2)": {
            padding: 0,
            marginRight: "3px!important"
        },
        "& [MuiExpansionPanelSummary-content*=]": {
            margin: 0,
            borderBottom: `1px solid ${black.silver}`
        },
        "& .heading": {
            color: black.black,
            fontSize: "15px",
            fontWeight: fontWeight.regular
        },
        "& .subHeading": {
            color: blue.sky,
            fontSize: "13px",
            fontWeight: fontWeight.regular
        }
    },
    expansionPanelDetails: {
        padding: "0 16px!important"
    },
    formControl: {
        width: "100%"
    },
    radio: {
        padding: 0
    },
    dot: {
        fontSize: "26px",
        position: "relative",
        top: "6px"
    }
}
