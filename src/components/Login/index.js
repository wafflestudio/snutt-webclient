import React, { Component } from 'react';

export default class Login extends Component {
  render() {
    return (
      <div className='login-box'>
        <h1 className="title">시작하기</h1>
        <div className='login-group'>
          <span className='label return-user'>내 계정으로</span>
          <input
            className='email'
            placeholder='메일주소'
            type='email'
          />
        </div>
        <div className='login-group'>
          <input
            className='password'
            type='password'
            placeholder='비밀번호'
          />
          <div className='button login'>로그인</div>
        </div>
        <small className='find-password'>비밀번호 찾기</small>
        <div className='login-group'>
          <span className='label new-user'>새 계정으로</span>
          <input
            className='password'
            type='password'
            placeholder='비밀번호 확인'
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
