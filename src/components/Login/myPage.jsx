import React, { Component } from 'react'
import { connect } from 'react-redux'
import { logout, deleteAccount, attachFacebook, detachFacebook, attachLocal,
  changePassword } from '../../actions/userActions'
import FBLogin from 'react-facebook-login'
import { fbAppId } from '../../samples/sampleKey'

const ID_PATTERN = "[a-z0-9]{4,32}"
const PASSWORD_PATTERN = "(?=^.{6,20}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$"

const resetInputValues = (values) => {values.forEach(val => {val = ""})}

class MyPage extends Component {
  constructor() {
    super()
    this.handleFacebookAttach = this.handleFacebookAttach.bind(this)
    this.handleFacebookDetach = this.handleFacebookDetach.bind(this)
    this.handleLogout = this.handleLogout.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
    this.handlePasswordChange = this.handlePasswordChange.bind(this)
    this.handleAttachLocalAccount = this.handleAttachLocalAccount.bind(this)
    this.renderManageFacebook = this.renderManageFacebook.bind(this)
    this.renderManageLocalAccount = this.renderManageLocalAccount.bind(this)
  }

  handleLogout(e) {
    e.preventDefault()
    this.props.dispatch(logout())
  }

  handleDelete(e) {
    e.preventDefault()
    this.props.dispatch(deleteAccount())
  }

  handleFacebookAttach(userFbInfo) {
    const {id, accessToken} = userFbInfo
    this.props.dispatch(attachFacebook(id, accessToken))
  }

  handleFacebookDetach(e) {
    e.preventDefault()
    this.props.dispatch(detachFacebook())
  }

  handlePasswordChange(e) {
    e.preventDefault()
    const oldPass = this.oldPass.value
    const newPass = this.newPass.value
    const newPassConfirm = this.newPassConfirm.value
    if (newPass !== newPassConfirm) {
      alert("비밀번호를 다시 확인해주세요")
      return
    }
    this.props.dispatch(changePassword(oldPass, newPass, () => {
      alert("비밀번호가 변경되었습니다")
      this.oldPass.value = ""
      this.newPass.value = ""
      this.newPassConfirm.value = ""
    }))
  }

  handleAttachLocalAccount(e) {
    e.preventDefault()
    const newId = this.newId.value
    const newPass = this.newPass.value
    const newPassConfirm = this.newPassConfirm.value
    if (newPass !== newPassConfirm) {
      alert("비밀번호를 다시 확인해주세요")
      return;
    }
    this.props.dispatch(attachLocal(newId, newPass, () => {
      alert("아이디와 비밀번호가 등록되었습니다")
      this.context.router.push('/')
    }))
  }

  renderManageLocalAccount() {
    const { info } = this.props
    if (info.local_id) {  // User had id and password요
      return(
        <div>
          <form onSubmit={this.handlePasswordChange}>
            <input
              className="form-control"
              type="password"
              placeholder="기존 비밀번호를 입력해주세요"
              ref={(oldPass) => {this.oldPass = oldPass}}
              required
            />
            <input
              className="form-control"
              type="password"
              placeholder="새 비밀번호를 입력해주세요"
              ref={(newPass) => {this.newPass = newPass}}
              required
              pattern="^(?=.*\d)(?=.*[a-z])\S{6,20}$"
              title="비밀번호는 영문자, 숫자가 조합된 6자 이상 20자 이하여야 합니다"
            />
            <input
              className="form-control"
              type="password"
              placeholder="새 비밀번호를 다시 입력해주세요"
              ref={(newPassConfirm) => {this.newPassConfirm = newPassConfirm}}
              required
              pattern="^(?=.*\d)(?=.*[a-z])\S{6,20}$"
              title="비밀번호는 영문자, 숫자가 조합된 6자 이상 20자 이하여야 합니다"
            />
            <input
              className="btn btn-success"
              type="submit"
              value="비밀번호 바꾸기"
            />
          </form>
        </div>
      )
    } else { // Nope
      return(
        <div>
          <form onSubmit={this.handleAttachLocalAccount}>
            <input
              type="text"
              ref={(newId) => {this.newId = newId}}
              pattern="[a-z0-9]{4,32}"
              required
              title="아이디는 4자 이상 32자 이하의 영소문자와 숫자로 만들어주세요"
              className="form-control"
              placeholder="아이디를 만들어주세요"
            />
            <input
              className="form-control"
              type="password"
              ref={(newPass) => {this.newPass = newPass}}
              pattern="^(?=.*\d)(?=.*[a-z])\S{6,20}$"
              required
              title="비밀번호는 영문자, 숫자가 조합된 6자 이상 20자 이하여야 합니다"
              placeholder="비밀번호를 입력해주세요"
            />
            <input
              type="password"
              ref={(newPassConfirm) => {this.newPassConfirm = newPassConfirm}}
              pattern="^(?=.*\d)(?=.*[a-z])\S{6,20}$"
              required
              title="비밀번호는 영문자, 숫자가 조합된 6자 이상 20자 이하여야 합니다"
              className="form-control"
              placeholder="비밀번호를 다시 입력해주세요"
            />
            <input
              className="btn btn-success"
              type="submit"
              value="아이디/비밀번호 만들기"
            >
            </input>
          </form>
        </div>
      )
    }
  }

  renderManageFacebook() {
    const { info } = this.props
    if (info.fb_name)
      return (
        <button
          className="btn btn-warning"
          onClick={this.handleFacebookDetach}
        >
          페이스북 연동 해지하기
        </button>
      )
    else
      return (
        <FBLogin
          appId={fbAppId}
          autoload
          callback={this.handleFacebookAttach}
          cssClass='btn login-fb'
          icon='fa-facebook'
        />
      )
  }

  render() {
    return(
      <div className="container snutt__setting">
        <div className="row">
          <div className="col-md-6 col-md-offset-3">
            <div className="form-horizontal">
              <div className="form-group">
                <label className="col-sm-4">로그아웃</label>
                <div className="col-sm-8">
                  <button
                    className="btn btn-default"
                    onClick={this.handleLogout}
                  >
                    로그아웃 하기
                  </button>
                </div>
              </div>
              <br />
              <div className="form-group new-password">
                <label className="col-sm-4">{`아이디/비밀번호 관리`}</label>
                <div className="col-sm-6">
                  {this.renderManageLocalAccount()}
                </div>
              </div>
              <br />
              <div className="form-group">
                <label className="col-sm-4">페이스북 연동</label>
                <div className="col-sm-6">
                  {this.renderManageFacebook()}
                </div>
              </div>
              <div className="form-group">
                <label className="col-sm-4">회원 탈퇴</label>
                <div className="col-sm-8">
                  <button
                    className="btn btn-danger"
                    onClick={this.handleDelete}
                  >
                    계정 삭제
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

MyPage.contextTypes = {
  router: React.PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
  const { user } = state
  return {...user}
}

export default connect(mapStateToProps)(MyPage)
