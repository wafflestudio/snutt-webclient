import React, { Component } from 'react';
import { Link } from 'react-router'
import { connect } from 'react-redux'
import FBLogin from 'react-facebook-login'
import Input from './input.jsx'
import { loginLocal, loginFacebook, registerUser } from '../../actions/userActions'
import { fbAppId } from '../../samples/sampleKey'

class Login extends Component {
  constructor() {
    super()
    this.state = {
      id: '',
      password: '',
      passwordAgain: '',
      valid: {
        id: true,
        password: true,
        passwordAgain: true,
      }
    }
    this.handleUpdate = this.handleUpdate.bind(this)
    this.handleLogin = this.handleLogin.bind(this)
    this.responseFB = this.responseFB.bind(this)
    this.validator = this.validator.bind(this)
    this.renderError = this.renderError.bind(this)
  }

  validator(which, input) {
    const regex = {
      id: txt => /^[a-z0-9]{4,32}$/i.test(txt),
      password: txt => /^(?=.*\d)(?=.*[a-z])\S{6,20}$/i.test(txt),
      passwordAgain: txt => txt == this.state.password
    }
    return regex[which](input)
  }

  handleUpdate(where, e) {
    const val = e.target.value
    const ok = this.validator(where, val)
    this.setState({
      [where]: val,
      valid: Object.assign({}, this.state.valid, {
        id: this.validator('id', )
      })
    })
  }

  handleLogin(e) {
    e.preventDefault()
    this.props.dispatch(loginLocal(this.state.id, this.state.password))
  }

  responseFB(response) {
    this.props.dispatch(loginFacebook(response.id, response.accessToken))
  }

  renderError() {
    const messages = {
      id: "아이디는 4자 이상 32자 이하의 알파벳과 숫자로 구성되어야 합니다",
      password: "비밀번호는 영문자를 하나 포함하고 6자 이상 20자 이하여야 합니다",
      passwordAgain: "비밀번호를 다시 확인해주세요",
    }
    const validities = this.state.valid
    return Object.keys(validities).filter(k => !validities[k]).map((val, idx) =>
      <p key={idx}>{messages[val]}</p>
    )
  }

  render() {
    const { user } = this.props
    const { id: goodId, password: goodPass, passwordAgain: goodPassConfirm } = this.state.valid
    const isRegistering = this.state.passwordAgain.length > 0
    const canJoin = isRegistering && goodId && goodPass && goodPassConfirm
    const canLogin = this.state.id.length > 0 && this.state.password.length > 0

    return (
      <div className='login-box'>
        <h1 className="title">시작하기</h1>
        <div className='input-row'>
          <Input
            inputProps={{
              placeholder: '아이디',
              type: 'id',
              tabIndex: 1,
              value: this.state.id,
              onChange: this.handleUpdate.bind(this, 'id'),
            }}
            isInvalid={isRegistering && !this.state.valid.id}
          />
        </div>
        <div className='input-row'>
          <Input
            inputProps={{
              placeholder: '비밀번호',
              type: 'password',
              tabIndex: 2,
              value: this.state.password,
              onChange: this.handleUpdate.bind(this, 'password'),
            }}
            isInvalid={isRegistering && !this.state.valid.password}
          />
          <div
            className='button login'
            onClick={this.handleLogin}
          >
            로그인
          </div>
          <Link to='/findPassword'>
            <small className='find-password'>비밀번호 찾기</small>
          </Link>
        </div>
        <div className='warning'>
          {isRegistering ? this.renderError() : null}
        </div>
        <div className='input-row'>
          <Input
            groupClassName='new-password-input'
            inputProps={{
              placeholder: '비밀번호 확인',
              type: 'password',
              tabIndex: 3,
              value: this.state.passwordAgain,
              onChange: this.handleUpdate.bind(this, 'passwordAgain'),
            }}
            isInvalid={isRegistering && !this.state.valid.passwordAgain}
          />
          <div
            className={`button ${ canJoin ? 'join' : ''}`}
          >
            회원가입
          </div>
        </div>
        <hr />
        <div className='sns-group'>
          <FBLogin
            appId={fbAppId}
            autoload
            callback={this.responseFB}
            icon="fa-facebook"
          >
          </FBLogin>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { user: state.user }
}

export default connect(mapStateToProps)(Login)
