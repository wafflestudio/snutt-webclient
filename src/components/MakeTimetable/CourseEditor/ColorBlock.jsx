import React, { Component } from 'react';
import Radium from 'radium'; // To use pseudoclass CSS inside JavaScript
import Color from 'color';

const color2name = {
  '#e54459': '석류',
  '#f58d3d': '감귤',
  '#fac52d': '들국',
  '#a6d930': '완두',
  '#2bc366': '비취',
  '#1bd0c9': '지중해',
  '#1d99e9': '하늘',
  '#4f48c4': '라벤더',
  '#af56b3': '자수정',
};

@Radium
class ColorBlock extends Component {
  handleClick = (e) => {
    const { color, colorIndex, onClick } = this.props;
    onClick({ color, colorIndex }, e);
  }

  render() {
    const { color, isSelected } = this.props;
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
        <span>{color2name[color.bg]}</span>
      </div>
    );
  }
}

export default ColorBlock;
