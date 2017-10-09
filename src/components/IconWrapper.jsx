import React, { Component } from 'react';

class IconWrapper extends Component {
  constructor() {
    super();
    this.state = {
      hovered: false,
      pressed: false,
    };
  }

  handleMouseEnter = () => this.setState({ hovered: true })
  handleMouseLeave = () => this.setState({ hovered: false })
  handleMouseDown = () => this.setState({ pressed: true })
  hanldeMouseUp = () => this.setState({ pressed: false })

  render() {
    const { hovered, pressed } = this.state;
    const { normalIcon, focusedIcon, hoveredIcon, disabledIcon, disabled, onClick, className } = this.props;
    let icon;
    if (disabled) {
      icon = disabledIcon;
    } else if (pressed) {
      console.log('focus');
      icon = focusedIcon;
    } else if (hovered) {
      console.log('hover');
      icon = hoveredIcon;
    } else {
      console.log('normal');
      icon = normalIcon;
    }
    return (
      <span
        className={`icon-wrapper ${className}`}
        onClick={onClick}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
        onMouseDown={this.handleMouseDown}
        onMouseUp={this.handleMouseup}
      >
        {icon}
      </span>
    );
  }
}

export default IconWrapper;
