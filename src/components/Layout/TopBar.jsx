import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router'
import CourseBookSelector from './CourseBookSelector.jsx'
import { changeCoursebook } from '../../actions'

class TopBar extends Component {

  printTime() {
    const currentBook = this.props.currentBook
    if (currentBook == null)
      return '로딩중'

    const date = new Date(currentBook.updated_at)
    return '수강편람 업데이트:' + date.toLocaleString()
  }

  render() {
    return (
        <div id="bar-top" className="navbar navbar-default navbar-fixed-top">
        <div className="container">
          <div className="navbar-header">
            <Link className="navbar-brand" to="/" id="brand_button"><b>SNUTT</b></Link>
          </div>
          <div className="navbar-collapse collapse">
            <ul className="nav navbar-nav" id="main_navigation">
              <CourseBookSelector />
            </ul>
            <p className="navbar-text">{this.printTime()}</p>
            <ul className="nav navbar-nav navbar-right">
              <li><Link to="/login">로그인</Link></li>
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  const { courseBook } = state
  return { currentBook: courseBook.get('current') }
}

export default connect(mapStateToProps)(TopBar)
