import React, { Component } from 'react'
import { connect } from 'react-redux'
import { logout, deleteAccount, attachFacebook, detachFacebook
} from '../../actions/userActions'
import FBLogin from 'react-facebook-login'
import { fbAppId } from '../../samples/sampleKey'

class MyPage extends Component {
  constructor() {
    super()
    this.handleFacebookAttach = this.handleFacebookAttach.bind(this)
    this.handleFacebookDetach = this.handleFacebookDetach.bind(this)
    this.handleLogout = this.handleLogout.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
    this.renderManageFacebook = this.renderManageFacebook.bind(this)
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
            <form className="form-horizontal">
              <div className="form-group">
                <label className="col-sm-3">로그아웃</label>
                <div className="col-sm-9">
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
                <label className="col-sm-3">비밀번호 변경</label>
                <div className="col-sm-6">
                  <input type="password" className="form-control" placeholder="Type new password" />
                  <input type="password" className="form-control" placeholder="..., again" />
                  <button className="btn btn-warning">비밀번호 바꾸기</button>
                </div>
              </div>
              <br />
              <div className="form-group">
                <label className="col-sm-3">페이스북 연동</label>
                <div className="col-sm-6">
                  {this.renderManageFacebook()}
                </div>
              </div>
              <div className="form-group">
                <label className="col-sm-3">회원 탈퇴</label>
                <div className="col-sm-9">
                  <button
                    className="btn btn-danger"
                    onClick={this.handleDelete}
                  >
                    계정 삭제
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  const { user } = state
  return {...user}
}

export default connect(mapStateToProps)(MyPage)
