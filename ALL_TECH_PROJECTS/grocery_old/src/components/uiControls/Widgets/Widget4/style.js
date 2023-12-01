import STYLE_CONST from '../../../../constants/style';
const { white } = STYLE_CONST;
export default {
    Widget4Wrapper: {
        backgroundColor: white.whiteSmoke,
    },
    Widget4: {
        minWidth: '80%',
        padding: "8px 0 6px 14px",
        "& img": {
            width: '100%',
            maxHeight: 145
        }
    }
}
