import React, { Component } from 'react';
import { connect } from 'react-redux'
import { updateCoursebook, changeCoursebook } from '../../actions'

var semesters = [
  { year: 2016, semesterIdx: 1 },
  { year: 2015, semesterIdx: 4 },
  { year: 2015, semesterIdx: 3 },
  { year: 2015, semesterIdx: 2 },
  { year: 2015, semesterIdx: 1 },
]
var idxToString = [ null, '1', 'S', '2', 'W' ]

class CourseBookSelector extends Component {
  constructor() {
    super()
    this.handleSelect = this.handleSelect.bind(this)
    this.state = {
      opened: false,
    }
  }

  componentWillMount() {
    this.props.dispatch(updateCoursebook())
  }

  handleSelect(selectedSemester) {
    this.setState({ opened: false })
    this.props.dispatch(changeCoursebook(selectedSemester))
  }

  render() {
    const { courseBooks, currentBook } = this.props

    if (courseBooks.length == 0)  // When coursebook fetch is not finished
      return <li className='dropdown'></li>

    return (
      <li className={'dropdown' + (this.state.opened ? ' open' : '')}>
        <a
          className='button dropdown-toggle'
          onClick={()=>this.setState({opened: !this.state.opened})}
        >
          {`${currentBook.year}-${idxToString[currentBook.semester]}`}
          <span className='caret' />
        </a>
        <ul className='dropdown-menu'>
          {courseBooks.map((e, i) => (
            <li key={i}>
              <a
                href='#'
                onClick={()=>this.handleSelect(e)}
              >
                {`${e.year}-${idxToString[e.semester]}`}
              </a>
            </li>
          ))}
        </ul>
      </li>
    )
  }
}

function mapStateToProps(state) {
  const { courseBook } = state
  let courseBookObject = courseBook.toJS()
  return {
    courseBooks: courseBookObject.available,
    currentBook: courseBookObject.current
  }
}

export default connect(mapStateToProps)(CourseBookSelector)
