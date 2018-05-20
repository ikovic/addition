import React, { Component } from 'react';
import * as R from 'ramda';

import { Table, Test, Menu } from './components';
import { MODE } from './constants';

import './App.css';

class App extends Component {
  state = {
    mode: MODE.START,
  };

  setMode = mode => this.setState({ mode });

  render() {
    const { mode } = this.state;
    const rows = R.range(1, 11);
    const bigRows = R.range(11, 21);
    const columns = R.range(0, 11);
    const bigColumns = R.range(10, 21);
    const isAddition = mode === MODE.ADDITION;

    if (mode === MODE.START) {
      return <Menu onModeSelect={this.setMode} />;
    }

    return (
      <div className="mainLayout">
        <div className="tablesRow">
          <Table rows={isAddition ? rows : bigRows} columns={columns} isAddition={isAddition} />
          <Table rows={bigRows} columns={isAddition ? columns : bigColumns} isAddition={isAddition} />
        </div>
        <div className="testRow">
          <Test isAddition={isAddition} onFinish={() => this.setMode(MODE.START)} />
        </div>
      </div>
    );
  }
}

export default App;
