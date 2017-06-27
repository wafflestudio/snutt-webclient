import React, { Component } from 'react';
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
  const { colorScheme } = state.tableList;
  return { colorScheme }
}

class ColorPicker extends Component {
  constructor(props) {
    super();
    this.handleSelect = this.handleSelect.bind(this);
    this.state = {
      color: props.color,
    };
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
            colorIndex={i+1}
            key={i}
            onClick={this.handleSelect}
          />
        ))}
      </div>
    );
  }
}

const Circle = (props) => {
  const { color, colorIndex, onClick } = props;
  const style = {
    backgroundColor: color.bg,
    color: color.fg,
  };
  return (
    <div
      className="color-circle"
      onClick={onClick.bind(this, { color, colorIndex })}
      style={style}
    >
      <span>Aa</span>
    </div>
  );
};

export default connect(mapStateToProps)(ColorPicker);
