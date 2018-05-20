import React from 'react';

const AdditionTable = ({ rows, columns }) => (
  <table className="additionTable">
    <thead>
      <tr>{columns.map(v => <th key={v}>{v}</th>)}</tr>
      {rows.map(row => <tr key={row}>{columns.map(col => <td key={col}>{row + col}</td>)}</tr>)}
    </thead>
  </table>
);

export default AdditionTable;
