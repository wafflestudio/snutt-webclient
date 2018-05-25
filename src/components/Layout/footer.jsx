import React from 'react';
import { Link } from 'react-router-dom';
import { baseUrl } from '../../config';

const MEMBER_URL = `${baseUrl}member`;
const TERM_URL = `${baseUrl}terms_of_service`;
const PRIVACY_URL = `${baseUrl}privacy_policy`;

const Footer = () => (
  <div className="footer">
    <a className="item" href={MEMBER_URL}>
      Waffle Studio SNUTT팀
    </a>
    <a className="item" href="https://github.com/wafflestudio/snutt-webclient">
      SNUTT GitHub
    </a>
    <Link className="item" to="/feedback">
      개발자 도와주기
    </Link>
    <a className="item" href="http://old.snutt.kr">
      SNUTT 구버전 사용하기
    </a>
    <a
      className="item"
      href="https://www.google.com/chrome/browser/desktop/index.html"
    >
      이 웹사이트는 최신 Chrome에서 제일 잘 동작합니다.
    </a>

    {/* ㅜㅜㅜ...  */}
    <div className="right-wrapper">
      <a className="item" href={TERM_URL}>
        약관
      </a>
      <a className="item" href={PRIVACY_URL}>
        개인정보 처리방침
      </a>
    </div>
  </div>
);

export default Footer;
