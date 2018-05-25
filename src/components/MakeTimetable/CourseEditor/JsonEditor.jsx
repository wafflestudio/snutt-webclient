import React from 'react';
import update from 'immutability-helper';
import PropTypes from 'prop-types';
import Select from 'react-select';
import DropdownArrow from '../../Common/DropdownArrow.jsx';
import ButtonDelete from '../../../../assets/btn-delete-normal.svg';

const daysKorean = ['월', '화', '수', '목', '금', '토', '일'];
const daysOptions = daysKorean.map((name, index) => ({
  value: index,
  label: name,
  className: 'snutt__options',
}));
const times = [...Array(29).keys()].map(v => v / 2); // 0, 0.5, 1 .... 14.5
const hhmms = times
  .map((gyosi) => {
    const hh = Math.floor(gyosi) + 8;
    const mm = gyosi % 1 === 0.5 ? '30' : '00';
    return `${hh}:${mm}`;
  })
  .map((hhmm, index) => ({
    value: index / 2,
    label: hhmm,
    className: 'snutt__options',
  }));

class ClassTimeRow extends React.PureComponent {
  updateDay = v => this.props.updateRow(this.props.index, 'day', v.value);
  updateStart = v => this.props.updateRow(this.props.index, 'start', v.value);
  updateLen = v => this.props.updateRow(this.props.index, 'len', v.value);
  updatePlace = e =>
    this.props.updateRow(this.props.index, 'place', e.target.value);
  deleteThisRow = (e) => {
    e.preventDefault;
    this.props.deleteRow(this.props.index);
  };
  getValidDuration = () => {
    const start = this.props.start || 1;
    const possibleHours = 32 - start * 2;
    const possibleLengths = [...Array(possibleHours).keys()].map(
      (len, index) => ({
        value: index / 2,
        label: index / 2,
        className: 'snutt__options',
      }),
    );
    return possibleLengths;
  };

  render() {
    const { day, start, len, place } = this.props;

    return (
      <div className="snutt__json_row">
        <Select
          className="snutt__select"
          name="day-selector"
          value={day}
          options={daysOptions}
          onChange={this.updateDay}
          searchable={false}
          clearable={false}
          placeholder="요일"
          arrowRenderer={DropdownArrow}
        />
        <Select
          className="snutt__select"
          name="start-selector"
          value={start}
          options={hhmms}
          onChange={this.updateStart}
          searchable={false}
          clearable={false}
          placeholder="시작"
          arrowRenderer={DropdownArrow}
        />
        <Select
          className="snutt__select"
          name="length-selector"
          value={len}
          options={this.getValidDuration()}
          onChange={this.updateLen}
          searchable={false}
          clearable={false}
          placeholder="시간"
          arrowRenderer={DropdownArrow}
        />
        <input
          className="place"
          value={place}
          onChange={this.updatePlace}
          type="text"
          placeholder="(장소)"
        />
        <ButtonDelete
          className="svg-icon icon-delete"
          onClick={this.deleteThisRow}
        />
      </div>
    );
  }
}

class JsonEditor extends React.PureComponent {
  constructor(props) {
    super(props);
    this.addRow = this.addRow.bind(this);
    this.deleteRow = this.deleteRow.bind(this);
    this.updateRow = this.updateRow.bind(this);
  }

  addRow(e) {
    e.preventDefault();
    const { class_time_json, updateJson } = this.props;
    const newRow = {
      day: undefined,
      start: undefined,
      len: undefined,
      place: '장소',
    };
    const addedJson = update(class_time_json, { $push: [newRow] });
    updateJson(addedJson);
  }

  deleteRow(index) {
    const { class_time_json, updateJson } = this.props;
    const deletedJson = update(class_time_json, { $splice: [[index, 1]] });
    updateJson(deletedJson);
  }

  updateRow(index, field, value) {
    const { class_time_json, updateJson } = this.props;
    const updatedJson = update(class_time_json, {
      [index]: { [field]: { $set: value } },
    });
    updateJson(updatedJson);
  }

  render() {
    return (
      <div className="snutt__json_container">
        {this.props.class_time_json.map((row, i) => (
          <ClassTimeRow
            index={i}
            key={i}
            {...row}
            updateRow={this.updateRow}
            deleteRow={this.deleteRow}
          />
        ))}
        <button id="add-row" className="btn btn-default" onClick={this.addRow}>
          시간 추가
        </button>
      </div>
    );
  }
}

JsonEditor.propTypes = {
  updateJson: PropTypes.func.isRequired,
  class_time_json: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default JsonEditor;
