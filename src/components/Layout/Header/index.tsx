import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { AppState } from 'store';
import CourseSelector from './CourseSelector.jsx';
import { SearchBar } from 'components/Search';
import Notification from './NotificationButton.jsx';

import { ReactComponent as Logo } from 'assets/logo.svg';

const mapStateToProps = (state: AppState) => {
  const {
    user: { user },
  } = state;
  const username = (user && (user.fb_name || user.local_id)) || null;
  return { username };
};

interface Props {
  username: string | null;
}

const LoginStatus: React.FC<Props> = ({ username }) =>
  username ? (
    <Link to="/myPage">
      <div data-cy="profile" id="profile">{`${username}님`}</div>
    </Link>
  ) : (
    <Link to="/login">
      <div data-cy="profile" id="profile">
        로그인
      </div>
    </Link>
  );

const Header: React.FC<Props> = ({ username }) => (
  <div id="header">
    <div id="header-container">
      <Link to="/">
        <Logo id="logo" />
        <div id="brand">SNUTT</div>
      </Link>
      <CourseSelector />
      <LoginStatus username={username} />
      <Notification />
      <SearchBar />
    </div>
  </div>
);

export default connect(mapStateToProps)(Header);
