
import STYLE_CONST from '../../../constants/style';

export default {
  whiteBackground: {
    backgroundColor: STYLE_CONST.white.white,
    width: '100%',
    minHeight: '100vh'
  },
  greyBackground: {
    backgroundColor: STYLE_CONST.white.whiteSmoke,
    width: '100%',
    minHeight: '100vh'
  },
  disableMinHeight: {
    minHeight: 'auto'
  },
  contentWrapper: {
    padding: '0 16px',
    paddingTop: '14px'
  },
  listItem: {
    padding: '8px 0',
    paddingRight: '100px',
    '& span': {
      fontSize: '13px',
      fontFamily: 'inherit'
    }
  },
  pr5: {
    paddingRight: '5px'
  },
  SideDrawer: {
    padding: '4px 0'
  },
  padFooter: {
    paddingBottom: 70
  },
  bottom57: {
    marginBottom: 55
  },
  headerColor: {
    backgroundColor: '#004D9C'
  }
};
