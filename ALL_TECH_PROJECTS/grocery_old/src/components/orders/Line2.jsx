import * as React from 'react'
class Line2 extends React.Component {
  render() {
    const { color } = this.props
    return (
      <div>
        <div
          style={{
            borderLeft: '2px solid',
            height: '15px',
            color: "green",
          }}
        />
        <div
          style={{
            borderLeft: '2px solid',
            height: '45px',
            color: "grey"
          }}
        />
      </div>
    )
  }
}
export default Line2
