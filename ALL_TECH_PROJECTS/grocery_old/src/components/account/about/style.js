import STYLE_CONST from '../../../constants/style';

export default{
    root: {
        margin: [15],
        
        "& .about-head": {
            margin: [70,0,20,0],
            display: "flex",
            "& .title": {
                fontWeight: STYLE_CONST.fontWeight.semiBold,
                color: "#333333",
                fontSize: STYLE_CONST.fontSize.fs13,
            },
            "& .edit-action": {
                fontSize: STYLE_CONST.fontSize.fs14,
                color: "#0066C0",
                marginLeft: "auto"
            },
        },
        "& .about-case": {
            margin: [15,0]
        },
        "& .labels": {
            fontSize: STYLE_CONST.fontSize.fs12,
            color: "#999999"
        },
        "& .values": {
            fontSize: STYLE_CONST.fontSize.fs14,
            color: "#616267",
            height: '20px'
        },


    },
    input: {
        margin: [10,10]
    },
    group: {
        margin: [10,0]
    },
    formControl: {
        margin: [10]
    },
    labelColor: {
        color: "#616267",
    },
    flex: {
        display: "flex",
        flexDirection: 'row'
    },
    radioRoot: {
        padding: "3px 12px",
        color: "#999999",
        '&$checked': {
            color: "#0066C0",
        },
      },
    radioChecked: {
        color: "#0066C0 !important",
        '&$checked': {
            color: "#0066C0 !important",
        },
    },
    button: {
        textTransform: "capitalize",
        margin:0,
        width:"100%",
        color: "#616267",
        border: "1px solid #999999",
        backgroundColor: 'transparent',
        "& .btn-content":{
            display:"inline-block",
            marginRight: 'auto'
        }
    },
    fs14: {
        fontSize: STYLE_CONST.fontSize.fs14,
        color: "#616267",
    }
}
