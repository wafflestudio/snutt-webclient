import React, { Component } from 'react'
import { connect } from 'react-redux'
import { logout } from '../../actions/userActions'

class MyPage extends Component {
  constructor() {
    super()
    this.handleLogout = this.handleLogout.bind(this)
  }

  handleLogout(e) {
    e.preventDefault()
    this.props.dispatch(logout())
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
                <label className="col-sm-3">회원 탈퇴</label>
                <div className="col-sm-9">
                  <button className="btn btn-danger">계정 삭제</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default connect()(MyPage)
