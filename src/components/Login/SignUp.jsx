import React, { Component } from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import { registerUser } from '../../actions/userActions'

const Input =
  ({type, fieldDisplayName, value, changeHandler, isValid, errorMessage}) => {
    var className = value.length > 0 ? 'typed' : ''
    if (!isValid && value.length > 0)
      className += ' invalid'
    else if (isValid)
      className += ' valid'
    return (
      <div className='snutt__inputWrapper signup'>
        <input
          className={className}
          onChange={changeHandler}
          placeholder={fieldDisplayName}
          value={value}
          type={type}
        />
        <div className='snutt__labelWrapper'>
          {fieldDisplayName}
        </div>
        <div className='snutt__inputError'>
          {errorMessage}
        </div>
      </div>
    )
  }

class SignUp extends Component {
  constructor() {
    super()
    this.state = {
      id: '',
      pass: '',
      passAgain: '',
      idValid: false,
      passValid: false,
      passAgainValid: false,
    }
    this.handleRegister = this.handleRegister.bind(this)
  }

  handleIdChange = e => {
    const input = e.target.value
    const validator = /^[a-z0-9]{4,32}$/i
    this.setState({
      id: input,
      idValid: validator.test(input),
    })
  }
  handlePassChange = e => {
    const input = e.target.value
    const validator = /^(?=.*\d)(?=.*[a-z])\S{6,20}$/i
    this.setState({
      pass: input,
      passValid: validator.test(input),
    })
  }
  handlePassAgainChange = e => {
    const input = e.target.value
    const { pass, passValid } = this.state
    const validator = passAgain => (passAgain == pass && passValid)
    this.setState({
      passAgain: input,
      passAgainValid: validator(input),
    })
  }

  handleRegister = e => {
    e.preventDefault()
    this.props.dispatch(registerUser(this.state.id, this.state.pass))
  }

  render() {
    const { user } = this.props
    const { id, pass, passAgain, idValid, passValid, passAgainValid } = this.state
    const canRegister = idValid && passValid && passAgainValid
    return (
      <div className='container'>
        <div className='col-md-4 col-md-offset-4'>
          <div className='snutt__login'>
            <h2>회원가입</h2>
            <Input
              type='id'
              fieldDisplayName='아이디'
              value={id}
              changeHandler={this.handleIdChange}
              isValid={idValid}
              errorMessage='아이디는 4자 이상 32자 이하의 알파벳과 숫자로 구성되어야 합니다'
            />
            <Input
              type='password'
              fieldDisplayName='비밀번호'
              value={pass}
              changeHandler={this.handlePassChange}
              isValid={passValid}
              errorMessage='비밀번호는 영문자, 숫자가 조합된 6자 이상 20자 이하여야 합니다'
            />
            <Input
              type='password'
              fieldDisplayName='비밀번호 확인'
              value={passAgain}
              changeHandler={this.handlePassAgainChange}
              isValid={passAgainValid}
              errorMessage='비밀번호를 다시 확인해주세요'
            />
            <div className='error'>
              {user.errorType == 'register' ? user.message: <br />}
            </div>
            <div className='buttons-wrapper'>
              {canRegister ?
                <div
                  className='btn signup'
                  onClick={this.handleRegister}
                >
                  회원가입
                </div> :
                <div className='btn'>회원가입</div>
              }
            </div>
          </div>
        </div>
      </div>
    )
  }

}

const mapStateToProps = (state) => ({ user: state.user })

export default connect(mapStateToProps)(SignUp)
