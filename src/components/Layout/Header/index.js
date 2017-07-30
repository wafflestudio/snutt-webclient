import React from 'react';
import CourseSelector from './CourseSelector.jsx';
import SearchBar from './SearchBar.jsx';

import Logo from '../../../../assets/logo.svg';
import AlarmIcon from '../../../../assets/ic-alarm.svg';

const Header = () => (
  <div id="header">
    <div id="header-container">
      {/* Brand  */}
      <Logo id="logo" />
      <div id="brand">
        SNUTT
      </div>
      <CourseSelector />
      <div id="profile">
        leejoo317님
      </div>
      <AlarmIcon id="noti" />
      <SearchBar />
    </div>
  </div>
);

export default Header;
