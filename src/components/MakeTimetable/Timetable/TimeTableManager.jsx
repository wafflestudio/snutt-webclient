import React, { Component } from 'react'
import html2canvas from 'html2canvas'

export default class TimetableSelector extends Component {
  constructor() {
    super()
    this.onDelete = this.onDelete.bind(this)
    this.handleSave = this.handleSave.bind(this)
  }

  onDelete(i, e) {
    this.props.handleDelete(i)
    e.stopPropagation()
  }

  handleSave(e) {
    var timeTableElement = document.getElementsByClassName('timetable')[0]
    html2canvas(timeTableElement).then(function(canvas) {
      var dataURL = canvas.toDataURL('image/png')
      var pom = document.createElement('a')
      pom.setAttribute('href', dataURL)
      pom.setAttribute('download', 'table.png')
      pom.click()
    })
  }

  render() {
    var buttons = []
    for (var i = 0; i < this.props.total; i++) {
      buttons.push(
        <li
          className={'tab-button' + (i == this.props.currentIndex ? ' active' : '')}
          key={i}
          onClick={this.props.handleChange.bind(this, i)}
        >
          {i+1}
          <span
            className="glyphicon glyphicon-remove"
            aria-hidden="true"
            onClick={this.onDelete.bind(this, i)}
          />
        </li>
      )
    }
    //add button
    buttons.push(
      <li
        className="tab-button control"
        key={++i}
        onClick={this.props.handleAdd}
      >
        <span className="glyphicon glyphicon-plus" aria-hidden="true"></span>
      </li>
    )
    //save button
    buttons.push(
      <li
        className="tab-button control"
        key={++i}
        onClick={this.handleSave}
      >
        <span className="glyphicon glyphicon-save" aria-hidden="true"></span>
      </li>
    )
    return(
      <ul className="tab-list">
        {buttons}
      </ul>
    )
  }

  // render() {
  //   var buttons = []
  //   for (var i = 0; i < this.props.total; i++) {
  //     buttons.push(
  //       <button
  //         type="button"
  //         className={"btn btn-default" + (i == this.props.currentIndex ? " btn-primary" : "")}
  //         key={i}
  //         onClick={this.props.handleChange.bind(this, i)}
  //       >
  //         {i + 1}
  //         <span
  //           className="glyphicon glyphicon-remove"
  //           aria-hidden="true"
  //           onClick={this.onDelete.bind(this, i)}
  //         />
  //       </button>
  //     )
  //   }
  //   buttons.push(
  //     <a
  //       type="button"
  //       className="btn btn-default"
  //       aria-label="Left Align"
  //       onClick={() => this.props.handleAdd()}
  //       key={-1}
  //     >
  //       <span className="glyphicon glyphicon-plus" aria-hidden="true"></span>
  //     </a>
  //   )
  //   buttons.push(
  //     <button
  //       className="btn btn-default"
  //       aria-label="Left Align"
  //       onClick={() => this.handleSave()}
  //       key={-2}
  //     >
  //       <span className="glyphicon glyphicon-save" aria-hidden="true"></span>
  //     </button>
  //   )
  //   return (
  //     <div className="btn-group" role="group" aria-label="...">
  //       {buttons}
  //     </div>
  //   )
  // }
}
