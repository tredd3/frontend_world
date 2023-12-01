import STYLE_CONST from '../../../constants/style';

export default {
  mapView: {
    paddingTop: 45,
    background: '#efefef',

    '& .mapViewCard': {
      position: 'fixed',
      bottom: 0,
      width: '100vw',
      boxSizing: 'border-box',
      padding: '20px 15px',

      '& .addInfo': {
        overflowX: 'auto',
        overflowY: 'hidden',
        whiteSpace: 'nowrap',
        height: '1.4em',
        marginBottom: '15px',
        width: 'auto',
        color: '#777'
      },
      '& .address': {
        display: 'flex',
        margin: `${STYLE_CONST.sm} 0px`,
        borderBottom: '1px solid #DFDFDF',
        paddingBottom: STYLE_CONST.sm,
        justifyContent: 'space-between',
        '& .iconDiv': {
          color: '#0066C0'
        },
        '& span': {
          '& svg': {
            fontSize: 16
          },
          margin: 'auto 0px'
        }
      },
      '& .pincodeDisplay': {
        display: 'flex',
        alignItems: 'center',
        borderBottom: '1px solid #eee',
        padding: '10px 0',
        cursor: 'pointer',

        '& svg': {
          paddingRight: '10px'
        }
      }
    }
  }
};
