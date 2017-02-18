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
      <ul className="nav navbar-nav navbar-right">
        <NotificationButton />
        <li><Link to="/myPage">{`${id}님 안녕하세요`}</Link></li>
      </ul> :
      <ul className="nav navbar-nav navbar-right">
        <li><Link to="/login">로그인</Link></li>
      </ul>
    )
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
            {this.renderLoginButton()}
          </div>
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
