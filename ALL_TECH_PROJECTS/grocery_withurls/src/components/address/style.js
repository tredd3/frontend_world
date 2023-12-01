import STYLE_CONST from '../../constants/style';

export default {
  flex: {
    display: 'flex'
  },
  pad5: {
    padding: 5
  },
  head: {
    margin: '10px 0px 15px'
  },
  padLeftZero: {
    paddingLeft: 0
  },
  title: {
    fontWeight: STYLE_CONST.fontWeight.semiBold
  },
  formControlLabelRoot: {
    marginLeft: 0,
    marginRight: 10
  },
  rightAlign: {
    marginLeft: 'auto'
  },
  radioOff: {
    '& .radio-label': {
      color: '#bab8b8',
      marginLeft: 5,
      fontSize: 14
    }
  },
  rootTextField: {
    color: '#bab8b8'
  },
  radioOn: {
    '& .radio-label': {
      color: '#333',
      marginLeft: STYLE_CONST.xs,
      fontSize: STYLE_CONST.fontSize.fs14
    }
  },
  smallMarg: {
    marginTop: `${STYLE_CONST.md}px !important`
  },
  smallPadTop: {
    paddingTop: `${STYLE_CONST.xs}px !important`
  },
  addrLabel: {
    fontSize: 14
  },
  noMargRight: {
    marginRight: 0
  },
  radioPadBottom: {
    paddingBottom: STYLE_CONST.xs,
    paddingTop: STYLE_CONST.xs
  },
  width100: {
    width: '100%'
  },
  addAddress: {
    '& .fullWidth': {
      width: '100%'
    },
    '& .head': {
      marginBottom: STYLE_CONST.lg
    },
    '& .addresFrmInput': {
      marginBottom: STYLE_CONST.sm,
      '& input, label': {
        color: STYLE_CONST.black.silver,
        fontSize: STYLE_CONST.fontSize.fs14,
        fontWeight: STYLE_CONST.fontWeight.regular
      },
      '& input': {
        color: STYLE_CONST.black.dimGray
      },
      '& label[data-shrink="true"]': {
        fontSize: STYLE_CONST.fontSize.fs12
      },
      '& div:after': {
        borderBottom: `2px solid ${STYLE_CONST.black.silver}`
      }
    }
  },

  addressList: {
    '& .addressListCard': {
      padding: 15,
      backgroundColor: STYLE_CONST.white.whiteSmoke
    },
    '& .addressBox': {
      marginBottom: STYLE_CONST.sm,
      padding: 10,
      paddingBottom: 0,
      position: 'relative',
      '& p': {
        margin: '3px 0px'
      },
      '& .unselected': {
        marginLeft: 33,
        '& span': {
          color: STYLE_CONST.black.nobel,
          fontSize: STYLE_CONST.fontSize.fs14
        }
      },
      '& .selected': {
        marginLeft: 33,
        '& span': {
          fontSize: STYLE_CONST.fontSize.fs14
        }
      },
      '& .buttons': {
        marginLeft: 33,
        marginTop: STYLE_CONST.xs,
        display: 'flex',
        justifyContent: 'space-between',
        '& div': {
          width: 118,
          '& button': {
            height: 28,
            padding: 0,
            fontSize: STYLE_CONST.fontSize.fs12,
            fontWeight: STYLE_CONST.fontWeight.regular
          }
        }
      }
    },
    '& .head': {
      marginBottom: STYLE_CONST.sm,
      display: 'flex',
      justifyContent: 'space-between',
      '& span:last-child': {
        color: STYLE_CONST.blue.navyBlue
      }
    },
    '& .noAdd': {
      marginTop: STYLE_CONST.xxl,
      display: 'flex',
      '& svg': {
        margin: `0px auto ${STYLE_CONST.lg}`
      },
      '& p': {
        margin: `${STYLE_CONST.sm} 0px`,
        textAlign: 'center'
      },
      '& .noAddressText': {

      },
      '& .noAddressSubText': {
        color: STYLE_CONST.black.nobel
      }
    }
  },
  form: {
    confirmationDrawer: {
      padding: '15px'
    }
  }

};
