import React from 'react';

const ResultTabs = ({ searching, handleToggle }) => (
  <ul className="tab-list">
    <li
      className={`tab-button ${searching ? 'active' : ''}`}
      onClick={searching ? null : handleToggle}
    >
        검색결과
      </li>
    <li
      className={`tab-button ${searching ? '' : 'active'}`}
      onClick={searching ? handleToggle : null}
    >
        현재 시간표
      </li>
  </ul>
  );

export default ResultTabs;
