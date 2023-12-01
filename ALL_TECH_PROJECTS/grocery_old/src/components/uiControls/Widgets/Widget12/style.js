import STYLE_CONST from '../../../../constants/style';
const { black, blue, white, fontWeight } = STYLE_CONST;
export default {
    Widget12Header: {
        display: 'flex',
        justifyContent: "space-between",
        alignItems: "center",
        fontSize: STYLE_CONST.fontSize.fs14
    },
    Widget12Wrapper: {
        padding: "12px 16px",
        borderTop: `5px solid ${white.whiteSmoke}`,
        "& .leftTextLabel": {
            color: black.black
        },
        "& .rightTextLabel": {
            color: blue.navyBlue
        }
    },
    productGrid: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr 1fr',
        gridGap: '15px 8px',
        marginTop: '15px',
        '& .imgContainer':{
          borderRadius: 3,
          height: 110,
          // backgroundColor: '#eee',
          '& img':{
            height: 110,
            borderRadius: 3,
          }
        }
    },
    productCell: {
        textAlign: 'center'
    },
    productImage: {
        width: '100%'
    },
    productTitle: {
        fontSize: STYLE_CONST.fontSize.fs13,
        height: 'calc(1.46429em * 2)',
        overflow: 'hidden'
    },
    seeMoreLink: {
        minWidth: '70px',
        fontSize: '14px',
        textAlign: 'right',
        color: blue.navyBlue
    },
    productGridTitle: {
        fontWeight: fontWeight.semiBold
    }
}
