import React, { Component } from 'react';
import { Link } from 'react-router'
import { connect } from 'react-redux'
import FBLogin from 'react-facebook-login'
import { loginLocal, loginFacebook } from '../../actions/userActions'
import { fbAppId } from '../../samples/sampleKey'

const mapStateToProps = (state) => ({user: state.user })

const mapDispatchToProps = dispatch => ({
  loginLocal: (id, password, keepLogin) => dispatch(loginLocal(id, password, keepLogin)),
  loginFacebook: (id, accessToken, name) => dispatch(loginFacebook(id, accessToken, name)),
})

class Login extends Component {
  constructor() {
    super()
    this.state = {
      id: '',
      password: '',
      keepLogin: false,
    }
    this.handleLogin = this.handleLogin.bind(this)
    this.handleFacebookLogin = this.handleFacebookLogin.bind(this)
  }

  handleIdChange = e => { this.setState({ id: e.target.value }) }
  handlePassChange = e => { this.setState({ password: e.target.value }) }
  handleKeepLoginChange = e => {
    this.setState({ keepLogin: !this.state.keepLogin })
  }

  handleLogin(e) {
    e.preventDefault()
    const {id, password, keepLogin} = this.state
    this.props.loginLocal(id, password, keepLogin)
  }

  handleFacebookLogin(response) {
    const {id, accessToken, name} = response
    this.props.loginFacebook(id, accessToken, name)
  }

  render() {
    const { id, password, keepLogin } = this.state
    const { user } = this.props
    return (
      <div className='container'>
        <div className='col-md-4 col-md-offset-4'>
          <form className='snutt__login' onSubmit={this.handleLogin}>
            <h2>시작하기</h2>
            <div className='snutt__inputWrapper'>
              <input
                className={id.length > 0 ? 'typed' : ''}
                onChange={this.handleIdChange}
                placeholder='아이디'
                value={this.state.id}
                type='id'
              />
              <div className='snutt__labelWrapper'>
                아이디
              </div>
            </div> {/** End of inputWrapper */}
            <div className='snutt__inputWrapper'>
              <input
                className={password.length > 0 ? 'typed' : ''}
                onChange={this.handlePassChange}
                placeholder='비밀번호'
                value={this.state.password}
                type='password'
              />
              <div className='snutt__labelWrapper'>
                비밀번호
              </div>
              <div id='snutt__findPass'>
                <Link to='/findPassword'>비밀번호 찾기</Link>
              </div>
            </div> {/** End of inputWrapper */}

            <label id='keep-login'>
              <input
                onChange={this.handleKeepLoginChange}
                type='checkbox'
                value={this.state.keepLogin}
              />
                {' '}로그인 유지
            </label>
            <div className='error'>
              {user.errorType == 'login' ? user.message: <br />}
            </div>
            <div className='buttons-wrapper'>
              <button
                type="submit"
                className='btn login'
              >
                로그인
              </button>
              <FBLogin
                appId={fbAppId}
                autoload
                callback={this.handleFacebookLogin}
                cssClass='btn login-fb'
                textButton="facebook으로 로그인"
              />
              <Link to='/signup'>
                <div
                  className='btn join'
                >
                  회원가입
                </div>
              </Link>
            </div>
          </form> {/** End of snut__login */}
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
