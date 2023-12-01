import STYLE_CONST from '../../../constants/style';
export default{
  apiLoader:{
    position: 'fixed',
    backgroundColor: 'transparent',
    height: '100vh',
    width: '100vw',
    zIndex: 999,
    overflow: 'hidden',
    '& .apiCenterLoader':{
      position: 'absolute',
      top: 0,
      bottom:0,
      left:0,
      right:0,
      margin: 'auto',
      border: '2px solid ' + STYLE_CONST.blue.cobalt,
      borderLeft: '2px solid transparent',
      borderRadius: '50%',
      width: 32,
      height: 32,
      animation: 'spinn 1s linear infinite'
    }
  },
  '@keyframes spinn':{
    '0%':{
      transform: 'rotate(0deg)'
    },
    '100%':{
      transform: 'rotate(360deg)'
    }
  }
}
