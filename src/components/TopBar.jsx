import React, { Component } from 'react';
import { Router, Link} from 'react-router'
import CourseBookSelector from './CourseBookSelector.jsx'
import { changeCoursebook } from '../actions'

export default class TopBar extends Component {
  render() {
    const { dispatch, courseBook } = this.props
    return <div id="bar-top" className="navbar navbar-default navbar-fixed-top">
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
            <li><Link to="/">강의 찾기</Link></li>
            <li><Link to="/my">내 강의 / <b className="badge-info">0학점</b></Link></li>
            <li><Link to="/export">저장하기</Link></li>
          </ul>
        </div>
      </div>
    </div>
  }
}
