import React, { Component } from 'react';
import { connect } from 'react-redux';
import ColorBlock from './ColorBlock.jsx';

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
    this.props.onChange(newColor);
  }

  render() {
    return (
      <div className="circle-wrapper">
        {this.props.colorScheme.map((c, i) => (
          <ColorBlock
            color={c}
            isSelected={c.bg == this.props.currentColor}
            colorIndex={i + 1}
            key={c.fg + c.bg}
            onClick={this.handleSelect}
          />
        ))}
      </div>
    );
  }
}


export default connect(mapStateToProps)(ColorPicker);
