
export default {
    heading: {
        margintop: "10px",
        paddingLeft: "16px",
        fontSize: "12px",
        padding: "10px 0 10px"
    },
    summary: {
        display: 'flex',

    },
    primaryHeading: {
        marginTop: "12px",
        marginLeft: "10px"
    },
    expandIcon: {
        fontSize: "14px",
        paddingRight: "2px!important"
    },
    categoryItems: {
        display: 'flex',
        justifyContent: "space-between",
        flexWrap: "wrap",
        width: "100%"
    },
    categoryItem: {
        width: "49%",
        display: "flex",
        boxSizing: "border-box",
        border: "1px solid black",
        marginBottom: "6px",
        padding: "5px",
        cursor: "pointer",
        "& .title": {
            marginTop: "10px",
            marginLeft: "15px",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis"
        },
    }

}