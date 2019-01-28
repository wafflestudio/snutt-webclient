import React, { Component } from 'react';

class IconImageWrapper extends Component {
  constructor() {
    super();
    this.state = {
      hovered: false,
    };
  }

  handleMouseEnter = () => this.setState({ hovered: true });
  handleMouseLeave = () => this.setState({ hovered: false });

  render() {
    const { hovered } = this.state;
    const {
      id,
      className,
      focused,
      normalIcon,
      normalHoveredIcon,
      focusedIcon,
      focusedHoveredIcon,
      onClick,
    } = this.props;

    let imageSrc;
    if (hovered) {
      if (focused && focusedHoveredIcon) {
        imageSrc = focusedHoveredIcon;
      } else {
        imageSrc = normalHoveredIcon;
      }
    } else if (focused && focusedIcon) {
      imageSrc = focusedIcon;
    } else {
      imageSrc = normalIcon;
    }

    return (
      <span
        id={id}
        className={`icon-wrapper ${className || ''}`}
        onClick={onClick}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
      >
        <img src={imageSrc} />
      </span>
    );
  }
}

export default IconImageWrapper;
