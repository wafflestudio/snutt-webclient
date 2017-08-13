import React from 'react';

const TableHeader = ({ hasSunday }) => {
  const days = ['월', '화', '수', '목', '금', '토'];
  if (hasSunday) days.push('일');
  return (
    <thead>
      <tr>
        <th className="label-hour" />
        {days.map(v => (<th className="label-date" key={v}>{v}</th>))}
        <th className="label-date blank-right" />
      </tr>
    </thead>
  );
};

export default TableHeader;
