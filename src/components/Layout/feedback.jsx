import React, { Component } from "react";
import { connect } from "react-redux";
import { push } from "react-router-redux";

import { leaveFeedback } from "../../actions/userActions";

class FeedbackForm extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      content: ""
    };
  }

  handleEmailChange = e => this.setState({ email: e.target.value });
  handleContentChange = e => this.setState({ content: e.target.value });
  handleSubmit = e => {
    e.preventDefault();
    leaveFeedback(this.state.email, this.state.content, () =>
      this.props.dispatch(push("/"))
    );
  };

  render() {
    return (
      <div className="container" style={{ maxWidth: "600px" }}>
        <h1>피드백을 남겨주세요</h1>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label>이메일(선택)</label>
            <input
              type="email"
              className="form-control"
              placeholder="Email"
              value={this.state.email}
              onChange={this.handleEmailChange}
            />
          </div>
          <div className="form-group">
            <label>내용</label>
            <textarea
              type="textarea"
              placeholder="버그, 개선사항 등등"
              className="form-control"
              rows="3"
              value={this.state.content}
              onChange={this.handleContentChange}
            />
          </div>
          <button type="submit" className="btn btn-default">
            확인
          </button>
        </form>
      </div>
    );
  }
}

export default connect()(FeedbackForm);
