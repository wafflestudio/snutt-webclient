import React from 'react';
import Modal from 'react-modal';

import { ReactComponent as Logo } from 'assets/logo.svg';
import { ReactComponent as LogoAppStore } from 'assets/logo-apple-black.svg';
import { ReactComponent as LogoPlayStore } from 'assets/logo-playstore-black.svg';

const AppLink = ({ isOpen, close }) => (
  <Modal
    isOpen={isOpen}
    className="applink-wrapper"
    overlayClassName="snutt__modal-overlay"
    onRequestClose={close}
  >
    <div className="">
      <div id="applink-logo">
        <Logo width="44" height="44" />
      </div>
      <p id="applink-title">SNUTT</p>
      <p id="applink-message">
        SNUTT를 모바일에서 이용하시려면 <br /> 어플을 추천드립니다.
      </p>
      <div id="applink-stores">
        <a href="https://itunes.apple.com/kr/app/snutt-%EC%84%9C%EC%9A%B8%EB%8C%80%ED%95%99%EA%B5%90-%EC%8B%9C%EA%B0%84%ED%91%9C-%EC%95%B1/id1215668309?mt=8">
          <div className="applink-button">
            <LogoAppStore width="20" height="20" />
            <span>App Store</span>
          </div>
        </a>
        <a href="https://play.google.com/store/apps/details?id=com.wafflestudio.snutt2.live&hl=ko">
          <div className="applink-button">
            <LogoPlayStore width="20" height="20" />
            <span>Google Play</span>
          </div>
        </a>
      </div>
      <div id="applink-close" onClick={close}>
        모바일 웹으로 보기
      </div>
    </div>
  </Modal>
);

export default AppLink;
