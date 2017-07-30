import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import CourseSelector from './CourseSelector.jsx';
import SearchBar from './SearchBar.jsx';

import Logo from '../../../../assets/logo.svg';
import AlarmIcon from '../../../../assets/ic-alarm.svg';

const mapStateToProps = (state) => {
  const { user: { loggedIn, id } } = state;
  return { loggedIn, id };
};

const LoginStatus = ({ loggedIn, id }) => (
  loggedIn ?
    <Link to="/myPage">
      <div id="profile">{`${id}님`}</div>
    </Link> :
    <Link to="/login">
      <div id="profile">로그인</div>
    </Link>
);

const Header = ({ loggedIn, id }) => (
  <div id="header">
    <div id="header-container">
      {/* Brand  */}
      <Link to="/">
        <Logo id="logo" />
        <div id="brand">
          SNUTT
        </div>
      </Link>
      <CourseSelector />
      <LoginStatus loggedIn={loggedIn} id={id} />
      <AlarmIcon id="noti" />
      <SearchBar />
    </div>
  </div>
);

export default connect(mapStateToProps)(Header);
