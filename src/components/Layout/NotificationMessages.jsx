import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchMessages } from '../../actions/notification';
// import { changeCoursebook } from '../../actions/fetchingActions'

class NotificationMessages extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.handleScroll = this.handleScroll.bind(this);
    this.renderMessages = this.renderMessages.bind(this);
    this.renderLoading = this.renderLoading.bind(this);
  }

  componentDidMount() {
    this.node.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    this.node.addEventListener('scroll', this.handleScroll);
  }

  handleClick(e) {
    console.log('message box clicked');
    e.stopPropagation();
  }

  handleScroll() {
    const node = this.node;
    const { scrollTop, scrollHeight, clientHeight } = node;
    if (scrollTop + clientHeight == scrollHeight) {
      this.props.askMore();
    }
  }

  formatDate(dateString) {
    const dateObject = new Date(Date.parse(dateString));
    const year = dateObject.getFullYear();
    const month = dateObject.getMonth();
    const date = dateObject.getDate();
    return `${year}년 ${month + 1}월 ${date}일`;
  }

  renderMessages() {
    const { messages } = this.props;
    return (
      <div
        onClick={this.handleClick}
      >
        {messages.map((v, i) => (
          <div
            key={i}
            className="snutt__noti-message"
          >
            <p className="snutt__noti-body">{v.message}</p>
            <span className="snutt__noti-date">{this.formatDate(v.created_at)}</span>
          </div>
          ))}
      </div>
    );
  }

  renderLoading() {
    return (
      <div>
        {this.props.fetching ? Loading : ''}
      </div>
    );
  }

  render() {
    return (
      <div
        id="snutt__noti-box"
        ref={(node) => { this.node = node; }}
      >
        {this.renderMessages()}
        {this.renderLoading()}
      </div>
    );
  }
}

NotificationMessages.propTypes = {
  messages: React.PropTypes.arrayOf(React.PropTypes.object),
  fetching: React.PropTypes.bool,
  askMore: React.PropTypes.func,
};

export default NotificationMessages;
