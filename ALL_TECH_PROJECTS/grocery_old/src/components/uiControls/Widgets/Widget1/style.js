import STYLE_CONST from '../../../../constants/style';
export default {
    Widget1: {
        // minWidth: '65px',
        width: 72,
        margin: [STYLE_CONST.sm, STYLE_CONST.xs],
        // padding: "8px",
        textAlign: "center",
        '& .imgContainer': {
            width: 46,
            height: 46,
            //backgroundColor: '#eee',
            borderRadius: '50%',
            margin: [0, 'auto', STYLE_CONST.xs, 'auto'],
            '& img': {
                height: 46,
                width: 46,
                borderRadius: '50%'
            }
        },
        "& .productName": {
            width: 72,
            fontSize: STYLE_CONST.fontSize.fs11,
            fontWeight: STYLE_CONST.fontWeight.semiBold,
            fontFamily: "inherit",
            color: STYLE_CONST.black.black,
            position: 'relative',
            maxHeight: 'calc(1.46429em * 2)',
            overflow: 'hidden'
        }
    }
}
