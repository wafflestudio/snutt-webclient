import React, { Component } from 'react'
import update from 'react-addons-update'
import Autosuggest from 'react-autosuggest';

const departments = [
  '컴퓨터사이언스',
  '컴뮤니케이',
  '컴퓨터공학부',
  '자유전공학부',
  '연합전공 정보문화학',
  '경제학부'
];

function like(str, option) {
  if (option === undefined)
    var option = { fromFirstChar: false }
  //replace every character(eg. 'c') to '.+c', except for first character
  var reg = str.replace(/(?!^)(.)/g, '.*$1')
  if (option.fromFirstChar)
    reg = '^' + reg
  return new RegExp(reg)
}

function getSuggestions(value) {
  const inputValue = value.trim()
  const inputLength = inputValue.length
  var regex = like(value)

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

export default class DepartmentSuggestion extends Component {
  constructor() {
    super();

    this.state = {
      value: '',
      suggestions: getSuggestions('')
    };

    this.onKeyDown = this.onKeyDown.bind(this)
    this.onChange = this.onChange.bind(this)
    this.onSuggestionsUpdateRequested = this.onSuggestionsUpdateRequested.bind(this)
    this.onSuggestionSelected = this.onSuggestionSelected.bind(this)
  }

  onKeyDown(e) {
    var { updateDepartments, selectedDepartments } = this.props
    if (this.state.value.length == 0 && e.keyCode == 8) {
      selectedDepartments.splice(-1, 1)
      updateDepartments(selectedDepartments)
    }
  }

  onChange(event, { newValue }) {
    this.setState({
      value: newValue
    });
  }

  onSuggestionsUpdateRequested({ value }) {
    this.setState({
      suggestions: getSuggestions(value)
    });
  }

  onSuggestionSelected(event, selectInfo) {
    var selectedSuggestion = selectInfo.suggestion
    var { updateDepartments, selectedDepartments } = this.props
    if (selectedDepartments.indexOf(selectedSuggestion) != -1)
      return

    updateDepartments(
      update(selectedDepartments, { $push: [selectedSuggestion] })
    )
    this.setState({ value: '' })
  }

  render() {
    const { value, suggestions } = this.state;
    const inputProps = {
      placeholder: 'eg)컴공',
      value,
      onChange: this.onChange,
      onKeyDown: this.onKeyDown
    };

    return (
      <Autosuggest
        className='form-control'
        suggestions={suggestions}
        onSuggestionsUpdateRequested={this.onSuggestionsUpdateRequested}
        onSuggestionSelected={this.onSuggestionSelected}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={renderSuggestion}
        inputProps={inputProps}
      />
    );
  }
}
