import React from 'react'
import PureRenderComponent from '../../PureRenderComponent.jsx'
import { CirclePicker } from 'react-color'

export default class ColorPickerWrapper extends PureRenderComponent {
  render() {
    return (
      <div className='snutt__colorpicker'>
        <CirclePicker
          color={ this.props.color }
          onChangeComplete={ this.props.onChange }
        />
      </div>
    )
  }
}

