import React from 'react';

const emptyTable = (
  <tbody>
    <tr>
      <td colSpan="8">
        <h3 style={{ textAlign: 'center' }}>시간표를 추가해주세요</h3>
      </td>
    </tr>
  </tbody>
);

const TableBody = ({ lectureBoxes, hasSunday, hasNoTable }) => {
  if (hasNoTable) {
    return emptyTable;
  }
  const rows = [];
  const numDay = hasSunday ? 7 : 6;
  const numRows = lectureBoxes[0].length;
  for (let t = 0; t < numRows; t += 1) {
    // rows
    const cols = [];
    if (t % 2 === 0) {
      const hrIdx = t / 2;
      cols.push(
        <td className="label-hour" rowSpan="2" key={-1}>
          {hrIdx + 8}
        </td>,
      );
    }
    for (let d = 0; d < numDay; d += 1) {
      // columns
      cols.push(
        <td className="td-body" key={`${d}{t}`}>
          {lectureBoxes[d][t]}
        </td>,
      );
    }
    rows.push(<tr key={t}>{cols}</tr>);
  }
  return <tbody>{rows}</tbody>;
};

export default TableBody;
