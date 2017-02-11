import React, { Component } from 'react';
import { connect } from 'react-redux'
import { fetchMessages } from '../../actions/notification'
// import { changeCoursebook } from '../../actions/fetchingActions'

class NotificationBox extends Component {
  constructor(props) {
    super(props)
    this.handleScroll = this.handleScroll.bind(this)
  }

  componentDidMount() {
    this.node.addEventListener('scroll', this.handleScroll)
  }

  componentWillUnmount() {
    this.node.addEventListener('scroll', this.handleScroll)
  }

  handleScroll() {
    const node = this.getDOMNode();
    const { scrollTop, scrollHeight } = node
    console.log(scrollTop, scrollHeight)
  }

  renderMessages() {
    <div>Messages will be rendered here</div>
  }

  renderNotification() {
    <div>
      {this.props.fetching ? Loading:''}
    </div>
  }

  render() {
    return (
      <div
        className="messageWrapper"
        ref={(node) => {this.node = node}}
      >
        {this.renderMessages()}
        {this.renderNotification()}
      </div>
    )
  }
}

NotificationBox.propTypes = {
  opened: React.PropTypes.bool,
  hasNew: React.PropTypes.bool,
  messages: React.PropTypes.arrayOf(React.PropTypes.object),
  fetching: React.PropTypes.bool,
  offset: React.PropTypes.number,
}

const mapStateToProps = (state) => (state.notification)

export default connect(mapStateToProps)(NotificationBox)
