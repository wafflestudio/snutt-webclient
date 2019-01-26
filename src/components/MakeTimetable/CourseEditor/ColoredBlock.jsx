import React, { Component } from 'react';
// import Radium from 'radium'; // To use pseudoclass CSS inside JavaScript
import Color from 'color';
import styled from 'styled-components';

const ColoredDiv = styled.div`
  backgroundColor: ${props => (props.isSelected ? props.bg : 'white')};
  borderedColor: ${props => props.bg};
  color: ${props => (props.isSelected ? props.fg : props.bg)};
  :hover: {
    backgroundColor: ${props => props.hoverColor}
    color: ${props => props.bg}
  }
`;

// @Radium
class ColoredBlock extends Component {
  handleClick = e => {
    e.preventDefault();
    this.props.handleColorClick(this.props.color);
  };

  render() {
    const {
      color: { fg, bg },
      isSelected,
      name,
    } = this.props;
    // const style = {
    //   backgroundColor: isSelected ? color.bg : 'white',
    //   borderColor: color.bg,
    //   color: isSelected ? color.fg : color.bg,
    //   ':hover': {
    //     backgroundColor: Color(color.bg)
    //       .fade(0.8)
    //       .rgb()
    //       .toString(),
    //     color: color.bg,
    //   },
    // };
    const hoverColor = Color(bg)
      .fade(0.8)
      .rgb()
      .toString();
    return (
      <ColoredDiv
        isSelected={isSelected}
        fg={fg}
        bg={bg}
        hoverColor={hoverColor}
        className="color-circle"
        onClick={this.handleClick}
      >
        <span>{name}</span>
      </ColoredDiv>
    );
    // return (
    //   <div className="color-circle" onClick={this.handleClick} style={style}>
    //     <span>{name}</span>
    //   </div>
    // );
  }
}

export default ColoredBlock;
