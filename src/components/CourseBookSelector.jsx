import React, { Component } from 'react';

var semesters = [
  { year: 2016, semesterIdx: 1 },
  { year: 2015, semesterIdx: 4 },
  { year: 2015, semesterIdx: 3 },
  { year: 2015, semesterIdx: 2 },
  { year: 2015, semesterIdx: 1 },
]
var idxToString = [ null, '1', 'S', '2', 'W' ]

export default class CourseBookSelector extends Component {
  constructor() {
    super()
    this.handleSelect = this.handleSelect.bind(this)
    this.state = {
      opened: false,
    }
  }

  handleSelect(selectedSemester) {
    this.setState({
      opened: false,
    })
    this.props.handleChange(selectedSemester)
  }

  render() {
    return(
      <li className={'dropdown' + (this.state.opened ? ' open' : '')}>
        <a
          className='button dropdown-toggle'
          onClick={()=>this.setState({opened: !this.state.opened})}
        >
          {`${this.props.currentBook.year}-${idxToString[this.props.currentBook.semesterIdx]}`}
          <span className='caret' />
        </a>
        <ul className='dropdown-menu'>
          {semesters.map((e, i) => (
            <li key={i}>
              <a
                href='#'
                onClick={()=>this.handleSelect(e)}
              >
                {`${e.year}-${idxToString[e.semesterIdx]}`}
              </a>
            </li>
          ))}
        </ul>
      </li>
    )
  }
}
