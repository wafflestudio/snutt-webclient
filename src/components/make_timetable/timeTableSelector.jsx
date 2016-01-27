import React, { Component } from 'react'

export default class TimeTableSelector extends Component {
  constructor() {
    super()
  }

  render() {
    var buttons = []
    for (var i = 0; i < this.props.total; i++) {
      buttons.push(
        <button
          type="button"
          className={"btn btn-default" + (i == this.props.currentIndex ? " btn-primary" : "")}
          key={i}
          onClick={this.props.handleChange.bind(this, i)}
        >
          {i + 1}
        </button>
      )
    }

    return (
      <div className="btn-group" role="group" aria-label="...">
        {buttons}
      </div>
    )
  }
}
