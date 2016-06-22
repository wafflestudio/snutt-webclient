import React, { Component } from 'react';
import { Link } from 'react-router';

export default class Footer extends Component {
  render() {
    return (
      <div
        className="container"
        style={footerStyle}
      >
        <img
          width="170px"
          height="80px"
          src="https://raw.githubusercontent.com/wafflestudio/snutt/staging/assets/images/waffle_logo.png"
        />
        <h6><b>와플스튜디오 <Link to="/about">SNUTT 팀</Link></b>에서 개발 및 관리하고 있습니다!</h6>
        <h6>Source code와 contribution 정보는 <a href="https://github.com/wafflestudio/snutt"><b>SNUTT GitHub</b></a>에서 보실 수 있어요.</h6>
      </div>
    );
  }
}

const footerStyle = {
  textAlign: 'center',
}
