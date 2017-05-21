import React, { Component } from 'react';
import { connect } from 'react-redux';
import Autocomplete from 'react-autocomplete';
import { addQuery, removeQuery } from '../../../actions';

const MAX_DEPARTMENT = 3;

class DeparmentForm extends Component {
  constructor() {
    super();
    this.state = {
      value: '',
    };
    this.handleSelect = this.handleSelect.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleSelect(value) {
    this.props.dispatch(addQuery('department', value));
    this.setState({ value: '' });
  }

  handleDelete(value, e) {
    e.preventDefault();
    this.props.dispatch(removeQuery('department', value));
  }

  render() {
    const { selectedDepartments, departmentTags } = this.props;
    return (
      <div>
        {selectedDepartments.map((val, idx) => (
          <div
            key={idx}
            className="btn btn-info btn-sm tag-selected"
            onClick={this.handleDelete.bind(this, val)}
          >
            {val}
            <span className="glyphicon glyphicon-remove" />
          </div>
        ))}
        {selectedDepartments.size < MAX_DEPARTMENT ?
          <Autocomplete
            value={this.state.value}
            items={departmentTags}
            getItemValue={item => item}
            shouldItemRender={matchStateToTerm}
            menuStyle={menuStyle}
            onChange={(event, value) => this.setState({ value })}
            onSelect={value => this.handleSelect(value)}
            renderItem={(item, highlighted) => (
              <div
                style={itemStyle(highlighted)}
              >
                {item}
              </div>
            )}
          /> :
          null
        }
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { query, tagList } = state;
  const selectedDepartments = query.get('department');
  const departmentTags = tagList.department || []; // Inject empty list before loading
  return { selectedDepartments, departmentTags };
}

export default connect(mapStateToProps)(DeparmentForm);

function escapeRegexCharacters(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '');
}

function like(str, option = { fromFirstChar: false }) {
  // replace every character(eg. 'c') to '.+c', except for first character
  const escaped = escapeRegexCharacters(str);
  let reg = escaped.replace(/(?!^)(.)/g, '.*$1');
  if (option.fromFirstChar) { reg = `^${reg}`; }
  return new RegExp(reg);
}

function matchStateToTerm(state, value) {
  const reg = like(value);
  return reg.test(state);
}

const menuStyle = {
  zIndex: 999,
  backgroundColor: 'white',
  position: 'fixed',
  overflow: 'auto',
  height: '200px',
};

const itemStyle = highlighted => ({
  zIndex: 1000,
  backgroundColor: (highlighted ? '#DEE0DA' : 'white'),
});
