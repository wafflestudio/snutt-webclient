import React from 'react';

const ResultTabs = ({ searching, searchAvailable, handleToggle }) => (
  <ul className="tab-list">
    { searchAvailable ? (
      <li
        className={`tab-button ${searching ? 'active' : ''}`}
        onClick={searching ? null : handleToggle}
      >
          검색결과
        </li>
    ) : null}
    <li
      className={`tab-button ${searching ? '' : 'active'}`}
      onClick={searching ? handleToggle : null}
    >
        현재 시간표
      </li>
  </ul>
  );

export default ResultTabs;
