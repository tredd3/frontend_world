
export default {
  heading: {
    margintop: '10px',
    paddingLeft: '16px',
    fontSize: '12px',
    padding: '10px 0 10px'
  },
  summary: {
    display: 'flex'

  },
  primaryHeading: {
    marginTop: '12px',
    marginLeft: '10px',
    color: '#333333'
  },
  expandIcon: {
    fontSize: '14px',
    paddingRight: '2px!important'
  },
  categoryItems: {
    display: 'flex',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    width: '100%',
    marginLeft: 16,
    marginRight: 16
  },
  categoryItem: {
    width: '49%',
    display: 'flex',
    alignItems: 'center',
    boxSizing: 'border-box',
    border: '1px solid #00000029',
    marginBottom: '6px',
    padding: '8px',
    cursor: 'pointer',
    '& .title': {
      marginLeft: '15px',
      fontSize: '12px'
    },
    '& img': {
      minWidth: '100%',
      height: '56px',
      position: 'relative'
    }
  },
  mainCatImgWrapper: {
    width: '40px',
    height: '40px'
  },
  mainCatPlaceHolderWrapper: {
    width: 40,
    height: 40
  },
  subCatImgWrapper: {
    width: 63,
    height: 56
  },
  subCatPlaceHolderWrapper: {
    width: 63,
    height: '56px !important'
  }

};
