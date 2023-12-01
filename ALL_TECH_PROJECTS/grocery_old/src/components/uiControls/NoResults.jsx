import * as React from 'react'
import Typography from '@material-ui/core/Typography'
import EmptyBucket from '../../assets/images/icons/EmptyBucket.png'

class NoResults extends React.Component {

  render() {
    const { text, page, imgSrc, showComponent = false, style = {} } = this.props
    if (showComponent && page === 'dashSearch') {
      return (
        <div
          style={{
            padding: '16px',
            color: 'black',
            width: '70%'
          }}
        >
          <Typography>
            Found no results for <span style={{ fontWeight: 600 }}>{text}</span>
          </Typography>
          <Typography>Check your spelling and search again</Typography>
        </div>
      )
    } else if (showComponent) {
      return (
        <div
          style={{
            padding: '16px',
            color: 'black',
            textAlign: 'center',
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            ...style
          }}
        >
          <img src={imgSrc ? imgSrc : EmptyBucket} alt="" />
          <span style={{ marginTop: "20px" }}>{text ? text : 'No Results Found'}</span>
        </div>
      )
    } else {
      return null;
    }
  }
}
export default NoResults;
