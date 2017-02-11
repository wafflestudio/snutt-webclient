import React, { Component } from 'react';
import { connect } from 'react-redux'
import { fetchMessages, toggleMessageBox } from '../../actions/notification'
// import { changeCoursebook } from '../../actions/fetchingActions'

class NotificationButton extends Component {
  constructor(props) {
    super(props)
    this.toggleBox = this.toggleBox.bind(this)
  }

  toggleBox(e) {
    const { dispatch, opened } = this.props
    dispatch(toggleMessageBox())
  }

  render() {
    console.log(this.props)
    const { opened } = this.props
    return (
      <a
        id="snutt__noti-icon"
        className="glyphicon glyphicon-comment"
        aria-hidden="true"
        tabIndex={1}
        onBlur={this.toggleBox}
        onClick={this.toggleBox}
      >
        { opened ?
          <div id="snutt__noti-box">
          </div> :
          null
        }
      </a>
    )
  }
}



const mapStateToProps = (state) => {
  const { notification } = state
  return {...notification}
}

export default connect(mapStateToProps)(NotificationButton)
