import React from 'react'

const fileWrapperStyle = {
  margin: '10px 0px 10px 20px',
  width: 'auto',
  display: 'flex',
  alignItems: 'center'
}
const iconStyle = {
  width: '20px',
  height: '17px',
  marginLeft: '7px'
}

class File extends React.PureComponent {
  render() {
    return <div style={fileWrapperStyle}>
      <div>{ this.props.name } ({ this.props.mime })</div>
      <img style={iconStyle} src='https://img.icons8.com/ios/50/000000/file--v1.png' />
    </div>
  }
}

export default File
