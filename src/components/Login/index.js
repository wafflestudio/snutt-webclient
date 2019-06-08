import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import FBLogin from 'react-facebook-login';
import { loginLocal, loginFacebook } from 'store/user/actions';
import { fbAppId } from '../../config';

const mapStateToProps = state => ({ user: state.user });

const mapDispatchToProps = dispatch => ({
  loginLocal: (id, password, keepLogin) =>
    dispatch(loginLocal(id, password, keepLogin)),
  loginFacebook: (id, accessToken, name) =>
    dispatch(loginFacebook(id, accessToken, name)),
});

class Login extends Component {
  constructor() {
    super();
    this.state = {
      id: '',
      password: '',
      keepLogin: false,
    };
    this.handleLogin = this.handleLogin.bind(this);
    this.handleFacebookLogin = this.handleFacebookLogin.bind(this);
  }

  handleIdChange = e => {
    this.setState({ id: e.target.value });
  };
  handlePassChange = e => {
    this.setState({ password: e.target.value });
  };
  handleKeepLoginChange = e => {
    this.setState({ keepLogin: !this.state.keepLogin });
  };

  handleLogin(e) {
    e.preventDefault();
    const { id, password, keepLogin } = this.state;
    this.props.loginLocal(id, password, keepLogin);
  }

  handleFacebookLogin(response) {
    const { id, accessToken, name } = response;
    this.props.loginFacebook(id, accessToken, name);
  }

  render() {
    const { id, password } = this.state;
    const { user } = this.props;
    return (
      <div className="snutt__login">
        <form onSubmit={this.handleLogin}>
          <h2>시작하기</h2>
          <div className="snutt__inputWrapper">
            <input
              className={id.length > 0 ? 'typed' : ''}
              onChange={this.handleIdChange}
              data-cy={'login-id'}
              placeholder="아이디"
              value={this.state.id}
              type="id"
            />
          </div>{' '}
          <div className="snutt__inputWrapper">
            <input
              className={password.length > 0 ? 'typed' : ''}
              data-cy="login-password"
              onChange={this.handlePassChange}
              placeholder="비밀번호"
              value={this.state.password}
              type="password"
            />
          </div>{' '}
          <div className="keeplogin" data-cy="login-keep">
            <label className="checkbox-inline">
              <input
                type="checkbox"
                value={this.state.keepLogin}
                onClick={this.handleKeepLoginChange}
              />
              <div>
                <span>로그인 유지</span>
              </div>
            </label>
          </div>
          <div className="error">
            {user.errorType === 'login' ? user.message : <br />}
          </div>
          <div className="buttons-wrapper">
            <button
              type="submit"
              className="btn primary"
              data-cy="login-submit"
            >
              로그인
            </button>
            <FBLogin
              appId={fbAppId}
              autoload
              callback={this.handleFacebookLogin}
              cssClass="btn login-fb"
              textButton="facebook으로 로그인"
            />
            <Link to="/signup">
              <div className="btn join" aria-pressed="true">
                회원가입
              </div>
            </Link>
          </div>
        </form>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Login);
