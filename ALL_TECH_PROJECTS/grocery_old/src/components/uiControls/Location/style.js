import STYLE_CONST from '../../../constants/style';
const { white } = STYLE_CONST;
export default {
    userLocation: {
        backgroundColor: STYLE_CONST.blue.darkBlue,
        display: "flex",
        padding: "10px 16px",
        color: white.white
    },
    locationIcon: {
        marginRight: "4px",
        marginLeft: "-4px",
        color: white.white
    },
    userAddress: {
        marginTop: "3px",
        color: "inherit"
    },
    locationDrawer: {
        '& .solidGray': {
            margin: [STYLE_CONST.sm, 0]
        },
        '& .pincodeInput': {
            paddingBottom: STYLE_CONST.sm,
            marginBottom: STYLE_CONST.xxl,
            outline: 'none',
            border: 0,
            borderBottom: '1px solid ' + STYLE_CONST.black.gainsboro,
            width: '100%'
        }
    }
}
