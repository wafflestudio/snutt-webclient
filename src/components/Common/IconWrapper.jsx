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
  handleMouseLeave = () => this.setState({ hovered: false, pressed: false })
  handleMouseDown = () => this.setState({ pressed: true });
  handleMouseUp = (e) => {
    this.setState({ pressed: false, hovered: false });
    this.props.onClick();
  }

  render() {
    const { hovered, pressed } = this.state;
    const { normalIcon, focusedIcon, hoveredIcon, disabledIcon, disabled, focused,
      onClick, className, id } = this.props;

    let icon;
    if (disabled && disabledIcon) {
      icon = disabledIcon;
    } else if (pressed && focusedIcon) {
      icon = focusedIcon;
    } else if (focused && focusedIcon) {
      icon = focusedIcon;
    } else if (hovered && hoveredIcon) {
      icon = hoveredIcon;
    } else {
      icon = normalIcon;
    }

    return (
      <span
        id={id}
        className={`icon-wrapper ${className}`}
        onClick={onClick}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
        onMouseDown={this.handleMouseDown}
        onMouseUp={this.handleMouseUp}
      >
        {icon}
      </span>
    );
  }
}

export default IconWrapper;
