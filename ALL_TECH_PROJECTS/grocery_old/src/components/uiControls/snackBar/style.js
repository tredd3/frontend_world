import STYLE_CONST from '../../../constants/style';

export default{
  snackBar:{
    '& .heightHack':{
      
    },
    '& .success':{
      '& div':{
        backgroundColor: STYLE_CONST.green.green
      }
    },
    '& .error':{
      '& div':{
        backgroundColor: STYLE_CONST.red.alizarin
      }
    },
    '& .information':{
      '& div':{
        backgroundColor: STYLE_CONST.blue.navyBlue
      }
    }
  }
}
