import React, { Component } from 'react'
import { connect } from 'react-redux'

class ModalWrapper extends Component {
  constructor() {
    super()
  }

  render() {
    return(
      <div style={bgStyle}>
        {this.props.children}
      </div>
    )
  }
}

const bgStyle = {
  position: 'absolute',
  paddingTop: '200px',
  zIndex: '200',
  width: '100%',
  height: '100%',
  backgroundColor: 'rgba(0, 0, 0, 0.3)',
  textAlign: 'center',
}

function mapStateToProps(state) {
  return {}
}

export default connect(mapStateToProps)(ModalWrapper)
