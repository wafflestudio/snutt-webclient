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
    this.handleChange = this.handleChange.bind(this)
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

  handleChange(e) {
    this.setState({
      blank: e.target.value === '',
      input: e.target.value,
    })
  }

  render() {
    let spanClassName = 'label'
    if (!this.state.blank) spanClassName += ' typed'
    if (this.state.focus) spanClassName += ' focused'
    const inputProps = {
      ...this.props.inputProps,
      onChange: this.handleChange,
      onFocus: this.handleFocus,
      onBlur: this.handleBlur,
      value: this.state.input,
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
