import STYLE_CONST from '../../constants/style';

const {
  blue,
  red,
  green,
  black,
  white,
  fontWeight
} = STYLE_CONST;
export default {
  totalResults: {
    fontWeight: 'bold',
    fontFamily: 'OPEN SANS',
    fontSize: '12.5px',
    color: black.black
  },
  sortFunctionalityDiv: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '10px 16px'
  },
  sortFilterDiv: {
    display: 'flex',
    color: blue.navyBlue,
    alignItems: 'center',
    fontSize: '13px',
    '& span': {
      marginLeft: '5px'
    }
  },
  sortFilterImage: {
    marginRight: '5px'
  },
  sortFilterText: {
    marginRight: '15px',
    color: blue.navyBlue,
    fontSize: '12px',
    fontFamily: 'OPEN SANS '
  },
  productPic: {
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    backgroundSize: 'contain',
    minWidth: '23%',
    marginRight: '7%'
  },
  priceWrapper: {
    width: '65%',
    paddingTop: 4
  },
  buttonsWrapper: {
    display: 'flex',
    flexDirection: 'column',
    width: 75,
    marginTop: 5,
    paddingRight: 5
  },
  productName: {
    fontSize: '16px',
    fontFamily: 'OPEN SANS',
    fontWeight: 600,
    color: black.black
  },
  productNamePLP: {
    fontSize: '14px',
    fontFamily: 'OPEN SANS',
    color: black.black
  },
  detailsWrapper: {
    width: '100%',
    overflow: 'hidden'
  },
  detailsSection: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  productInfo: {
    display: 'flex',
    margin: '8px 0'
  },
  productDiscriptionSection: {
    margin: '15px'
  },
  brandTitle: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  CategoryName: {
    color: blue.sky,
    fontSize: '14px',
    fontFamily: 'OPEN SANS',
    fontWeight: 600
  },
  productDescriptionImage: {
    textAlign: 'center',
    paddingTop: '35px',
    height: '185px',
    width: '54%',
    margin: '0 auto',
    marginBottom: '44px',
    position: 'relative'
  },
  productMRP: {
    marginBottom: '5px',
    fontSize: '16px',
    color: black.lightGray,
    '& span': {
      color: black.lightGray
    }
  },
  productPrice: {
    marginBottom: '5px',
    color: black.lightGray,
    fontSize: '16px',
    fontFamily: 'OPEN SANS',
    '& span': {
      color: red.speechRed,
      fontWeight: fontWeight.semiBold,
      fontSize: '20px'
    }
  },
  productSave: {
    marginBottom: '5px',
    color: black.lightGray,
    fontSize: '15px',
    fontFamily: 'OPEN SANS',
    '& span': {
      color: green.green,
      fontWeight: fontWeight.semiBold
    }
  },
  bestBefore: {
    fontSize: '16px'
  },
  coupon: {
    paddingTop: '3px',
    paddingBottom: '3px'
  },
  quantityButton: {
    marginBottom: '5px'
  },
  addToCartButton: {
    width: '40%'
  },
  buyNowButton: {
    width: '40%'
  },
  divider: {
    background: '#F5F5F5',
    padding: '2px'
  },
  divider2: {
    background: '#F5F5F5',
    padding: '1px',
    marginTop: '5px',
    marginBottom: '5px'
  },
  aboutThisItem: {
    margin: '15px',
    fontFamily: 'OPEN SANS',
    fontSize: '14px',
    color: black.black
  },
  additionalInformation: {
    margin: '15px',
    fontFamily: 'OPEN SANS',
    fontSize: '14px',
    color: black.black
  },
  similarItem: {
    margin: '15px'
  },
  addAndBuyNow: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '10px',
    '& span': {
      width: '45%'
    }
  },
  Checkbox: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row-reverse',
    margin: 0,
    '& span': {
      paddingRight: 0
    }

  },
  RadioButton: {
    margin: 0,
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
    alignItems: 'center',
    borderBottom: `1px solid ${black.silver}`,
    '& span': {
      paddingRight: 0
    }
  },
  ExpansionPanelSummary: {
    padding: '12px 15px',
    minHeight: '0!important',
    '& div': {
      margin: '0!important'
    },
    '& div:nth-child(2)': {
      padding: 0,
      marginRight: '3px!important'
    }
  },
  expansionPanelDetails: {
    padding: '0 15px',
    flexDirection: 'column'
  },
  formControl: {
    width: '100%'
  },
  shareIcon: {
    color: '#8c8a8a'
  },
  deliveryInfIcon: {
    display: 'flex',
    justifyContent: 'center',
    height: '50px',
    width: '50px',
    background: white.whiteSmoke,
    borderRadius: '50%'
  },
  deliveryInfIcon2: {
    display: 'flex',
    justifyContent: 'center'
  },
  deliveryInf: {
    display: 'flex',
    justifyContent: 'space-around',
    marginTop: '10px',
    marginBottom: '10px'
  },
  deliveryInfText: {
    display: 'flex',
    justifyContent: 'center',
    fontSize: '12px',
    color: black.black,
    fontFamily: 'OPEN SANS',
    fontWeight: '530'
  },
  SubcategoryWidget: {
    minWidth: 80,
    maxWidth: 80,
    height: 100,
    boxSizing: 'border-box',
    // minWidth: '30px',
    padding: '5px',
    // paddingBottom: 0,
    marginRight: '8px',
    textAlign: 'center',
    '& div': {
      height: '70% !important'
    },
    '& img': {
      height: 50
    },
    '& .categoryName': {
      fontSize: 10,
      textAlign: 'center',
      textOverflow: 'ellipsis',
      height: 25,
      width: 71,
      overflow: 'hidden',
      position: 'relative',
      lineHeight: '1.2em',
      maxHeight: '6em'
    },
    '& .categoryName:before': {
      content: '...',
      position: 'absolute',
      right: 0,
      bottom: 0
    },
    '& .categoryName:after': {
      content: '',
      position: 'absolute',
      right: 0,
      width: '1em',
      height: '1em'
      // margin-top: 0.2em;
    }
  },
  filterHeader: {
    backgroundColor: white.whiteSmoke,
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '13px',
    fontFamily: 'inherit',
    fontWeight: 600,
    padding: '15px',
    width: 'auto',
    '& .title': {
      color: black.black
    },
    '& .clear': {
      color: blue.sky
    }
  },
  filterOptions: {
    maxHeight: '300px',
    maxWidth: '220px',
    overflow: 'scroll'
  },
  filters: {
    display: 'flex',
    flexDirection: 'column',
    fontSize: '12px',
    '& .filtersName': {
      color: blue.sky,
      width: '150px',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis'
    }
  },
  placeHolderWrapper: {
    height: 50,
    marginBottom: 5
  }
};
