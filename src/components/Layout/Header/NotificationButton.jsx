import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchMessages, openMessageBox, closeMessageBox } from '../../../actions/notification';
// import { changeCoursebook } from '../../actions/fetchingActions'
import NotificationMessages from './NotificationMessages.jsx';
import AlarmIcon from '../../../../assets/ic-alarm.svg';

const AMOUNT_PER_REQUEST = 10;

class NotificationButton extends Component {
  constructor(props) {
    super(props);
    this.handleUpdate = this.handleUpdate.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleUpdate() {
    const { dispatch, messages } = this.props;
    dispatch(fetchMessages(AMOUNT_PER_REQUEST, messages.length));
  }

  handleBlur(e) {
    console.log('on blur');
    const { dispatch, opened, messages } = this.props;
    if (opened) { dispatch(closeMessageBox()); }
  }

  handleClick(e) {
    const { dispatch, opened, messages } = this.props;
    if (opened) { // let's close
      dispatch(closeMessageBox());
    } else { // let's open
      if (messages.length === 0) // Fetching initial data
        { dispatch(fetchMessages(AMOUNT_PER_REQUEST, 0)); }
      dispatch(openMessageBox());
    }
  }

  render() {
    const { opened, hasNew, fetching, messages } = this.props;
    return (
      <div
        id="snutt__noti-wrapper"
        onBlur={this.handleBlur}
        tabIndex={0}
      >
        { hasNew ?
          <AlarmIcon
            id="noti"
            onClick={this.handleClick}
            ref={icon => this.icon = icon}
          /> :
          <AlarmIcon
            id="noti"
            onClick={this.handleClick}
            ref={icon => this.icon = icon}
          />
        }
        { opened ?
          <NotificationMessages
            messages={messages}
            fetching={fetching}
            askMore={this.handleUpdate}
          /> :
          null
        }
      </div>
    );
  }
}


const mapStateToProps = (state) => {
  const { notification } = state;
  return { ...notification };
};

export default connect(mapStateToProps)(NotificationButton);
