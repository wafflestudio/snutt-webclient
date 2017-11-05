import React from 'react';
import { baseUrl } from '../../config';

const MEMBER_URL = `${baseUrl}member`;
const TERM_URL = `${baseUrl}terms_of_service`;
const PRIVACY_URL = `${baseUrl}privacy_policy`;

const Footer = () => (
  <div className="footer">
    <a className="item" href={MEMBER_URL}>
      Waffle Studio SNUTT팀
    </a>
    <a className="item" href="https://github.com/wafflestudio/snutt">
      SNUTT GitHub
    </a>
    <a className="item">
      개발자 도와주기
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
