import React, { Component } from 'react';

export default class Search extends Component {
  constructor() {
    super()
    this.state = { text: '' }
    this.handleTextChange = this.handleTextChange.bind(this)
  }

  handleTextChange(e) {
    this.setState({ text: e.target.value })
  }

  render() {
    return (<div className="row">
      <div className="input-group col-lg-8 col-lg-offset-1">
        <input type="text"
          className="form-control"
          placeholder="Course name"
          value={this.state.text}
          onChange={this.handleTextChange}/>
        <span className="input-group-btn">
          <button type="submit" className="btn btn-default" value="Post">
            <span className="glyphicon glyphicon-search" aria-hidden="true"></span>
          </button>
        </span>
      </div>
    </div>
    );
  }
}
