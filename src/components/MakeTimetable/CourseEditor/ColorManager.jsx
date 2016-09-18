import React, { Component } from 'react'
// import ColorPicker from 'react-color'
var ColorPicker = require.ensure(["react-color"], function(require) {
  console.log("getting Color picker")
})

import ColorPreview from './ColorPreview.jsx'

const colors = [
  { fg: '#2B8728', bg: '#B6F9B2'}, //green
  { fg: '#45B2B8', bg: '#BFF7F8'}, //really light blue
  { fg: '#1579C2', bg: '#94E6FE'}, //light blue
  { fg: '#A337A1', bg: '#F6B5F5'}, //purple
  { fg: '#B8991B', bg: '#FFF49A'}, //beige/yello
  { fg: '#BA313B', bg: '#FFB2BC'}, //pink/red
  { fg: '#BA6C31', bg: '#FFCFB2'},  //skin-tone/brown
]

const ColorBox = ({ color, size, onClick}) => {
  const boxStyle = {
    verticalAlign: 'top',
    display: 'inline-block',
    backgroundColor: color,
    width: size,
    height: size,
    margin: '1px 10px 18px 0',
  }
  return (
    <div
      style={boxStyle}
      onClick={onClick}
    />
  )
}

const pickerState = {
  none: 'NONE',
  fg: 'FG',
  bg: 'BG',
}

export default class ColorManager extends Component {
  constructor() {
    super()
    this.togglePicker = this.togglePicker.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.state = {
      pickerState: pickerState.none,
    }
  }

  handleChange(color) {
    const hex = '#' + color.hex
    if (this.state.pickerState == pickerState.fg)
      this.props.updateColor(hex, this.props.currentBgColor)
    else if (this.state.pickerState == pickerState.bg)
      this.props.updateColor(this.props.currentFgColor, hex)
  }

  togglePicker(type) {
    if (this.state.pickerState == pickerState.none) {
      this.setState({
        pickerState: (type == 'fg' ? pickerState.fg : pickerState.bg),
      })
    } else {
      this.setState({ pickerState: pickerState.none })
    }
  }

  render() {
    return (
      <div className='row'>
        <span
          style={backArrowStyle}
          className='glyphicon glyphicon-arrow-left'
          aria-hidden='true'
          onClick={this.props.toggleColorEdit}
        />
        <div className='col-sm-4 col-sm-offset-1'>
          <h4>Palette</h4>
          <div style={paletteStyle}>
            {colors.map((val, idx) => (
                <ColorPreview
                  key={idx}
                  fgColor={val.fg}
                  bgColor={val.bg}
                  size={30}
                  onClick={() => {
                    this.props.updateColor(val.fg, val.bg)
                  }}
                />
            ))}
          </div>
        </div>
        <div className='col-sm-4'>
          <h4>New Color</h4>
          <div className='row'>
            <div className='col-sm-6'>
              <ColorPreview
                fgColor={this.props.currentFgColor}
                bgColor={this.props.currentBgColor}
                size={60}
              />
            </div>
            <div className='col-sm-6'>
              <ColorBox
                color={this.props.currentFgColor}
                size='20px'
                onClick={()=>this.togglePicker('fg')}
              />
              <span>fg</span>
              <br />
              <ColorBox
                color={this.props.currentBgColor}
                size='20px'
                onClick={()=>this.togglePicker('bg')}
              />
              <span>bg</span>
              <ColorPicker
                display={this.state.pickerState != pickerState.none}
                onChangeComplete={this.handleChange}
                onClose={this.togglePicker}
                color={
                  this.state.pickerState == pickerState.fg ?
                  this.props.currentFgColor :
                  this.props.currentBgColor
                }
              />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const paletteStyle = {
  width: '120px', //ColorPreview's size * 4
}

const backArrowStyle = {
  position: 'absolute',
  left: '15px',
  top: '120px',
}
