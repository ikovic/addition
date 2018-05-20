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
    counter: 0,
    lives: 3,
    timerId: null,
    timerValue: 10,
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

    this.startTimer();

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

  handleMove = () => {
    const { lives } = this.state;

    switch (lives) {
      case 0:
        return alert('Izgubila si! :(');
      case 10:
        return alert('Bravo! Pobijedila si! :)');
      default:
        return this.generateAddends();
    }
  };

  handleSubmit = () => {
    const { x, y, input } = this.state;

    if (x + y !== Number(input)) {
      return this.setState(state => ({ lives: state.lives - 1 }), this.handleMove);
    } else {
      return this.setState(state => ({ lives: state.lives + 1 }), this.handleMove);
    }
  };

  startTimer = () => {
    const { timerId } = this.state;
    if (timerId) {
      clearInterval(timerId);
    }

    const newTimerId = window.setInterval(() => {
      const { timerId, timerValue } = this.state;
      const newTimerValue = timerValue - 1;

      if (newTimerValue === 0) {
        clearInterval(timerId);
        return this.handleSubmit();
      }

      this.setState({ timerValue: newTimerValue });
    }, 1000);
    this.setState({ timerId: newTimerId, timerValue: 10 });
  };

  render() {
    const { x, y, input, counter, timerValue, lives } = this.state;
    return (
      <div className="test">
        <div className="hearts">
          {R.range(0, lives).map(idx => <img key={idx} className="heart" alt="heart" src={heart} />)}
        </div>
        <span className="calculator">
          <b>{counter}:</b> {x} + {y} ={' '}
          <input type="number" onChange={this.handleInputChange} value={input} ref={this.inputRef} />
        </span>
        <div>{timerValue}</div>
      </div>
    );
  }
}

export default AdditionTest;
