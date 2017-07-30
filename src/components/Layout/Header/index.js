import React from 'react';
import CourseSelector from './CourseSelector.jsx';
import SearchBar from './SearchBar.jsx';

const Header = () => (
  <div id="header">
    <div id="header-container">
      {/* Brand  */}
      <div id="logo" />
      <div id="brand">
        SNUTT
      </div>
      <CourseSelector />
      <div id="profile">
        leejoo317님
      </div>
      <div id="noti" />
      <SearchBar />


    </div>
  </div>
);

export default Header;
