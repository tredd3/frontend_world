// Created by Rohit
// A component used for Description ,Ingredients, Nutritional Facts, Disclaimer
import * as React from 'react'
import Typography from '@material-ui/core/Typography'
class ExtraInformation extends React.Component {
  render () {
    const { text1, text2 } = this.props
    // var divHeight = document.getElementById('content').offsetHeight
    // console.log('Div Height is ' + divHeight)
    return (
      <div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            paddingBottom: '5px'
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
          <Typography
            style={{
              fontSize: '12px',
              color: '#1A73E9',
              fontFamily: 'OPEN SANS'
            }}
          >
            See more
          </Typography>
        </div>
        <div id="content" >
          <Typography
            style={{
              fontSize: '12px',
              color: '#666666',
              fontFamily: 'OPEN SANS'
            }}
          >
            {text2}
          </Typography>
        </div>
      </div>
    )
  }
}
export default ExtraInformation
