export default {
  jioSwitchRoot: {
    width: '42px',
    height: '18px'
  },
  jioSwitchBase: {
    color: 'hsla(0, 0%, 76%, 1)',
    height: '28px',
    transform: 'translate(-12px, -3px)',
    "&$jioChecked": {
      color: 'hsla(210, 100%, 30%, 1)',
      "& + $jioBar": {
        backgroundColor: 'hsla(0, 0%, 92%, 1)',
        border: 'solid 1px',
        borderColor: 'hsla(0, 0%, 86%, 1)',
      }
    },
    transition: 'transform 150ms cubic-bezier(0.4, 0, 0.6, 1) 0ms'
  },
  jioChecked: {
    transform: 'translate(0px, -3px)',
    "& + $jioBar": {
      opacity: 1,
      border: "none"
    }
  },
  jioBar: {
    borderRadius: 13,
    width: 27,
    height: 16,
    // marginTop: -13,
    // marginLeft: -21,
    border: "solid 1px",
    borderColor: 'hsla(0, 0%, 86%, 1)',
    backgroundColor: 'hsla(0, 0%, 92%, 1)',
    opacity: 1,
    transition: 'background-color 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms'
  },
  jioIcon: {
    width: 13,
    height: 13,
  }
};
