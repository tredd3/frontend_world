import STYLE_CONST from '../../../constants/style';

export default {
    root: {
        position: "relative",
        width: 30
    },
    cartImage: {
        position: "absolute",
        top: "50%",
        left: "50%",
        marginRight: "-50%",
        transform: "translate(-50%, -50%)"
    },
    cartItems: {
        // color: 'hsla(32, 75%, 75%, 1)',
        fontSize: STYLE_CONST.fontSize.fs12,
        fontFamily: "inherit",
        position: "absolute",
        top: "50%",
        left: "50%",
        marginRight: "-50%",
        transform: "translate(-42%, -110%)",
    }
}