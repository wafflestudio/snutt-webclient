import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ChromePicker } from 'react-color';
import ColorBlock from './ColorBlock.jsx';
import ColoredBlock from './ColoredBlock.jsx';


const mapStateToProps = (state) => {
  const { colorScheme } = state.tableList;
  return { colorScheme };
};

class ColorPicker extends Component {
  constructor() {
    super();
    this.handleSelect = this.handleSelect.bind(this);
    this.state = { paletteOpen: false };
  }

  handleSelect(newColor) {
    if (this.state.paletteOpen) { this.setState({ paletteOpen: false }); }
    this.props.onChange(newColor);
  }

  handlePaletteSelect = (c) => {
    const color = { bg: c.hex, fg: '#ffffff' };
    const colorIndex = 0; // Is it valid??
    this.props.onChange({ color, colorIndex });
  }

  togglePalette = () => {
    this.setState({ paletteOpen: !this.state.paletteOpen });
  }

  render() {
    const { colorScheme, currentColor } = this.props;
    const hasUserColor = colorScheme.findIndex(c => c.bg === currentColor.bg) === -1;
    return (
      <div className="circle-wrapper">
        {this.props.colorScheme.map((c, i) => (
          <ColorBlock
            color={c}
            isSelected={c.bg === this.props.currentColor.bg}
            colorIndex={i + 1}
            key={c.fg + c.bg}
            onClick={this.handleSelect}
          />
        ))}
        <ColoredBlock
          color={hasUserColor ? currentColor : { fg: 'black', bg: '#b7c3ce' }}
          isSelected={hasUserColor}
          name={this.state.paletteOpen ? '확인' : '나만의 색'}
          handleColorClick={this.togglePalette}
        />
        { this.state.paletteOpen && (
          <div className="picker-wrapper">
            <ChromePicker
              color={currentColor.bg}
              disableAlpha
              onChangeComplete={this.handlePaletteSelect}
            />
          </div>
        )}
      </div>
    );
  }
}


export default connect(mapStateToProps)(ColorPicker);
