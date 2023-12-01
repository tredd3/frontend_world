import STYLE_CONST from '../../../constants/style';
export default {
  ripple: {
    backgroundPosition: 'center',
    transition: 'background 0.8s'
  },
  'ripple:active': {

  },
  button: {
    '& button': {
      outline: 'none',
      border: 0,
      fontSize: STYLE_CONST.fontSize.fs14,
      fontFamily: "inherit",
      fontWeight: STYLE_CONST.fontWeight.bold,
      width: '100%',
      padding: STYLE_CONST.sm,
      borderRadius: 2,
      color: STYLE_CONST.black.black
    }
  },
  solidGray: {
    '& button': {
      border: '1px solid #A5A5A5',
      backgroundImage: 'linear-gradient(to bottom, #f9fafc, #f4f5f8, #f0f1f4, #ececf0, #e8e7ec)'
    }
  },
  solidCobalt: {
    '& button': {
      backgroundColor: STYLE_CONST.yellow.cobalt,
      color: STYLE_CONST.white.white,
      border: '1px solid ' + STYLE_CONST.blue.cobalt
    }
  },
  solidTulip: {
    '& button': {
      backgroundImage: 'linear-gradient(to bottom, #f4d384, #f3cd72, #f1c760, #f0c04d, #eeba38)',
      border: '1px solid ' + STYLE_CONST.black.black,
      borderColor: "#a88734 #9c7e31 #846a29"
    }
  },
  disable: {
    opacity: 0.5,
    pointerEvents: 'none'
  },
  enable: {
    opacity: 1
  }
}
