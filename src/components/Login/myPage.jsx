import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import FBLogin from 'react-facebook-login';

import {
  logout,
  deleteAccount,
  attachFacebook,
  detachFacebook,
  attachLocal,
  changePassword,
} from '../../actions/userActions';
import { fbAppId } from '../../config';

const mapStateToProps = state => {
  const { user } = state;
  return { ...user };
};

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logout()),
  deleteAccount: () => dispatch(deleteAccount()),
  attachFacebook: (id, accessToken) =>
    dispatch(attachFacebook(id, accessToken)),
  detachFacebook: () => dispatch(detachFacebook()),
  attachLocal: (id, pass, callback) =>
    dispatch(attachLocal(id, pass, callback)),
  changePassword: (oldPass, newPass, callback) =>
    dispatch(changePassword(oldPass, newPass, callback)),
});

class MyPage extends Component {
  handleDelete = () => {
    if (window.confirm('정말 탈퇴하시겠습니까?')) {
      this.props.deleteAccount();
    }
  };

  handlePasswordChange = e => {
    e.preventDefault();
    const oldPass = this.oldPass.value;
    const newPass = this.newPass.value;
    const newPassConfirm = this.newPassConfirm.value;
    if (newPass !== newPassConfirm) {
      alert('비밀번호를 다시 확인해주세요');
      return;
    }
    this.props.changePassword(oldPass, newPass, () => {
      alert('비밀번호가 변경되었습니다');
      this.oldPass.value = '';
      this.newPass.value = '';
      this.newPassConfirm.value = '';
    });
  };

  handleFacebookAttach = ({ id, accessToken }) => {
    this.props.attachFacebook(id, accessToken);
  };

  handleAttachLocalAccount = e => {
    e.preventDefault();
    const newId = this.newId.value;
    const newPass = this.newPass.value;
    const newPassConfirm = this.newPassConfirm.value;
    if (newPass !== newPassConfirm) {
      alert('비밀번호를 다시 확인해주세요');
      return;
    }
    this.props.attachLocal(newId, newPass, () => {
      alert('아이디와 비밀번호가 등록되었습니다');
      this.context.router.push('/');
    });
  };

  renderLocalAccountManager = () => {
    const { info } = this.props;
    if (info.local_id) {
      // User had id and password
      return (
        <div>
          <div className="form-group">
            <label className="col-xs-4" />
            <div className="col-xs-8" id="local-id">
              SNUTT 아이디는 <strong>{info.local_id}</strong>입니다
            </div>
          </div>
          <div className="form-group">
            <label className="col-xs-4">비밀번호 관리</label>
            <div className="col-xs-8">
              <form onSubmit={this.handlePasswordChange}>
                <input
                  className="form-control"
                  type="password"
                  placeholder="현재 비밀번호"
                  ref={oldPass => {
                    this.oldPass = oldPass;
                  }}
                  required
                />
                <input
                  className="form-control"
                  type="password"
                  placeholder="새 비밀번호"
                  ref={newPass => {
                    this.newPass = newPass;
                  }}
                  required
                  pattern="^(?=.*\d)(?=.*[a-z])\S{6,20}$"
                  title="비밀번호는 영문자, 숫자가 조합된 6자 이상 20자 이하여야 합니다"
                />
                <input
                  className="form-control"
                  type="password"
                  placeholder="새 비밀번호 확인"
                  ref={newPassConfirm => {
                    this.newPassConfirm = newPassConfirm;
                  }}
                  required
                  pattern="^(?=.*\d)(?=.*[a-z])\S{6,20}$"
                  title="비밀번호는 영문자, 숫자가 조합된 6자 이상 20자 이하여야 합니다"
                />
                <input
                  className="btn primary passchange"
                  type="submit"
                  value="변경하기"
                />
              </form>
            </div>
          </div>
        </div>
      );
    } // Nope => Make local Id
    return (
      <div className="form-group">
        <label className="col-xs-4">아이디 만들기</label>
        <div className="col-xs-8">
          <form onSubmit={this.handleAttachLocalAccount}>
            <input
              ref={newId => {
                this.newId = newId;
              }}
              pattern="[a-z0-9]{4,32}"
              required
              title="아이디는 4자 이상 32자 이하의 영소문자와 숫자로 만들어주세요"
              className="form-control"
              placeholder="아이디"
            />
            <input
              className="form-control"
              type="password"
              ref={newPass => {
                this.newPass = newPass;
              }}
              pattern="^(?=.*\d)(?=.*[a-z])\S{6,20}$"
              required
              title="비밀번호는 영문자, 숫자가 조합된 6자 이상 20자 이하여야 합니다"
              placeholder="비밀번호"
            />
            <input
              type="password"
              ref={newPassConfirm => {
                this.newPassConfirm = newPassConfirm;
              }}
              pattern="^(?=.*\d)(?=.*[a-z])\S{6,20}$"
              required
              title="비밀번호는 영문자, 숫자가 조합된 6자 이상 20자 이하여야 합니다"
              className="form-control"
              placeholder="비밀번호 확인"
            />
            <input
              className="btn primary passchange"
              type="submit"
              value="아이디/비밀번호 만들기"
            />
          </form>
        </div>
      </div>
    );
  };

  renderFacebookManager = () => {
    const { info } = this.props;
    if (info.fb_name) {
      return (
        <button className="btn login-fb" onClick={this.props.detachFacebook}>
          페이스북 연동 해지하기
        </button>
      );
    }
    return (
      <FBLogin
        appId={fbAppId}
        autoload
        callback={this.handleFacebookAttach}
        cssClass="btn login-fb"
        textButton="페이스북 연동하기"
      />
    );
  };

  render() {
    return (
      <div className="snutt__setting">
        <div className="row">
          <div className="form-horizontal">
            <h2>내 정보</h2>
            {this.renderLocalAccountManager()}
            <br />
            <div className="form-group">
              <label className="col-xs-4">페이스북</label>
              <div className="col-xs-8">{this.renderFacebookManager()}</div>
            </div>
            <div className="form-group">
              <label className="col-xs-4">로그아웃</label>
              <div className="col-xs-8">
                <button
                  data-cy="my-logout"
                  className="btn btn-default"
                  onClick={this.props.logout}
                >
                  로그아웃하기
                </button>
              </div>
            </div>
            <div className="form-group">
              <label className="col-xs-4">회원 탈퇴</label>
              <div className="col-xs-8">
                <button
                  className="btn withdrawl"
                  onClick={this.handleDelete}
                  data-cy="my-unregister"
                >
                  탈퇴하기
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

MyPage.contextTypes = {
  router: PropTypes.object.isRequired,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MyPage);
