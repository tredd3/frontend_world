import React from 'react';
import NotDoneIcon from '@material-ui/icons/RadioButtonUncheckedOutlined';
import Typography from '@material-ui/core/Typography';
import Cancel from '@material-ui/icons/Cancel';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import { withStyles } from '@material-ui/core';
import { ReactComponent as DoneIcon } from '../../assets/images/svg/status_green_icon.svg';
import style from './style';
import Line from './Line';
import Line2 from './Line2';
import { formatDate, formatTime } from '../../helpers/utilities';

export default withStyles(style)(
  class Tracker extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        showTracker: false,
        extend: false
      };
    }

    handle = (currentStatus, statusHistory) => {
      const { classes } = this.props;
      const size = statusHistory.length;
      let flag = 'green';
      const left = [];
      const middle = [];
      const right = [];
      const status = currentStatus === 'Rejected' ? 'Cancelled' : currentStatus;

      for (let i = size - 1; i >= 0; i -= 1) {
        if (statusHistory[i].status === status) {
          const timeStamp = statusHistory[i].timestamp !== undefined ? statusHistory[i].timestamp : '2019-12-20 10:55:09';
          let date = timeStamp[0];
          let time = (statusHistory[i].timestamp && statusHistory[i].timestamp.split(' ')[1]) || '';

          date = formatDate(timeStamp);
          time = formatTime(time);

          if (status === 'Cancelled') {
            flag = 'grey';
            left.push(
              <Typography className={classes.leftTextFlagCld}>DONE</Typography>
            );
            middle.push(
              <span className={classes.middleIconFlagCld}>
                <Cancel />
              </span>
            );
            right.push(
              <div style={{ position: 'relative' }}>
                <Typography className={classes.rightTextFlag0Cld}>
                  {statusHistory[i].status}
                </Typography>
                {
                  statusHistory[i].timestamp !== undefined
                    ? (
                      <Typography style={{ fontSize: '10px', position: 'absolute', whiteSpace: 'nowrap' }}>
                        <span>
                          On
                          {' '}
                          {date}
,
                          {' '}
                          {time}
                        </span>
                      </Typography>
                    ) : null
                }
              </div>
            );
            break;
          } else {
            flag = 'grey';
            left.push(
              <Typography className={classes.leftTextFlag}>DONE</Typography>
            );
            middle.push(
              <span className={classes.middleIconFlag}>
                <DoneIcon />
              </span>
            );
            if (i !== 0) {
              middle.push(
                <span className={classes.middleLineFlag0}>
                  <Line2 />
                </span>
              );
            }
            right.push(
              <div style={{ position: 'relative' }}>
                <Typography className={classes.rightTextFlag0}>
                  {statusHistory[i].status}
                </Typography>
                {
                  statusHistory[i].timestamp !== undefined ? (
                    <Typography style={{ fontSize: '10px', position: 'absolute', whiteSpace: 'nowrap' }}>
                      On
                      {' '}
                      {date}
,
                      {' '}
                      {time}
                    </Typography>
                  ) : null
                }
              </div>
            );
          }
        } else {
          if (flag === 'green') {
            const timeStamp = statusHistory[i].timestamp !== undefined ? statusHistory[i].timestamp : '2019-12-20 10:55:09';
            let date = timeStamp[0];
            let time = (statusHistory[i].timestamp && statusHistory[i].timestamp.split(' ')[1]) || '';

            date = formatDate(timeStamp);
            time = formatTime(time);
            left.push(
              <Typography className={classes.leftTextFlag}>DONE</Typography>
            );
            middle.push(
              <span className={classes.middleIconFlag}>
                <DoneIcon />
              </span>
            );
            if (i !== 0) {
              middle.push(
                <span className={classes.middleLineFlag0}>
                  <Line color="#12B23D" />
                </span>
              );
            }
            right.push(
              <div style={{ position: 'relative' }}>
                <Typography className={classes.rightTextFlag0}>
                  {statusHistory[i].status}
                </Typography>
                {
                  statusHistory[i].timestamp !== undefined ? (
                    <Typography style={{ fontSize: '10px', position: 'absolute', whiteSpace: 'nowrap' }}>
                      On
                      {' '}
                      {date}
,
                      {' '}
                      {time}
                    </Typography>
                  ) : null
                }
              </div>
            );
          }
          if (flag === 'grey') {
            left.push(
              <Typography className={classes.leftTextFlag1}>LATER</Typography>
            );
            middle.push(
              <span className={classes.middleIconFlag1}>
                <NotDoneIcon />
              </span>
            );
            if (i !== 0) {
              middle.push(
                <span className={classes.middleLineFlag0}>
                  <Line color="#DFDFDF" />
                </span>
              );
            }
            right.push(
              <Typography className={classes.rightTextFlag1}>
                {statusHistory[i].status}
              </Typography>
            );
          }
        }
      }
      const result = [];
      result.push(
        <div className={classes.tracker}>
          <div className={classes.trackerLeft}>{left}</div>
          <div className={classes.trackerMiddle}>{middle}</div>
          <div className={classes.trackerRight}>{right}</div>
        </div>
      );
      return result;
    }

    getCancelledTimeStamp = statusHistory => {
      const cancelledTimeStampData = statusHistory.filter(sh => sh.status === 'Cancelled');
      if (cancelledTimeStampData.length >= 0) {
        const timeStamp = cancelledTimeStampData[0].timestamp;
        if (timeStamp) {
          const time = timeStamp.split(' ')[1];
          return (
            <Typography style={{
              fontSize: '10px',
              whiteSpace: 'nowrap'
            }}
            >
              <span>
                {`On ${formatDate(timeStamp)}, ${formatTime(time)}`}
              </span>
            </Typography>
          );
        } return null;
      }
      return null;
    }

    render() {
      const { status, classes, statusHistory } = this.props;

      return (
        <div
          style={{
            backgroundColor: 'white',
            paddingLeft: '15px',
            paddingTop: '20px',
            paddingBottom: '20px',
            padding: '15px'
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
              onClick={() => {
                if (this.state.extend === false) {
                  this.setState({
                    extend: true
                  });
                }
              }}
            >
              <div className={classes.trackerCollapsed}>
                <div className={classes.trackerDiv2}>
                  <span
                    className={
                      status === 'Cancelled' || status === 'Rejected'
                        ? classes.typoNowCld
                        : classes.typoNow
                    }
                  >
                    DONE
                  </span>
                </div>
                <div className={classes.trackerDiv3}>
                  {status === 'Cancelled' || status === 'Rejected'
                    ? (
                      <Cancel className={classes.expansionPanelSummaryIconCld} />
                    ) : (
                      <DoneIcon className={classes.expansionPanelSummaryIcon} />
                    )}
                </div>
                {status === 'Cancelled' || status === 'Rejected'
                  ? (
                    <div>
                      <Typography style={{ color: 'red', textTransform: 'uppercase' }}>{status}</Typography>
                      {this.getCancelledTimeStamp(statusHistory)}
                    </div>
                  ) : (
                    <div>
                      <Typography style={{ color: '#12B23D' }}>{status}</Typography>
                    </div>
                  )}
              </div>
              <ExpandMoreIcon className={classes.expansionPanelSummaryIcon2} />
            </div>
          ) : (
            <div
              onClick={() => {
                if (this.state.extend === true) this.setState({ extend: false });
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                {this.handle(status, statusHistory)}
                <ExpandLessIcon className={classes.expansionPanelSummaryIcon2} />
              </div>
            </div>
          )}
        </div>
      );
    }
  }
);
