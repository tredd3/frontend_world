import STYLE_CONST from '../../constants/style';

export default {
  root: {
    backgroundColor: '#fff',
    '& .noAdd': {
      margin: 'auto',
      display: 'flex',
      flexDirection: 'column',
      width: '68vw',
      height: '78vh',
      alignItems: 'center',
      justifyContent: 'center',
      '& svg': {
        margin: `0px auto ${STYLE_CONST.lg} auto`
      },
      '& p': {
        margin: `${STYLE_CONST.sm} 0`,
        textAlign: 'center'
      },
      '& .noAddressText': {

      },
      '& .noAddressSubText': {
        color: STYLE_CONST.black.nobel
      }
    }

  },
  formControl: {
    margin: '0',
    width: '100%',
    '& label:last-child': {
      borderBottom: 'none;'
    }
  },
  group: {
    margin: '0 15px'
  },
  radioSpace: {
    justifyContent: 'space-between',
    borderBottom: '1px solid hsla(0, 0%, 85%, 1)',
    margin: '0'
  },
  radioColor: {
    color: 'hsla(208, 100%, 37%, 1) !important',
    '&$checked': {
      color: 'hsla(208, 100%, 37%, 1)'
    },
    marginRight: '-14px'
  },
  radioPad: {
    padding: '0 10px'
  },
  dialogPaper: {
    borderRadius: 15,
    margin: 20
  }

};
