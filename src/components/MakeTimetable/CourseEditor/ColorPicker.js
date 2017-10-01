import React, { Component } from 'react';
import { connect } from 'react-redux';

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

const mapStateToProps = (state) => {
  const { colorScheme } = state.tableList;
  return { colorScheme };
};

class ColorPicker extends Component {
  constructor() {
    super();
    this.handleSelect = this.handleSelect.bind(this);
  }

  handleSelect(newColor, e) {
    e.preventDefault();
    console.log(newColor);
    this.props.onChange(newColor);
  }

  render() {
    return (
      <div className="circle-wrapper">
        {this.props.colorScheme.map((c, i) => (
          <Circle
            color={c}
            isSelected={c.bg == this.props.currentColor}
            colorIndex={i + 1}
            key={i}
            onClick={this.handleSelect}
          />
        ))}
      </div>
    );
  }
}

const Circle = (props) => {
  const { color, colorIndex, isSelected, onClick } = props;
  const style = {
    backgroundColor: isSelected ? color.bg : 'white',
    borderColor: color.bg,
    color: isSelected ? color.fg : color.bg,
  };
  return (
    <div
      className="color-circle"
      onClick={onClick.bind(this, { color, colorIndex })}
      style={style}
    >
      <span>{color2name[color.bg]}</span>
    </div>
  );
};

export default connect(mapStateToProps)(ColorPicker);
