// Created by Rohit
// A component used for Description ,Ingredients, Nutritional Facts, Disclaimer
import * as React from 'react';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

const styles = () => ({
  listItem: {
    maxWidth: '97%',
    overflow: 'hidden',
    position: 'relative',
    lineHeight: '1.2em',
    textAlign: 'justify',
    marginRight: '-1em',
    paddingRight: '0.8em',
    marginBottom: '0.5em',
    '&&:before': {
      content: '"..."',
      position: 'absolute',
      right: 0,
      bottom: 0
    },
    '&&:after': {
      content: '""',
      position: 'absolute',
      right: 0,
      width: '1em',
      height: '1em',
      marginTop: '0.2em',
      background: 'white'
    }
  }
});

class ExtraInformation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentStateText: 'seemore',
      hasOverflowingChildren: false
    };
    this.content = null;
    this.refId = this.props.text1 + this.props.id;
    this.diff = 0;
  }

  componentDidMount() {
    this.content = document.getElementById(this.refId);
    this.diff = this.content.scrollHeight - this.content.clientHeight;

    const hasOverflowingChildren = this.calculateDifference() > 1;
    this.setState({ hasOverflowingChildren });
  }

  handleSeeButton = () => {
    if (this.state.currentStateText === 'seeless') {
      this.setState({ currentStateText: 'seemore' });
    } else {
      this.setState({ currentStateText: 'seeless' });
    }
  };

  calculateDifference = () => {
    // to find the difference between scroll height and client height
    if (this.content !== null) {
      this.diff = this.content.scrollHeight - this.content.clientHeight;
    }
    if (this.content !== null) return this.content.scrollHeight - this.content.clientHeight;
    return 0;
  };

  render() {
    const { text1, text2, child } = this.props;
    const { currentStateText, hasOverflowingChildren } = this.state;
    return (
      <section>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            paddingBottom: '8px'
          }}
        >
          <Typography
            style={{
              fontSize: '14px',
              color: '#333333',
              fontFamily: 'OPEN SANS'
            }}
          >
            {text1}
          </Typography>
          {hasOverflowingChildren && currentStateText === 'seemore' ? (
            <Typography
              style={{
                fontSize: '12px',
                color: '#1A73E9',
                fontFamily: 'OPEN SANS'
              }}
              onClick={this.handleSeeButton}
            >
              See More
            </Typography>
          ) : null }

          {currentStateText === 'seeless' ? (
            <Typography
              style={{
                fontSize: '12px',
                color: '#1A73E9',
                fontFamily: 'OPEN SANS'
              }}
              onClick={this.handleSeeButton}
            >
              See Less
            </Typography>
          ) : null}
        </div>
        <Typography
          id={this.refId}
          className={this.props.classes.listItem}
          style={
            child ? { display: 'none' } : currentStateText === 'seemore' ? (
              { maxHeight: '3.6em', color: '#666666', fontSize: '13px' }
            ) : (
              { maxHeight: null, color: '#666666', fontSize: '13px' }
            )
          }
        >
          {text2}
        </Typography>
        {child}
      </section>
    );
  }
}
export default withStyles(styles)(ExtraInformation);
