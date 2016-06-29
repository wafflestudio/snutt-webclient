import React, { Component } from 'react';
import { Link } from 'react-router'
import Input from './input.jsx'

export default class Login extends Component {
  constructor() {
    super()
    this.state = {
      password: '',
    }
  }
  render() {
    return (
      <div className='login-box'>
        <h1 className="title">시작하기</h1>
        <div className='input-row'>
          <Input
            inputProps={{
              placeholder: '메일주소',
              type: 'email',
              tabIndex: 1,
            }}
          />
        </div>
        <div className='input-row'>
          <Input
            inputProps={{
              placeholder: '비밀번호',
              type: 'password',
              tabIndex: 2,
            }}
          />
          <div className='button login'>로그인</div>
          <Link to='/findPassword'>
            <small className='find-password'>비밀번호 찾기</small>
          </Link>
        </div>
        <div className='input-row warning'>
        </div>
        <div className='input-row'>
          <Input
            groupClassName='new-password-input'
            inputProps={{
              placeholder: '새 비밀번호',
              type: 'password',
              tabIndex: 3,
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
