import React, { Component } from 'react';
import Color from 'color';
import styled from 'styled-components';

const ColoredDiv = styled.div`
  background-color: ${props =>
    props.isSelected ? props.bg : 'white'} !important;
  border-color: ${props => props.bg} !important;
  color: ${props => (props.isSelected ? props.fg : props.bg)};
  &:hover {
    background-color: ${props => props.hoverColor} !important;
    color: ${props => props.bg};
  }
`;

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
  }
}

export default ColoredBlock;
