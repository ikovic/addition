import React from 'react';

const Table = ({ rows, columns, isAddition = true }) =>
  !console.log(columns) && (
    <table className="additionTable">
      <thead>
        <tr>{columns.map(v => <th key={v}>{v}</th>)}</tr>
      </thead>
      <tbody>
        {rows.map(row => (
          <tr key={row}>
            {columns.map((col, index) => {
              const value = index === 0 ? row : isAddition ? row + col : row - col;
              return <td key={col}>{value}</td>;
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );

export default Table;
