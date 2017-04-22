import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router'
import CourseBookSelector from './CourseBookSelector.jsx'
import NotificationButton from './NotificationButton.jsx'
import { changeCoursebook } from '../../actions/fetchingActions'

class TopBar extends Component {
  constructor() {
    super()
    this.renderLoginButton = this.renderLoginButton.bind(this)
  }

  printTime() {
    const currentBook = this.props.currentBook
    if (currentBook == null)
      return '로딩중'

    const date = new Date(currentBook.updated_at)
    return '수강편람 업데이트:' + date.toLocaleString()
  }

  renderLoginButton() {
    const { loggedIn, id } = this.props
    return (
      loggedIn ?
      <div className="tt__navbar tt__navbar-right">
        <NotificationButton />
        <Link to="/myPage">{`${id}님 안녕하세요`}</Link>
      </div> :
      <div className="tt__navbar tt__navbar-right">
        <Link to="/login">로그인</Link>
      </div>
    )
  }

  render() {
    return (
        <div id="bar-top" className="navbar navbar-default navbar-fixed-top">
        <div className="container">
          <div className="tt__navbar">
            <Link className="tt__brand" to="/" id="brand_button"><b>SNUTT</b></Link>
          </div>
          <CourseBookSelector />
          <div className="tt__navbar tt__nav-collapse">
            <p>{this.printTime()}</p>
          </div>
          {this.renderLoginButton()}
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  const { courseBook, user } = state
  const { loggedIn, id } = user
  return { currentBook: courseBook.get('current'), loggedIn, id }
}

export default connect(mapStateToProps)(TopBar)
