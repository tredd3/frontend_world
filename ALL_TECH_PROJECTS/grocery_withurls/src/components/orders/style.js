import STYLE_CONST from '../../constants/style';
import { getBottomOffset } from '../../helpers/utilities';

const { blue, black, red } = STYLE_CONST;
export default {
  orderSummary: {
    paddingLeft: '15px',
    paddingRight: '15px',
    paddingTop: '10px',
    background: 'white',
    top: '45px',
    zIndex: '2'
  },
  orderSummary1: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  typoOrderId: {
    fontWeight: 600,
    fontSize: 14
  },
  typoPrice: {
    fontWeight: 'bold',
    fontSize: 14
  },
  typoItemsShipments: {
    marginBottom: '8px',
    fontSize: '12px'
  },
  currentShipmentNumber: {
    fontWeight: 'bold',
    fontSize: 14
  },
  currentStatusWithDate: {
    fontSize: 12
  },
  shipmentTotal: {
    fontWeight: '800',
    fontSize: 14
  },
  totalItems: {
    fontSize: 12
  },
  tracker: {
    display: 'flex',
    paddingBottom: '20px'
  },
  trackerLeft: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginRight: '15px',
    marginTop: '2px',
    marginBottom: '6px'
  },
  trackerMiddle: {
    display: 'flex',
    flexDirection: 'column',
    marginRight: '15px'
  },
  trackerRight: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginBottom: '7px'
  },
  trackerCollapsed: {
    display: 'flex'
  },
  trackerDiv2: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginRight: '15px',
    marginTop: '2px',
    marginBottom: '7px'

  },
  trackerDiv3: {
    display: 'flex'
  },
  shipmentNumber: {
    paddingRight: '15px',
    paddingTop: '25px',
    paddingBottom: '10px'
  },
  shipmentSummaryTracker: {
    paddingLeft: '15px',
    paddingRight: '15px',
    background: 'white',
    paddingTop: '20px',
    paddingBottom: '10px'
  },
  shipmentSummary: {

  },
  divider1: {
    marginLeft: '15px',
    marginRight: '15px'
  },
  shipmentDivider: {
    marginTop: '10px',
    marginBottom: '10px'
  },
  shipmentProducts: {
    backgroundColor: 'white',
    paddingLeft: '5px'
  },
  leftTextFlag0: {
    backgroundColor: '#12B23D',
    color: 'white',
    padding: '2px 8px 2px 8px',
    fontSize: '8px',
    marginRight: '25px'
  },
  middleIconFlag0: {
    color: '#12B23D'
  },
  middleLineFlag0: {
    margin: '-7px 0px -2px 11px'
  },
  rightTextFlag0: {
    color: '#12B23D'
  },
  rightTextFlag0Cld: {
    color: 'red'
  },

  leftTextFlag1: {
    backgroundColor: '#DFDFDF',
    color: 'white',
    padding: '2px 8px 3px 8px',
    fontSize: '8px',
    marginRight: '25px'
  },
  middleIconFlag1: {
    color: '#DFDFDF'
  },
  middleLineFlag1: {
    margin: '-7px 0px -2px 10px'
  },
  rightTextFlag1: {
    color: '#DFDFDF'
  },
  typoNow: {
    backgroundColor: '#12B23D',
    color: 'white',
    padding: '2px 8px 3px 8px',
    fontSize: '8px',
    marginRight: '25px'
  },
  typoNowCld: {
    backgroundColor: 'red',
    color: 'white',
    padding: '2px 8px 3px 8px',
    fontSize: '8px',
    marginRight: '25px'
  },
  leftTextFlag: {
    backgroundColor: '#12B23D',
    color: 'white',
    padding: '2px 8px 3px 8px',
    fontSize: '8px',
    marginRight: '25px'
  },
  leftTextFlagCld: {
    backgroundColor: 'red',
    color: 'white',
    padding: '2px 8px 3px 8px',
    fontSize: '8px',
    marginRight: '25px'
  },
  middleIconFlag: {
    color: '#12B23D'
  },
  middleIconFlagCld: {
    color: 'red'
  },
  middleLineFlag: {
    margin: '-7px 0px -2px 10px'
  },
  rightTextFlag: {
    color: 'blue'
  },
  expansionPanel: {
    margin: '0px',
    padding: '0px'
  },
  expansionPanelSummary: {
    margin: '0px',
    padding: '0px',
    marginRight: '15px',
    marginLeft: '15px',
    paddingRight: '0px'
  },
  trackerDiv1: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between'
  },
  expansionPanelSummaryIcon: {
    color: '#12B23D',
    marginRight: '17px'
  },
  expansionPanelSummaryIconCld: {
    color: 'red',
    marginRight: '17px'
  },
  expansionPanelSummaryText: {
    color: 'blue'
  },
  expansionPanelSummaryIcon2: {
    color: 'blue'
  },
  orderRating: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    fontSize: '13px',
    marginBottom: `${getBottomOffset()}px`
  },
  orderRatingheader: {
    backgroundColor: '#FFF',
    borderRadius: '13px 13px 0 0'
  },
  shoppingExperience: {
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'center',
    '& .text': {
      fontWeight: 700
    },
    '& .star': {
      width: '1.8em',
      height: '2em',
      color: red.orange
    }
  },
  skip: {
    color: blue.sky,
    fontSize: '12px',
    padding: '10px 20px',
    display: 'flex',
    justifyContent: 'flex-end'
  },
  orderBlock: {
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'center',
    backgroundColor: '#FFF',
    width: '33%',
    fontSize: '10px',
    padding: '12px 0',
    '& .title': {
      fontSize: '11px',
      fontWeight: 700
    },
    '& .details': {
      padding: '8px 4px 0',
      display: 'flex',
      flexDirection: 'column'
    }
  },
  orderWrapper: {
    backgroundColor: black.gainsboro,
    padding: '5px'
  },
  orderContainer: {
    display: 'flex',
    '& .delivered': {
      borderRadius: '3px 0 0 3px'
    },
    '& .orderdetails': {
      borderRadius: '0 3px 3px 0',
      flex: 1
    }
  },
  line: {
    backgroundColor: '#FFF',
    '& span': {
      display: 'inline-block',
      height: '35px',
      marginTop: '26px',
      borderRight: '1px solid rgba(0,0,0,0.5)'
    }
  },
  bottom57: {
    marginBottom: `${getBottomOffset()}px`
  },
  refundDueDiv: {
    backgroundColor: 'white',
    paddingTop: '10px',
    paddingBottom: '10px',
    marginBottom: '10px',
    marginTop: '2px'
  },
  refundDueDiv2: {
    border: '1px solid #12B23D',
    padding: '5px',
    marginRight: '10px',
    marginLeft: '10px',
    display: 'flex',
    borderRadius: '2px',
    alignItems: 'center'
  },
  checkedCircle: {
    color: '#12B23D', fontSize: '20px'
  },
  refundDueContent: {
    display: 'flex', alignItems: 'center'
  },
  refundDueContentAmount: {
    paddingLeft: '10px',
    paddingRight: '5px',
    fontWeight: '600',
    color: '#666666'
  },
  refundDueContentTxt: {
    fontWeight: '300', color: '#999999', fontSize: '12px'
  },
  refundLabel: {
    backgroundColor: '#fff'
  },
  refundLabelCheckedCircle: {
    color: '#12B23D',
    fontSize: 14,
    marginRight: 6,
    marginTop: 2
  },
  refundLabelContainer: {
    padding: 10
  },
  refundLabelItemContainer: {
    padding: 5,
    border: '1px solid #11b23d',
    borderRadius: 4,
    display: 'flex'
  },
  refundLabelText: {
    fontSize: 12
  }

};
