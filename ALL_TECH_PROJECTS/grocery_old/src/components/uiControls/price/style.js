import STYLE_CONST from '../../../constants/style';
const { red, black } = STYLE_CONST;
export default {
    priceWrapper: {
        fontSize: "10px",
        fontFamily: "inherit",
        display: 'flex',
        marginBottom: "6px",
        justifyContent: "space-between",
        alignItems: "center",
        "& .sp": {
            color: red.speechRed,
            marginRight: "5px",
            fontSize: "14px",
            fontFamily: "inherit",
            fontWeight: 530
        }, "& .mrp": {
            color: black.nobel,
            marginRight: "5px",
            textDecoration: "line-through",
            fontSize: STYLE_CONST.fontSize.fs12,
            fontFamily: "inherit"
        }, "& .discount": {
            color: '#616267',
            marginRight: "5px",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            fontSize: "9px",
            fontFamily: "inherit"
        }
    }
}
