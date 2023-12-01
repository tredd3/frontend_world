import STYLE_CONST from '../../../../constants/style';
const { black, blue } = STYLE_CONST;
export default {
    Widget7Header: {
        display: 'flex',
        justifyContent: "space-between",
        alignItems: "center",
        fontSize: '13px',
        marginBottom: "10px"
    },
    Widget7Wrapper: {
        padding: STYLE_CONST.fontSize.fs14,
        "& .leftTextLabel": {
            color: black.black,
            fontWeight: STYLE_CONST.fontWeight.semiBold,
        },
        "& .rightTextLabel": {
            color: blue.navyBlue
        }
    },
    Widget7: {
        minWidth: '42%',
        maxWidth: '42%',
        //width: 148,
        marginRight: STYLE_CONST.md,
        display: 'flex',
        justifyContent: "space-between",
        flexDirection: "column",
        "& .section1": {
            // marginBottom: "10px",
            "& .imageWrapper": {
                width: 90,
                height: 90,
                margin: [15, 'auto', 10, 'auto'],
                // paddingTop: "12px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
            },
            "& .imageDiv": {
                backgroundColor: '#eee',
                // width: "60%",
                // height: "100%",
                // width: 90,
                height: 90,
                position: "relative",
                "& img": {
                    objectFit: "fill",
                    width: "auto",
                    height: 90
                }
            },
            "& .productName": {
                width: '100%',
                color: black.black,
                fontSize: STYLE_CONST.fontSize.fs13,
                maxHeight: 'calc(1.46429em * 2)',
                overflow: 'hidden'
            }
        },
        "& .section2": {
            "& .prime": {
                color: black.black,
                marginBottom: "6px",
            },
            "& .add": {
                width: '100%',
                padding: "3px",
                color: black.black,
                backgroundColor: "#E8E7EC",
                border: "1px solid #A5A5A5",
                backgroundImage: "linear-gradient(#F9FAFC, #E8E7EC, #F9FAFC)"
            }
        }
    }
}
