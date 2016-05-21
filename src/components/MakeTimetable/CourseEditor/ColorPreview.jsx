import React from 'react'

const ColorPreview = ({ char, fgColor, bgColor, size, onClick }) => {
  const divStyle = {
    backgroundColor: bgColor,
    color: fgColor,
    width: size + 'px',
    height: size + 'px',
    fontSize: (size - 7) + 'px',
    margin: 0,
    border: 0,
    padding: 0,
    textAlign: 'center',
    display: 'inline-block',
    userSelect: 'none',
    WebkitUserSelect: 'none',
  }

  return (
    <div
      style={divStyle}
      onClick={onClick}
    >
      {char ? char : 'A'}
    </div>
  )
}

ColorPreview.propTypes = {
  char: React.PropTypes.string,
  fgColor: React.PropTypes.string,
  bgColor: React.PropTypes.string,
  size: React.PropTypes.number,
}

export default ColorPreview
