import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Router, Link} from 'react-router'
import CourseBookSelector from './CourseBookSelector.jsx'
import { changeCoursebook } from '../actions'

class TopBar extends Component {
  render() {
    const { dispatch, courseBook } = this.props
    return (
        <div id="bar-top" className="navbar navbar-default navbar-fixed-top">
        <div className="container">
          <div className="navbar-header">
            <a className="navbar-brand" href="#" id="brand_button"><b>SNUTT</b></a>
          </div>
          <div className="navbar-collapse collapse">
            <ul className="nav navbar-nav" id="main_navigation">
              <CourseBookSelector
                currentBook={courseBook}
                handleChange={newBook => dispatch(changeCoursebook(newBook))}
              />
            </ul>
            <p className="navbar-text">수강편람 업데이트: 3월 14일 13:11</p>
            <ul className="nav navbar-nav navbar-right">
              <li><a href="#">로그인</a></li>
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  const { courseBook } = state
  return { courseBook }
}

export default connect(mapStateToProps)(TopBar)
