import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchMessages, openMessageBox, closeMessageBox } from '../../../actions/notification';
import NotificationMessages from './NotificationMessages.jsx';

import IconWrapper from '../../Common/IconWrapper.jsx';
import AlarmIconNormal from '../../../../assets/ic-alarm-normal.svg';
import AlarmIconHovered from '../../../../assets/ic-alarm-over.svg';
import AlarmIconFoucsed from '../../../../assets/ic-alarm-pressed.svg';

const AMOUNT_PER_REQUEST = 10;

const mapStateToProps = (state) => {
  const { notification } = state;
  return { ...notification };
};

const mapDispatchToProps = dispatch => ({
  updateMessage: offset => dispatch(fetchMessages(AMOUNT_PER_REQUEST, offset)),
  openMessageBox: () => dispatch(openMessageBox()),
  closeMessageBox: () => dispatch(closeMessageBox()),
});

class NotificationButton extends Component {
  constructor(props) {
    super(props);
    this.handleUpdate = this.handleUpdate.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleUpdate() {
    const { updateMessage, messages } = this.props;
    updateMessage(messages.length);
  }

  handleClick(e) {
    const { opened, messages, updateMessage } = this.props;
    if (opened) { // let's close
      this.props.closeMessageBox();
    } else { // let's open
      if (messages.length === 0) { // Fetching initial data
        updateMessage(0);
      }
      this.props.openMessageBox();
    }
  }

  render() {
    const { opened, hasNew, fetching, messages } = this.props;
    return (
      <div
        id="snutt__noti-wrapper"
        ref={(modal) => { this.modal = modal; }}
      >
        <IconWrapper
          onClick={this.handleClick}
          className="noti-icon"
          normalIcon={<AlarmIconNormal />}
          hoveredIcon={<AlarmIconHovered />}
          focusedIcon={<AlarmIconFoucsed />}
          focused={opened}
        />
        { opened ? // 원래  opened
          <NotificationMessages
            messages={messages}
            fetching={fetching}
            askMore={this.handleUpdate}
            closeMessageBox={this.props.closeMessageBox}
          /> :
          null
        }
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NotificationButton);
