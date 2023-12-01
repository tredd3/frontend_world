import STYLE_CONST from '../../constants/style';

const {
  white, black, blue, fontWeight, red, green
} = STYLE_CONST;
export default {
  title: {
    display: 'flex',
    justifyContent: 'space-between',
    margin: '0px 16px 20px',
    fontSize: '14px',
    fontFamily: 'inherit',
    paddingTop: '10px'
  },
  order: {
    margin: '10px 7px 0',
    padding: '8px 12px',
    backgroundColor: white.white,
    border: `1px solid ${black.silver}`,
    borderRadius: '5px',
    borderLeft: `4px solid ${black.nobel}`
  },
  shipment: {
    marginTop: '7px',
    padding: '8px 12px',
    fontSize: '13px',
    fontFamily: 'inherit',
    backgroundColor: white.white,
    border: '1px solid #62BDFE',
    borderRadius: '5px',
    borderLeft: '4px solid #62BDFE'
  },
  orderWrapper: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  orderInfo: {
    flexBasis: '95%'
  },
  orderStore: {
    color: black.nobel,
    fontSize: '12px',
    marginBottom: '3px'
  },
  orderHeader: {
    color: black.black,
    fontSize: '14px',
    fontWeight: 600
  },
  orderFooter: {
    color: black.dimGray,
    fontSize: '12px',
    fontWeight: 600,
    '& span': {
      marginRight: '4px'
    }
  },
  orderChevron: {
    position: 'relative',
    top: '15px',
    right: '-8px',
    color: blue.navyBlue
  },
  itemChevron: {
    position: 'relative',
    top: '12px',
    right: '-8px',
    color: black.dimGray
  },
  shipmentHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    color: '#000',
    '& .shipmentNumber': {
      fontSize: '14px',
      fontWeight: 600,
      color: black.black
    },
    '& .totalShipments': {
      color: black.nobel,
      marginLeft: '12px'
    },
    '& .shipmentStatus': {
      color: blue.sky,
      fontSize: '12px',
      position: 'relative',
      fontWeight: 600
    },
    '& .Rejected': {
      color: red.alizarin
    },
    '& .Cancelled': {
      color: red.alizarin
    },
    '& .Delivered': {
      color: green.green
    },
    '& .Refund': {
      color: red.orange
    }
  },
  shipmentId: {
    color: black.nobel,
    fontSize: '12px',
    marginBottom: '3px'
  },
  shipmentView: {
    position: 'relative',
    left: '8px',
    fontSize: '12px',
    fontWeight: 600
  },
  shipmentFooter: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '-10px',
    '& .shipmentDetails': {
      color: black.dimGray,
      fontSize: '12px',
      fontFamily: 'inherit',
      display: 'flex',
      alignItems: 'flex-end',
      fontWeight: 600,
      '& span': {
        marginRight: '4px'
      }
    },
    '& .shipmentView': {
      color: blue.sky,
      marginTop: '8px'
    }
  },
  orderFilterDiv: {
    display: 'flex',
    color: blue.navyBlue,
    alignItems: 'center',
    fontSize: '13px',
    '& span': {
      marginLeft: '5px'
    }
  },
  shipmentChevron: {
    position: 'relative',
    top: '8px',
    right: '-8px'
  },
  filterHeader: {
    backgroundColor: white.whiteSmoke,
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '13px',
    fontFamily: 'inherit',
    padding: '16px',
    fontWeight: 600,
    width: '175px',
    '& .title': {
      color: black.black
    },
    '& .clear': {
      color: blue.sky
    },
    '& .disable': {
      color: black.silver
    }
  },
  filterOptions: {
    maxHeight: '400px',
    overflow: 'scroll'
  },
  filterOption: {
    margin: 0,
    display: 'flex',
    justifyContent: 'space-between',
    padding: '8px 0',
    borderBottom: `1px solid ${black.silver}`
  },
  expansionPanel: {
    margin: 0
  },
  expansionPanelSummary: {
    padding: '0 16px',
    '& div:nth-child(2)': {
      padding: 0,
      marginRight: '3px!important'
    },
    '& [MuiExpansionPanelSummary-content*=]': {
      margin: 0,
      borderBottom: `1px solid ${black.silver}`
    },
    '& .heading': {
      color: black.black,
      fontSize: '15px',
      fontWeight: fontWeight.regular
    },
    '& .subHeading': {
      color: blue.sky,
      fontSize: '13px',
      fontWeight: fontWeight.regular
    }
  },
  expansionPanelDetails: {
    padding: '0 16px!important'
  },
  formControl: {
    width: '100%'
  },
  radio: {
    padding: 0
  },
  dot: {
    fontSize: '26px',
    position: 'relative',
    top: '6px',
    color: '#C4C4C4'
  },

  shipDot: {
    fontSize: '26px',
    position: 'relative',
    top: '11px',
    color: '#C4C4C4'
  },
  icons: {
    position: 'relative',
    '& .icon': {
      position: 'absolute',
      right: '-2px'
    }
  },
  disable: {
    color: black.silver
  },
  items: {
    margin: '0 16px'
  },
  item: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '1px',
    padding: '8px 10px 4px',
    backgroundColor: '#fff'
  },
  itemWrapper: {
    display: 'flex'
  },
  itemInfo: {
    marginLeft: '18px',
    '& .itemName': {
      fontSize: '13px',
      marginTop: '5px'
    },
    '& .itemQuantity': {
      fontSize: '13px'
    }
  },
  noresults: {
    display: 'flex',
    flexDirection: 'column',
    span: {
      fontSize: '10px'
    }
  }
};
