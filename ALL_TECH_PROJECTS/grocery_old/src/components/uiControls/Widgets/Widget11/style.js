import STYLE_CONST from '../../../../constants/style';
const { black, blue, fontWeight, white } = STYLE_CONST;
export default {
    Widget11Header: {
        display: 'flex',
        justifyContent: "space-between",
        alignItems: "center",
        fontSize: STYLE_CONST.fontSize.fs13
    },
    Widget11Wrapper: {
        padding: STYLE_CONST.sm,
        paddingBottom: STYLE_CONST.sm,
        borderBottom: `5px solid ${white.whiteSmoke}`,
        "& .leftTextLabel": {
            color: black.black
        },
        "& .rightTextLabel": {
            color: blue.navyBlue
        },
        '& .imageContainer':{
          height: 105,
          width: 105,
          margin: [0,'auto', 10, 'auto'],
          '& img':{
            height: 105,
            width: 'auto'
          }
        }
    },
    productGrid: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        marginTop: '15px',
        border: '1px solid hsla(0, 0%, 0%, 0.16)',
        gridGap: '1px 1px',
        backgroundColor: 'hsla(0, 0%, 0%, 0.16)'
    },
    productCell: {
        textAlign: 'center',
        backgroundColor: '#fff',
        padding: [STYLE_CONST.md],
        display: "flex",
        flexDirection: "column"
    },
    productImage: {
        width: '100%'
    },
    productTitle: {
        fontSize: STYLE_CONST.fontSize.fs13
    },
    seeMoreLink: {
        minWidth: '70px',
        textAlign: 'right',
        color: blue.navyBlue,
        fontSize: '14px'
    },
    productGridTitle: {
        fontWeight: fontWeight.semiBold
    }
}
