import React, { Component } from 'react';
import * as R from 'ramda';

import { AdditionTable, AdditionTest } from './components';

import './App.css';

class App extends Component {
  render() {
    const rows = R.range(1, 11);
    const bigRows = R.range(11, 21);
    const columns = R.range(0, 11);

    return (
      <div className="mainLayout">
        <div className="tablesRow">
          <AdditionTable rows={rows} columns={columns} />
          <AdditionTable rows={bigRows} columns={columns} />
        </div>
        <div className="testRow">
          <AdditionTest />
        </div>
      </div>
    );
  }
}

export default App;
