import React, { Component } from 'react';
import Radium from 'radium'; // To use pseudoclass CSS inside JavaScript
import Color from 'color';

@Radium
class ColoredBlock extends Component {
  handleClick = (e) => {
    e.preventDefault();
    this.props.handleColorClick(this.props.color);
  }

  render() {
    const { color, isSelected, name } = this.props;
    const style = {
      backgroundColor: isSelected ? color.bg : 'white',
      borderColor: color.bg,
      color: isSelected ? color.fg : color.bg,
      ':hover': {
        backgroundColor: Color(color.bg).fade(0.8).rgb().toString(),
        color: color.bg,
      },
    };
    return (
      <div
        className="color-circle"
        onClick={this.handleClick}
        style={style}
      >
        <span>{name}</span>
      </div>
    );
  }
}

export default ColoredBlock;
