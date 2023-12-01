import STYLE_CONST from '../../../constants/style';
const { white } = STYLE_CONST;

export default {
    OfferIcon: {
        position: "absolute",
        color: white.white,
        top: "-12px",
        left: "-13px",
        "& svg": {
            width: "30px",
            height: "30px"
        }
    },
    OfferWrapper: {
        position: "absolute",
        fontSize: "7px",
        left: "8px",
        top: "5px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
    }
}
