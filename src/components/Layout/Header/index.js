import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import CourseSelector from './CourseSelector.jsx';
import SearchBar from './SearchBar.jsx';
import Notification from './NotificationButton.jsx';

import { ReactComponent as Logo } from 'assets/logo.svg';

const mapStateToProps = state => {
  const {
    user: { loggedIn, id },
  } = state;
  return { loggedIn, id };
};

const LoginStatus = ({ loggedIn, id }) =>
  loggedIn ? (
    <Link to="/myPage">
      <div data-cy="profile" id="profile">{`${id}님`}</div>
    </Link>
  ) : (
    <Link to="/login">
      <div data-cy="profile" id="profile">
        로그인
      </div>
    </Link>
  );

const Header = ({ loggedIn, id }) => (
  <div id="header">
    <div id="header-container">
      {/* Brand  */}
      <Link to="/">
        <Logo id="logo" />
        <div id="brand">SNUTT</div>
      </Link>
      <CourseSelector />
      <LoginStatus loggedIn={loggedIn} id={id} />
      <Notification />
      <SearchBar />
    </div>
  </div>
);

export default connect(mapStateToProps)(Header);
