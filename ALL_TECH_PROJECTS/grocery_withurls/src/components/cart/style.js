export default {
  root: {
    backgroundColor: '#fff'
  },
  formControl: {
    margin: 0
  },
  group: {
    margin: '0px 15px'
  },
  radioSpace: {
    justifyContent: 'space-between',
    borderBottom: '1px solid hsla(0, 0%, 85%, 1)',
    margin: 0
  },
  radioColor: {
    color: 'hsla(208, 100%, 37%, 1) !important',
    '&$checked': {
      color: 'hsla(208, 100%, 37%, 1)'
    },
    marginRight: '-14px'
  },
  radioPad: {
    padding: '0px 10px'
  },
  popper: {
    zIndex: 1,
    '&[x-placement*="bottom"] $arrow': {
      top: 0,
      left: 0,
      marginTop: '-0.9em',
      minWidth: '3em',
      height: '1em',
      '&::before': {
        borderWidth: '0 1em 1em 1em',
        borderColor: 'transparent transparent hsla(0, 0%, 96%, 1) transparent'
      }
    },
    '&[x-placement*="top"] $arrow': {
      bottom: 0,
      left: 0,
      marginBottom: '-0.9em',
      width: '3em',
      height: '1em',
      '&::before': {
        borderWidth: '1em 1em 0 1em',
        borderColor: 'hsla(0, 0%, 96%, 1) transparent transparent transparent'
      }
    },
    '&[x-placement*="right"] $arrow': {
      left: 0,
      marginLeft: '-0.9em',
      height: '3em',
      width: '1em',
      '&::before': {
        borderWidth: '1em 1em 1em 0',
        borderColor: 'transparent hsla(0, 0%, 96%, 1) transparent transparent'
      }
    },
    '&[x-placement*="left"] $arrow': {
      right: 0,
      marginRight: '-0.9em',
      height: '3em',
      width: '1em',
      '&::before': {
        borderWidth: '1em 0 1em 1em',
        borderColor: 'transparent transparent transparent hsla(0, 0%, 96%, 1)'
      }
    }
  },
  arrow: {
    position: 'absolute',
    fontSize: 7,
    width: '3em',
    height: '3em',
    '&::before': {
      content: '""',
      margin: 'auto',
      display: 'block',
      width: 0,
      height: 0,
      borderStyle: 'solid'
    }
  }
};
