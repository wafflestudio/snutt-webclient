import React, { Component } from 'react';
import { connect } from 'react-redux'
import { updateCoursebook, changeCoursebook } from '../../actions/fetchingActions'

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

  handleSelect(e, selectedCoursebook) {
    this.setState({ opened: false })
    this.props.dispatch(changeCoursebook(selectedCoursebook))
  }
  toggleOpened = () => {this.setState({opened: !this.state.opened})}
  handleClose = () => {this.setState({opened: false})}

  render() {
    const { courseBooks, currentBook } = this.props

    if (courseBooks.length == 0)  // When coursebook fetch is not finished
      return <li className='dropdown'></li>
    else {
      return (
        <li
          className={'tt__navbar dropdown' + (this.state.opened ? ' open' : '')}
          tabIndex={1}
          onBlur={this.handleClose}
        >
          <a
            className='button dropdown-toggle'
            onClick={this.toggleOpened}
          >
            {`${currentBook.year}-${idxToString[currentBook.semester]}`}
            <span className='caret' />
          </a>
          <ul className='dropdown-menu'>
            {courseBooks.map((courseBook, i) => (
              <li key={i}>
                <a
                  onClick={(e)=>this.handleSelect(e, courseBook)}
                >
                  {`${courseBook.year}-${idxToString[courseBook.semester]}`}
                </a>
              </li>
            ))}
          </ul>
        </li>
      )
    }
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
