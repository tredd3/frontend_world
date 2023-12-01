import React from 'react';
import ChevronRight from "@material-ui/icons/ChevronRight";
import { connect } from "react-redux";
@connect(
  state => {
    return {
      kirana: state.kirana
    };
  }
)
class SelectedKirana extends React.PureComponent {

  render() {
    // console.log(this.props);
    // if (this.props.kirana && this.props.kirana.selectedKirana && Object.keys(this.props.kirana.selectedKirana).length > 0) {
    //   console.info("kirana is selected so rendering ");
      const { Name, Address, IsClosed } = this.props.kirana.selectedKirana;
      return (<div style={{ display: 'flex', flexDirection: 'row', backgroundColor: "transparent", padding: ' 5px 8px 5px 15px ', borderBottom: '1px solid hsla(0, 0%, 87%, 1)' }} onClick={() => {
        const location = {
          pathname: '/select-kirana'
        }
        this.props.history.push(location.pathname)
      }}>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ fontSize: '12px', fontWeight: '600', textTransform: 'uppercase', color: 'hsla(210, 100%, 30%, 1)' }}>{Name}</div>
          <div style={{ fontSize: '10px', color: 'hsla(0, 0%, 40%, 1)' }}>{Address}</div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'right', marginLeft: "auto", }}>
          <div style={{ color: IsClosed === 0 ? 'red' : 'hsla(126, 91%, 31%, 1)', fontSize: '10px', fontWeight: '400' }}>{IsClosed === 0 ? 'Closed' : 'Open'}</div>
          <div style={{ fontSize: '10px', color: 'hsla(0, 0%, 40%, 1)', marginTop: 'auto' }}>Next Delivery: 2pm-4pm, Today</div>
        </div>
        <div style={{ fontSize: '10px', color: 'hsla(208, 100%, 37%, 1)' }}>
          <ChevronRight />
        </div>
      </div>)
    // }
    // console.info("kirana is NOT selected so rendering");
    // return (
    //   <div style={{ display: 'flex', flexDirection: 'row', backgroundColor: "transparent", padding: ' 5px 8px 5px 15px ', borderBottom: '1px solid hsla(0, 0%, 87%, 1)' }} onClick={() => {
    //     const location = {
    //       pathname: '/select-kirana'
    //     }
    //     this.props.history.push(location)
    //   }}>
    //     <div style={{ display: 'flex', flexDirection: 'column' }}>
    //       <div style={{ fontSize: '12px', fontWeight: '600', textTransform: 'uppercase', color: 'hsla(210, 100%, 30%, 1)' }}>DUMMY NAME</div>
    //       <div style={{ fontSize: '10px', color: 'hsla(0, 0%, 40%, 1)' }}>Click me to Change</div>
    //     </div>
    //     <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'right', marginLeft: "auto", }}>
    //       <div style={{ color: 'hsla(126, 91%, 31%, 1)', fontSize: '10px', fontWeight: '400' }}>Open</div>
    //       <div style={{ fontSize: '10px', color: 'hsla(0, 0%, 40%, 1)', marginTop: 'auto' }}>Next Delivery: 2pm-4pm, Today</div>
    //     </div>
    //     <div style={{ fontSize: '10px', color: 'hsla(208, 100%, 37%, 1)' }} >
    //       <ChevronRight />
    //     </div>
    //   </div>);
  }
}

export default SelectedKirana