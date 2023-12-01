import STYLE_CONST from '../../../../constants/style';
const { white } = STYLE_CONST;
export default {
    Widget5Wrapper: {
        backgroundColor: white.whiteSmoke,
    },
    Widget5: {
        height: 288,
        width: 'auto',
        borderRadius: 4,
        padding: "10px 0 8px 14px",
        "& img": {
            width: 'auto',
            height: 288,
            borderRadius: 4
        }
    }
}
