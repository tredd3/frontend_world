import STYLE_CONST from '../../../constants/style';
const { white } = STYLE_CONST;
export default {
    paymentMode: {
        backgroundColor: "white",
        padding: "10px 10px 15px 10px",
        marginBottom: "10px"
    },
    paymentModeDiv1: {
        display: "flex",
        backgroundColor: "lightgrey",
        paddingLeft: "10px",
        paddingTop: "10px",
        paddingBottom: "10px",
        marginTop: "10px",
        alignItems: "center"
    },
    dlv: {
        backgroundColor: "white",
        padding: "10px",
        marginBottom: "10px"
    },
    dlvIconTextWrapper: {
        display: "flex"
    },
    addressName: {
        alignSelf: "flex-end",
        paddingLeft: "2px"
    },
    addressText: {
        paddingLeft: "26px"
    },
    orderSummaryDiv: {
        padding: "10px",
        backgroundColor: "white",
        marginBottom: "10px"
    },
    orderSummaryCommon: {
        display: "flex",
        justifyContent: "space-between"
    },
    orderDivider: {
        marginTop: "10px", marginBottom: "10px"
    },
    orderYouPaid: {
        display: "flex",
        justifyContent: "space-between"
    }
}
