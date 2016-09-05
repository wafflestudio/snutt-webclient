import React, { Component } from 'react';
import { Link } from 'react-router'
import { connect } from 'react-redux'
import Input from './input.jsx'
import { loginLocal, registerUser } from '../../actions/userActions'

class Login extends Component {
  constructor() {
    super()
    this.state = {
      id: '',
      password: '',
      passwordAgain: '',
    }
    this.handleUpdate = this.handleUpdate.bind(this)
    this.handleLogin = this.handleLogin.bind(this)
  }

  validateId(id) {
    let idRegex = /^[a-z0-9]{4,32}$/i
    return idRegex.test(id)
  }

  validatePassword(pass) {
    let passRegex = /^(?=.*\d)(?=.*[a-z])\S{6,20}$/i
    return passRegex.test(pass)
  }

  handleUpdate(where, e) {
    this.setState({ [where]: e.target.value})
  }

  handleLogin(e) {
    e.preventDefault()
    this.props.dispatch(loginLocal(this.state.id, this.state.password))
  }

  render() {
    const { user } = this.props
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
            validator={this.validateId}
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
          />
          <div className='button login' onClick={this.handleLogin}>로그인</div>
          <Link to='/findPassword'>
            <small className='find-password'>비밀번호 찾기</small>
          </Link>
        </div>
        <div className='input-row warning'>
          {user.message}
        </div>
        <div className='input-row'>
          <Input
            groupClassName='new-password-input'
            inputProps={{
              placeholder: '새 비밀번호',
              type: 'password',
              tabIndex: 3,
              value: this.state.passwordAgain,
              onChange: this.handleUpdate.bind(this, 'passwordAgain'),
            }}
          />
          <div className='button join'>회원가입</div>
        </div>
        <hr />
        <div className='sns-group'>
          <div className='fb button-sns'>f</div>
          <div className='g button-sns'>g</div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { user: state.user }
}

export default connect(mapStateToProps)(Login)
