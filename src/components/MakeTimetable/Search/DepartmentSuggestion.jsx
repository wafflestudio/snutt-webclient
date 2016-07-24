import React, { Component } from 'react'
import { connect } from 'react-redux'
import Autosuggest from 'react-autosuggest'

import { departments } from './options'
import { updateQuery } from '../../../actions'

function escapeRegexCharacters(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '')
}

function like(str, option) {
  if (option === undefined)
    var option = { fromFirstChar: false }
  //replace every character(eg. 'c') to '.+c', except for first character
  let escaped = escapeRegexCharacters(str)
  let reg = escaped.replace(/(?!^)(.)/g, '.*$1')
  if (option.fromFirstChar)
    reg = '^' + reg
  return new RegExp(reg)
}

function getSuggestions(value) {
  const inputValue = value.trim()
  const inputLength = inputValue.length
  const regex = like(value)

  return inputLength === 0 ? [] : departments.filter(dep =>
    regex.test(dep)
  );
}

function getSuggestionValue(suggestion) { // when suggestion selected, this function tells
  return suggestion;                 // what should be the value of the input
}

function renderSuggestion(suggestion) {
  return (
    <span>{suggestion}</span>
  );
}

class DepartmentSuggestion extends Component {
  constructor() {
    super();

    this.state = {
      value: '',
      suggestions: getSuggestions(''),
    };

    this.onChange = this.onChange.bind(this)
    this.onSuggestionsUpdateRequested = this.onSuggestionsUpdateRequested.bind(this)
  }

  onChange(event, { newValue, method }) {
    console.log(event)
    console.log(method)
    this.setState({
      value: newValue,
    });
  }

  onSuggestionsUpdateRequested({ value, reason }) {
    this.setState({
      suggestions: getSuggestions(value)
    });
  }

  render() {
    const { value, suggestions } = this.state
    const inputProps = {
      placeholder: 'eg)컴공',
      value,
      onChange: this.onChange,
    }

    return (
      <Autosuggest suggestions={suggestions}
                   onSuggestionsUpdateRequested={this.onSuggestionsUpdateRequested}
                   getSuggestionValue={getSuggestionValue}
                   renderSuggestion={renderSuggestion}
                   inputProps={inputProps}
      />
    );
  }
}

function mapStateToProps(state) {
  return { selectedDepartments: state.query.get('departments')}
}

export default connect(mapStateToProps)(DepartmentSuggestion)
