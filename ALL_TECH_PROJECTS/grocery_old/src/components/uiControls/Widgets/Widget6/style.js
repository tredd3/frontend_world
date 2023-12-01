import STYLE_CONST from '../../../../constants/style';
const { black, blue, white, fontWeight } = STYLE_CONST;
export default {
    Widget6Header: {
        display: 'flex',
        justifyContent: "space-between",
        alignItems: "center",
        fontSize: '13px',
        marginBottom: "10px"
    },
    Widget6Wrapper: {
        padding: "16px",
        paddingBottom: "8px",
        borderBottom: `8px solid ${white.whiteSmoke}`,
        "& .leftTextLabel": {
            color: black.black,
            fontWeight: fontWeight.semiBold,
            fontSize: "inherit"
        },
        "& .rightTextLabel": {
            color: blue.navyBlue,
            fontSize: "inherit"
        }
    },
    Widget6: {
        minWidth: '26%',
        textAlign: "center",
        marginRight: "10px",
        "& img": {
            width: '100%',
            maxHeight: "150px"
        }
    }
}