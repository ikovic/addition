import React, { PureComponent } from 'react';
import * as R from 'ramda';

import heart from './../heart.svg';

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

class AdditionTest extends PureComponent {
  state = {
    x: 0,
    y: 0,
    input: '',
    error: false,
    counter: 0,
  };

  inputRef = React.createRef();

  componentDidMount() {
    this.generateAddends();
    document.addEventListener('keypress', this.handleKeypress);
  }

  componentWillUnmount() {
    document.removeEventListener('keypress', this.handleKeypress);
  }

  handleKeypress = e => {
    if (e.key === 'Enter') {
      this.handleSubmit();
    }
  };

  focusInput = () => this.inputRef.current.focus();

  generateAddends() {
    const x = getRandomInt(1, 19);
    const y = getRandomInt(1, 20 - x);

    this.setState(
      state => ({
        x,
        y,
        error: false,
        input: '',
        counter: state.counter + 1,
      }),
      this.focusInput
    );
  }

  handleInputChange = e => {
    this.setState({ input: e.target.value });
  };

  handleSubmit = () => {
    const { x, y, input } = this.state;

    if (x + y !== Number(input)) {
      return this.setState({ error: true }, this.focusInput);
    }

    this.generateAddends();
  };

  render() {
    const { x, y, input, error, counter } = this.state;
    return (
      <div className="test">
        <div className="hearts">
          {R.range(0, counter - 1).map(idx => <img key={idx} className="heart" alt="heart" src={heart} />)}
        </div>
        <span className="calculator">
          <b>{counter}:</b> {x} + {y} ={' '}
          <input type="number" onChange={this.handleInputChange} value={input} ref={this.inputRef} />
          {error && <span className="error">Krivo!</span>}
        </span>
      </div>
    );
  }
}

export default AdditionTest;
