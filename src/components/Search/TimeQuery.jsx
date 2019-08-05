import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// import { updateQuery, toggleTimePanel } from '../../actions';
import { toggleTimePanel, updateQuery } from 'store/search/actions';
import CellSelector from './CellSelector.jsx';

/**
 * Returns complement mask of given masks
 * @param {list of mask} masks
 * @return {mask}
 */
export function complement(masks) {
  const union = masks.reduce(
    (prev, current) => current.map((val, index) => val | prev[index]),
    [0, 0, 0, 0, 0, 0, 0],
  );
  const inversed = union.map(val => ~val);
  // Our mask has 30 bits, and `inversed` has two unnecessary 1 at its head
  const ret = inversed.map(val => (val << 2) >>> 2);
  return ret;
}

/**
 * Converts 6 32bit masks to 30 x 6 2d array.
 * 1 -> 'SELECTED',
 * 0 -> 'EMPTY'
 */
export function maskToCells(plainMasks) {
  // Convert to plainJS before putting into function
  const cells = new Array(30).fill().map(() => new Array(7).fill('EMPTY'));
  for (let d = 0; d < 7; d++) {
    for (let t = 29; t >= 0; t--) {
      const bit = plainMasks[d] & 1;
      if (bit === 1) {
        cells[t][d] = 'SELECTED';
      }
      plainMasks[d] >>= 1;
    }
  }
  return cells;
}

/**
 * Converts 30 x 6 2d array into 6 integer
 */
export function cellsToMask(arr) {
  const masks = [0, 0, 0, 0, 0, 0, 0];

  for (let t = 0; t < 30; t++) {
    for (let d = 0; d < 7; d++) {
      const bit = arr[t][d] === 'SELECTED' ? 1 : 0;
      masks[d] |= bit;
      if (t !== 29) masks[d] <<= 1;
    }
  }
  return masks;
}

class TimeQuery extends Component {
  constructor(props) {
    super(props);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
    this.state = { cells: maskToCells(props.masks) };
  }

  handleSave(e) {
    e.preventDefault();
    const newMasks = cellsToMask(this.state.cells);
    this.props.toggleTimePanel();
    this.props.updateQuery({ time_mask: newMasks });
  }

  handleCancel(e) {
    e.preventDefault();
    this.props.toggleTimePanel();
  }

  handleUpdate(newCells) {
    this.setState({ cells: newCells });
  }

  render() {
    return (
      <div className="time-query">
        <span>
          <strong>검색하고 싶은 시간들을 드래그하세요</strong>
        </span>
        <hr />
        <CellSelector
          row={30}
          col={7}
          rowLabels={new Array(30)
            .fill()
            .map((val, idx) => (idx % 2 === 0 ? String(idx / 2 + 8) : ' '))}
          colLabels={['월', '화', '수', '목', '금', '토', '일']}
          cells={this.state.cells}
          handleUpdate={this.handleUpdate}
        />
        <hr />
        <div className="btns">
          <div
            className="btn btn-default btn-smm btn-timeselector"
            onClick={this.handleCancel}
          >
            취소
          </div>
          <div
            className="btn btn-primary btn-sm btn-timeselector"
            onClick={this.handleSave}
          >
            확인
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ search: { query } }) => {
  return { masks: query.time_mask };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators({ toggleTimePanel, updateQuery }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TimeQuery);
