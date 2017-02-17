import React, { Component } from 'react';
import { connect } from 'react-redux'
import { fetchMessages, toggleMessageBox } from '../../actions/notification'
// import { changeCoursebook } from '../../actions/fetchingActions'
import NotificationMessages from './NotificationMessages.jsx'

const AMOUNT_PER_REQUEST = 10

class NotificationButton extends Component {
  constructor(props) {
    super(props)
    this.handleUpdate = this.handleUpdate.bind(this)
    this.closeBox = this.closeBox.bind(this)
    this.toggleBox = this.toggleBox.bind(this)
  }

  handleUpdate() {
    const { dispatch, messages } = this.props
    dispatch(fetchMessages(AMOUNT_PER_REQUEST, messages.length))
  }

  closeBox(e) {
    console.log("ON BLUR")
    this.icon.blur()
    this.toggleBox()
  }

  toggleBox(e) {
    const { dispatch, opened, messages } = this.props
    if (!opened && messages.length === 0) // Load first set of messages
      dispatch(fetchMessages(AMOUNT_PER_REQUEST, 0))
    dispatch(toggleMessageBox())
  }

  render() {
    const { opened, hasNew, fetching, messages } = this.props
    return (
      <a
        id="snutt__noti-icon"
        className="glyphicon glyphicon-comment"
        aria-hidden="true"
        onBlur={this.closeBox}
        onClick={this.toggleBox}
        ref={(icon) => this.icon = icon}
        tabIndex={1}
      >
        { hasNew ? <div id="snutt__noti-new"></div> : null }
        { opened ?
          <NotificationMessages
            messages={messages}
            fetching={fetching}
            askMore={this.handleUpdate}
          /> :
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
