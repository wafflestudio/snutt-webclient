import React, { Component } from 'react'

class ModalWrapper extends Component {

  static get propTypes() {
    return {
      handleOutsideClick: React.PropTypes.func,
      transparent: React.PropTypes.bool,
      fullScreen: React.PropTypes.bool,
    };
  }

  static get defaultProps() {
    return {
      transparent: false,
      fullScreen: false,
    };
  }

  constructor() {
    super()
    this.handleOutsideClick = this.handleOutsideClick.bind(this)
  }

  handleOutsideClick(e) {
    e.preventDefault()
    if (e.target !== this)  return;
    if (this.props.handleClose) {
      this.props.handleClose()
    }
  }

  render() {
    if (this.props.transparent)
      bgStyle.backgroundColor = 'rba(0, 0, 0, 0)';
    if (this.props.fullScreen) {
      Object.assign(bgStyle, {
        top: '0px',
        left: '0px',
        paddingTop: '50px',
        height: '130%',
      })
    }
    return(
      <div
        style={bgStyle}
        onClick={this.handleOutsideClick}
      >
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

export default ModalWrapper
