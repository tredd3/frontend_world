import * as React from 'react'
import { HighLightOff, Typography } from '../../materialUI/index'
class OrderCancelled extends React.Component {
  render () {
    return (
      <div
        style={{
          backgroundColor: 'white',
          padding : "15px"
        }}
      >
        <div
          style={{
            display: 'flex',
            border: '2px solid red',
            background: 'white',
            padding : "5px"
          }}
        >
          <HighLightOff style={{marginRight : "5px",color : "red"}}/>
          <Typography>You cancelled this order.</Typography>
        </div>
      </div>
    )
  }
}
export default OrderCancelled
