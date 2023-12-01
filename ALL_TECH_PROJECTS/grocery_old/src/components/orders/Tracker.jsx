import * as React from 'react'
import Icon1 from '@material-ui/icons/CheckCircle'
import Icon2 from '@material-ui/icons/RadioButtonChecked'
import Icon3 from '@material-ui/icons/RadioButtonUnchecked'
import Typography from '@material-ui/core/Typography'
import style from './style'
import injectSheet from 'react-jss'
import Line from './Line'
import Line2 from './Line2'
import Cancel from '@material-ui/icons/Cancel'

import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import { formatDate, formatTime } from '../../helper/utilites'

import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

@injectSheet(style)
class Tracker extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showTracker: false,
      extend: false
    }
  }

  handleStatus = (status, statusArray) => {
    if (status === 'Canceled') {
      return this.handleCanceledCase(status, statusArray)
    } else {
      return this.handleAllCase(status, statusArray)
    }
  }
  // When handling canceled situation
  handleCanceledCase = (status, statusArray) => {
    let result = []
  }

  // When handling All situations
  handleAllCase = (status, statusArray) => {
    const { classes } = this.props
    let allStatus = this.getAllStatus()
    let length = Object.keys(allStatus).length
    let flag = 0 // flag 0 means that the nodes are visisted, 1 means in future they visit
    let result = []
    let count = 1 // Count ,just to handle the siutaion when i don't need divider
    let left = []
    let middle = []
    let right = []
    for (var items in allStatus) {
      if (items === status) {
        // Now Situations
        left.push(<Typography className={classes.leftTextFlag}>NOW</Typography>)

        middle.push(
          <span className={classes.middleIconFlag}>
            <Icon2 />
          </span>
        )

        if (count < length) {
          middle.push(
            <span className={classes.middleLineFlag}>
              <Line color="grey" />
            </span>
          )
        }
        right.push(
          <Typography className={classes.rightTextFlag}>
            {allStatus[items]}
          </Typography>
        )
        flag = 1
      } else {
        if (flag === 0) {
          left.push(
            <Typography className={classes.leftTextFlag0}>PAST</Typography>
          )

          middle.push(
            <span className={classes.middleIconFlag0}>
              <Icon1 />
            </span>
          )
          if (count < length) {
            middle.push(
              <span className={classes.middleLineFlag0}>
                <Line color="green" />
              </span>
            )
          }
          right.push(
            <Typography className={classes.rightTextFlag0}>
              {allStatus[items]}
            </Typography>
          )
        } else {
          left.push(
            <Typography className={classes.leftTextFlag1}>LATER</Typography>
          )

          middle.push(
            <span className={classes.middleIconFlag1}>
              <Icon3 />
            </span>
          )
          if (count < length) {
            middle.push(
              <span className={classes.middleLineFlag1}>
                <Line color="grey" />
              </span>
            )
          }
          right.push(
            <Typography className={classes.rightTextFlag1}>
              {allStatus[items]}
            </Typography>
          )
        }
      }
      count = count + 1
    }
    result.push(
      <div className={classes.tracker}>
        <div className={classes.trackerLeft}>{left}</div>
        <div className={classes.trackerMiddle}>{middle}</div>
        <div className={classes.trackerRight}>{right}</div>
      </div>
    )
    return result
  }

  getAllStatus = () => {
    let allStatus = {}

    allStatus.Confirmed = 'Confirmed'

    allStatus.AwaitingConfirmation = 'Awaiting Confirmation'

    allStatus.PurchasedByKirana = 'Purchased by Kirana'

    allStatus.ReachedKirana = 'Reached Kirana'

    allStatus.BilledByKirana = 'Billed by Kirana'

    allStatus.OutForDelivery = 'Out for Delivery'

    allStatus.Delivered = 'Delivered'

    return allStatus
  }

  handleExpansionClick = () => {
    if (this.state.extend === false) {
      this.setState({
        extend: true
      })
    }
    if (this.state.showTracker === true) {
      this.setState({
        showTracker: false
      })
    } else {
      this.setState({
        showTracker: true
      })
    }
  }

  getCurrentStatusText = status => {
    switch (status) {
      case 'Confirmed':
        return 'Confirmed'
      case 'AwaitingConfirmation':
        return 'Awaiting Confirmation'
      case 'PurchasedByKirana':
        return 'Purchased by Kirana'
      case 'ReachedKirana':
        return 'Reached Kirana'
      case 'BilledByKirana':
        return 'Billed by Kirana'
      case 'OutForDelivery':
        return 'Out for Delivery'
      case 'Delivered':
        return 'Delivered'
    }
  }
  handle = (status, statusHistory) => {
    const { classes } = this.props
    let size = statusHistory.length
    let flag = 'green'
    let left = []
    let middle = []
    let right = []
    for (let i = size - 1; i >= 0; i--) {
      if (statusHistory[i].status === status) {
        let timeStamp = statusHistory[i].timestamp.split(' ')
        let date = timeStamp[0]
        let time = timeStamp[1]

        date = formatDate(new Date(date))
        time = formatTime(time)

        if (status === 'Cancelled') {
          flag = 'grey'
          left.push(
            <Typography className={classes.leftTextFlagCld}>DONE</Typography>
          )
          middle.push(
            <span className={classes.middleIconFlagCld}>
              <Cancel />
            </span>
          )
          // middle.push(
          //   <span className={classes.middleLineFlag0}>
          //     <Line color="grey" />
          //   </span>
          // )
          right.push(
            <div style={{ position: 'relative' }}>
              <Typography className={classes.rightTextFlag0Cld}>
                {statusHistory[i].status}
              </Typography>
              <Typography style={{ fontSize: '10px', position: 'absolute' }}>
                <span>On {date}, {time}</span>
              </Typography>
            </div>
          )
          break;
        } else {
          flag = 'grey'
          left.push(
            <Typography className={classes.leftTextFlag}>DONE</Typography>
          )
          middle.push(
            <span className={classes.middleIconFlag}>
              <Icon1 />
            </span>
          )
          if (i !== 0) {
            middle.push(
              <span className={classes.middleLineFlag0}>
                <Line2 />
              </span>
            )
          }
          right.push(
            <div style={{ position: 'relative' }}>
              <Typography className={classes.rightTextFlag0}>
                {statusHistory[i].status}
              </Typography>
              <Typography style={{ fontSize: '10px', position: 'absolute' }}>
                On {date}, {time}
              </Typography>
            </div>
          )
        }
      } else {
        if (flag === 'green') {
          let timeStamp = statusHistory[i].timestamp.split(' ')
          let date = timeStamp[0]
          let time = timeStamp[1]

          date = formatDate(new Date(date))
          time = formatTime(time)
          left.push(
            <Typography className={classes.leftTextFlag}>DONE</Typography>
          )
          middle.push(
            <span className={classes.middleIconFlag}>
              <Icon1 />
            </span>
          )
          if (i !== 0) {
            middle.push(
              <span className={classes.middleLineFlag0}>
                <Line color="green" />
              </span>
            )
          }
          right.push(
            <div style={{ position: 'relative' }}>
              <Typography className={classes.rightTextFlag0}>
                {statusHistory[i].status}
              </Typography>
              <Typography style={{ fontSize: '10px', position: 'absolute' }}>
                On {date}, {time}
              </Typography>
            </div>
          )
        }
        if (flag === 'grey') {
          left.push(
            <Typography className={classes.leftTextFlag1}>LATER</Typography>
          )
          middle.push(
            <span className={classes.middleIconFlag1}>
              <Icon1 />
            </span>
          )
          if (i !== 0) {
            middle.push(
              <span className={classes.middleLineFlag0}>
                <Line color="grey" />
              </span>
            )
          }
          right.push(
            <Typography className={classes.rightTextFlag1}>
              {statusHistory[i].status}
            </Typography>
          )
        }
      }
    }
    let result = []
    result.push(
      <div className={classes.tracker}>
        <div className={classes.trackerLeft}>{left}</div>
        <div className={classes.trackerMiddle}>{middle}</div>
        <div className={classes.trackerRight}>{right}</div>
      </div>
    )
    return result
  }
  render() {
    const { status, statusArray, classes, statusHistory } = this.props
    let currentStatusText = this.getCurrentStatusText(status)
    return (
      //   <ExpansionPanel className={classes.expansionPanel}>
      //     {this.state.extend === false ? (
      //       <ExpansionPanelSummary
      //         className={classes.expansionPanelSummary}
      //         onClick={e => this.setState({extend : true})}
      //       >
      //         <div
      //           style={{
      //             width: '100%',
      //             display: 'flex',
      //             justifyContent: 'space-between',
      //             paddingRight: '0px'
      //           }}
      //         >
      //           <div className={classes.trackerDiv2}>
      //             <div>
      //               <span
      //                 className={
      //                   status === 'Cancelled'
      //                     ? classes.typoNowCld
      //                     : classes.typoNow
      //                 }
      //               >
      //                 DONE
      //               </span>
      //             </div>
      //             <div className={classes.trackerDiv3}>
      //               {/* <Icon3 className={classes.expansionPanelSummaryIcon} /> */}
      //               {status === 'Cancelled' ? (
      //                 <Cancel className={classes.expansionPanelSummaryIconCld} />
      //               ) : (
      //                 <Icon1 className={classes.expansionPanelSummaryIcon} />
      //               )}
      //             </div>
      //             {status === 'Cancelled' ? (
      //               <div>
      //                 <Typography style={{ color: 'red' }}>CANCELLED</Typography>
      //               </div>
      //             ) : (
      //               <div>
      //                 <Typography style={{ color: 'green' }}>{status}</Typography>
      //               </div>
      //             )}
      //           </div>
      //           <ExpandMoreIcon className={classes.expansionPanelSummaryIcon2} />
      //         </div>
      //       </ExpansionPanelSummary>
      //     ) : (
      //       <ExpansionPanelDetails
      //         onClick={e => {
      //           if (this.state.extend === true) {
      //             this.setState({ extend: false })
      //           }
      //         }}
      //       >
      //         {/* {this.handleStatus(status, statusArray)} */}
      //         {this.handle(status, statusHistory)}
      //       </ExpansionPanelDetails>
      //     )}
      //   </ExpansionPanel>
      //
      <div
        style={{
          backgroundColor: 'white',
          paddingLeft: '15px',
          paddingTop: '20px',
          paddingBottom: '20px',
          padding : "15px"
        }}
      >
        {this.state.extend === false ? (
          <div
            style={{
              width: '100%',
              display: 'flex',
              justifyContent: 'space-between',
              paddingRight: '0px'
            }}
            onClick={e => {
              if (this.state.extend === false) {
                this.setState({
                  extend: true
                })
              }
            }}
          >
            <div className={classes.trackerDiv2}>
              <div>
                <span
                  className={
                    status === 'Cancelled'
                      ? classes.typoNowCld
                      : classes.typoNow
                  }
                >
                  DONE
                </span>
              </div>
              <div className={classes.trackerDiv3}>
                {/* <Icon3 className={classes.expansionPanelSummaryIcon} /> */}
                {status === 'Cancelled' ? (
                  <Cancel className={classes.expansionPanelSummaryIconCld} />
                ) : (
                    <Icon1 className={classes.expansionPanelSummaryIcon} />
                  )}
              </div>
              {status === 'Cancelled' ? (
                <div>
                  <Typography style={{ color: 'red' }}>CANCELLED</Typography>
                </div>
              ) : (
                  <div>
                    <Typography style={{ color: 'green' }}>{status}</Typography>
                  </div>
                )}
            </div>
            <ExpandMoreIcon className={classes.expansionPanelSummaryIcon2} />
          </div>
        ) : (
            <div
              onClick={e => {
                if (this.state.extend === true) {
                  this.setState({
                    extend: false
                  })
                }
              }}
            >
              {this.handle(status, statusHistory)}
            </div>
          )}
      </div>
    )
  }
}

export default Tracker
