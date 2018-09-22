import React, { Component } from 'react';
import { connect } from 'react-redux';

import RuledInput from './RuledInput.jsx';
import { registerUser } from '../../actions/userActions';

const mapStateToProps = state => ({ user: state.user });

const mapDispatchToProps = dispatch => ({
  registerUser: (id, pass) => dispatch(registerUser(id, pass)),
});

class SignUp extends Component {
  constructor() {
    super();
    this.state = {
      id: '',
      pass: '',
      passAgain: '',
      idValid: false,
      passValid: false,
      passAgainValid: false,
    };
    this.handleRegister = this.handleRegister.bind(this);
  }

  handleIdChange = (e) => {
    const input = e.target.value;
    const validator = /^[a-z0-9]{4,32}$/i;
    this.setState({
      id: input,
      idValid: validator.test(input),
    });
  };

  handlePassChange = (e) => {
    const input = e.target.value;
    const validator = /^(?=.*\d)(?=.*[a-z])\S{6,20}$/i;
    this.setState({
      pass: input,
      passValid: validator.test(input),
    });
  };

  handlePassAgainChange = (e) => {
    const input = e.target.value;
    const { pass, passValid } = this.state;
    const validator = passAgain => passAgain == pass && passValid;
    this.setState({
      passAgain: input,
      passAgainValid: validator(input),
    });
  };

  handleRegister = (e) => {
    e.preventDefault();
    this.props.registerUser(this.state.id, this.state.pass);
  };

  render() {
    const { user } = this.props;
    const { id, pass, passAgain, idValid, passValid, passAgainValid } = this.state;
    const canRegister = idValid && passValid && passAgainValid;
    return (
      <div className="snutt__login">
        <form onSubmit={this.handleRegister}>
          <h2>회원가입</h2>
          <RuledInput
            type="id"
            fieldDisplayName="아이디"
            value={id}
            changeHandler={this.handleIdChange}
            isValid={idValid}
            errorMessage="아이디는 4자 이상 32자 이하의 알파벳과 숫자로 구성되어야 합니다"
            testId={'signup-id'}
          />
          <RuledInput
            type="password"
            fieldDisplayName="비밀번호"
            value={pass}
            changeHandler={this.handlePassChange}
            isValid={passValid}
            errorMessage="비밀번호는 영문자, 숫자가 조합된 6자 이상 20자 이하여야 합니다"
            testId={'signup-password'}
          />
          <RuledInput
            type="password"
            fieldDisplayName="비밀번호 확인"
            value={passAgain}
            changeHandler={this.handlePassAgainChange}
            isValid={passAgainValid}
            errorMessage="비밀번호를 다시 확인해주세요"
            testId={'signup-password-validate'}
          />
          {user.errorType ? (
            <div className="error" data-cy="signup-error">
              {user.message}
            </div>
          ) : null}
          <div className="buttons-wrapper">
            <button
              className="btn signup"
              type="submit"
              disabled={!canRegister}
              data-cy="signup-submit"
            >
              가입하기
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
