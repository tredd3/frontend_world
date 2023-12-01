export default {
    root: {
        margin: 15,
        '& .formControlLabel': {
            margin: 0,
            border: '1px solid #666666',
            position: "relative",
            padding: "7px 12px",
            backgroundColor: '#fff'
        },
        '& .formControlLabel:last-child':{
          marginTop: 15
        }
    },
    formGroup: {
        width: '100%'
    },
    radioGroupRoot: {

    },
    borderBottom: {
        borderBottom: '1px solid #F2F2F2'
    },
    radioButton: {
        marginRight: 8,
        padding: 0
        //color: '#999999 !important',
        // '&$checked': {
        //     color: 'hsla(208, 100%, 37%, 1)',
        // },
    },
    selectedStore: {
        position: "absolute",
        left: "45px",
        top: "32px",
    }
}
