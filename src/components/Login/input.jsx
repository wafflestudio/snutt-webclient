import React, { Component } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

export default class Input extends Component {
  constructor() {
    super()
    this.state = {
      blank: true,
      focus: false,
      input: '',
    }
    this.handleFocus = this.handleFocus.bind(this)
    this.handleBlur = this.handleBlur.bind(this)
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
  }

  handleFocus() {
    this.setState({ focus: true })
  }

  handleBlur() {
    this.setState({ focus: false })
  }

  render() {
    let spanClassName = 'label'
    if (this.props.inputProps.value != '') spanClassName += ' typed'
    if (this.state.focus) spanClassName += ' focused'
    const inputProps = {
      ...this.props.inputProps,
      onFocus: this.handleFocus,
      onBlur: this.handleBlur,
    }
    return (
      <div className={`input-group ${this.props.groupClassName}`}>
        <span className={spanClassName}>
          {inputProps.placeholder}
        </span>
        <input {...inputProps} />
      </div>
    )
  }
}

Input.defaultProps = {
  groupClassName: '',
}
