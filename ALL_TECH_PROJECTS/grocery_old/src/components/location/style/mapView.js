import STYLE_CONST from '../../../constants/style';
export default{
  mapView:{
    '& .mapViewCard':{
      position: 'fixed',
      bottom: 0,
      width: '100vw',
      height: 212,
      boxSizing: 'border-box',
      '& .address':{
        display: 'flex',
        margin: [STYLE_CONST.xxl, 0],
        borderBottom: '1px solid #DFDFDF',
        paddingBottom: STYLE_CONST.sm,
        justifyContent: 'space-between',
        '& .addInfo':{
          overflow: 'hidden',
          whiteSpace: 'nowrap',
          textOverflow: 'ellipsis',
          width: '90%'
        },
        '& .iconDiv':{
          color: '#0066C0'
        },
        '& span':{
          '& svg':{
            fontSize: 16
          },
          margin: ['auto', 0]
        }
      }
    },
  }
}
