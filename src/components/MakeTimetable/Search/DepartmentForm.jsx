import React, { Component } from 'react';
import { connect } from 'react-redux';
import Autocomplete from 'react-autocomplete';
import { ReactComponent as DeleteButton } from 'assets/btn-delete-normal.svg';
import {addQuery, removeQuery} from 'slices/search'

const MAX_DEPARTMENT = 3;

const styles = {
  menuStyle: {
    zIndex: 999,
    backgroundColor: 'white',
    borderRadius: '14px',
    position: 'absolute',
    left: 0,
    top: '26px',
    overflow: 'auto',
    width: '300px',
    height: '220px',
    border: '1px solid #d5dbe0',
  },
  itemStyle: highlighted => ({
    zIndex: 1001,
    backgroundColor: highlighted ? '#f3f7f8' : 'white',
    padding: '5px 0 5px 14px',
    cursor: 'pointer',
    height: '24px',
  }),
  wrapperStyle: opened => ({
    zIndex: 1000,
    height: '28px',
    borderRadius: '14px',
    border: '1px solid',
    borderColor: opened ? '#1bd0c9' : '#d5dbe0',
    display: 'inline-block',
    position: 'relative',
    paddingLeft: '15px',
  }),
};

function mapStateToProps(state) {
  const { search: {query, tagList}  } = state;
  const selectedDepartments = query['department'] || [];
  const departmentTags = tagList?.department || []; // Inject empty list before loading
  return { selectedDepartments, departmentTags };
}

const mapDispatchToProps = dispatch => ({
  addQuery: value => dispatch(addQuery({key:'department', value})),
  removeQuery: value => dispatch(removeQuery({key:'department', value})),
});

class DeparmentForm extends Component {
  static likeReg(str, option = { fromFirstChar: false }) {
    // replace every character(eg. 'c') to '.+c', except for first character
    const escaped = str.replace(/[.*+?^${}()|[\]\\]/g, '');
    let reg = escaped.replace(/(?!^)(.)/g, '.*$1');
    if (option.fromFirstChar) {
      reg = `^${reg}`;
    }
    return new RegExp(reg);
  }

  static matchStateToTerm(state, value) {
    const reg = DeparmentForm.likeReg(value);
    return reg.test(state);
  }

  constructor() {
    super();
    this.state = {
      value: '',
      menuOpened: false,
    };
    this.handleSelect = this.handleSelect.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.onMenuChange = isOpen => this.setState({ menuOpened: isOpen });
  }

  handleSelect(value) {
    this.props.addQuery(value);
    this.setState({ value: '' });
  }

  handleDelete(value, e) {
    e.preventDefault();
    this.props.removeQuery(value);
  }

  render() {
    const { selectedDepartments, departmentTags } = this.props;
    return (
      <div className="departments">
        {selectedDepartments.map(val => (
          <div
            key={val}
            className="tag-selected"
            onClick={this.handleDelete.bind(this, val)}
          >
            <span className="span-selected">{val}</span>
            <DeleteButton />
          </div>
        ))}
        {selectedDepartments.length < MAX_DEPARTMENT ? (
          <Autocomplete
            value={this.state.value}
            items={departmentTags}
            inputProps={{ placeholder: '학과명 검색' }}
            getItemValue={item => item}
            shouldItemRender={DeparmentForm.matchStateToTerm}
            menuStyle={styles.menuStyle}
            onChange={(event, value) => this.setState({ value })}
            onSelect={value => this.handleSelect(value)}
            onMenuVisibilityChange={this.onMenuChange}
            renderItem={(item, highlighted) => (
              <div
                key={item}
                className="department_item"
                style={styles.itemStyle(highlighted)}
              >
                {item}
              </div>
            )}
            wrapperStyle={styles.wrapperStyle(this.state.menuOpened)}
          />
        ) : null}
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DeparmentForm);
