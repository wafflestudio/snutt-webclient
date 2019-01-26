import React, { Component } from 'react';
import { fetchMessages } from '../../../actions/notification';
import Loading from 'react-loading';
import PropTypes from 'prop-types';

import IconTimetable from 'assets/notice-timetable.svg';
import IconTrash from 'assets/notice-trash.svg';
import IconUpdate from 'assets/notice-update.svg';
import IconWarning from 'assets/notice-warning.svg';

class NotificationMessages extends Component {
  static formatDate(dateString) {
    const dateObject = new Date(Date.parse(dateString));
    const year = dateObject.getFullYear();
    const month = dateObject.getMonth();
    const date = dateObject.getDate();
    return `${year}년 ${month + 1}월 ${date}일`;
  }

  static renderIcon(type) {
    let icon = null;
    switch (type) {
      case 1: // coursebook
        icon = <IconTimetable />;
        break;
      case 2: // lecture_update
        icon = <IconUpdate />;
        break;
      case 3: // lecture_remove
        icon = <IconTrash />;
        break;
      default:
        icon = <IconWarning />;
    }
    return icon;
  }

  constructor(props) {
    super(props);
    this.handleScroll = this.handleScroll.bind(this);
    this.renderMessages = this.renderMessages.bind(this);
    this.renderLoading = this.renderLoading.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }

  componentDidMount() {
    this.node.addEventListener('scroll', this.handleScroll);
    document.addEventListener('click', this.handleClickOutside, false);
  }
  componentWillUnmount() {
    this.node.addEventListener('scroll', this.handleScroll);
    document.removeEventListener('click', this.handleClickOutside, false);
  }

  handleClickOutside(e) {
    if (!this.node.contains(e.target)) {
      this.props.closeMessageBox();
    }
  }

  handleScroll() {
    const node = this.node;
    const { scrollTop, scrollHeight, clientHeight } = node;
    if (scrollTop + clientHeight == scrollHeight) {
      this.props.askMore();
    }
  }

  renderMessages() {
    const { messages } = this.props;
    return (
      <div className="snutt__noti-scrollarea" onClick={this.handleClick}>
        {messages.map((v, i) => (
          <div key={i} className="snutt__noti-message">
            <div className="snutt__noti-icon">
              {NotificationMessages.renderIcon(v.type)}
            </div>
            <div className="snutt__noti-content">
              <span
                className="snutt__noti-body"
                dangerouslySetInnerHTML={{ __html: v.message }}
              />{' '}
              <span className="snutt__noti-date">
                {NotificationMessages.formatDate(v.created_at)}
              </span>
            </div>
          </div>
        ))}
      </div>
    );
  }

  renderLoading() {
    return <div>{this.props.fetching ? Loading : ''}</div>;
  }

  render() {
    return (
      <div
        id="snutt__noti-box"
        ref={node => {
          this.node = node;
        }}
      >
        {this.renderMessages()}
        {this.renderLoading()}
      </div>
    );
  }
}

NotificationMessages.propTypes = {
  messages: PropTypes.arrayOf(PropTypes.object),
  fetching: PropTypes.bool,
  askMore: PropTypes.func,
};

export default NotificationMessages;
