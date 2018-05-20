import React, { PureComponent } from 'react';
import * as R from 'ramda';

import heart from './../heart.svg';
import clock from './../clock.svg';

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const TIMER_VALUE = 12;

class Test extends PureComponent {
  state = {
    x: 0,
    y: 0,
    input: '',
    counter: 0,
    lives: 3,
    timerId: null,
    timerValue: TIMER_VALUE,
  };

  inputRef = React.createRef();

  componentDidMount() {
    this.generateTerms();
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

  generateTerms() {
    const { isAddition } = this.props;
    const x = getRandomInt(1, 19);
    const y = isAddition ? getRandomInt(1, 20 - x) : getRandomInt(1, x);

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

  finishGame(didWin = true) {
    const { onFinish } = this.props;
    const message = didWin ? 'Bravo! Pobijedila si :)' : 'Izgubila si :(';

    alert(message);
    this.setState(
      {
        x: 0,
        y: 0,
        input: '',
        counter: 0,
        lives: 3,
        timerId: null,
        timerValue: TIMER_VALUE,
      },
      onFinish
    );
  }

  handleInputChange = e => {
    this.setState({ input: e.target.value });
  };

  handleMove = () => {
    const { lives } = this.state;

    switch (lives) {
      case 0:
        return this.finishGame(false);
      case 10:
        return this.finishGame(true);
      default:
        return this.generateTerms();
    }
  };

  checkResult() {
    const { x, y, input } = this.state;
    const { isAddition } = this.props;

    if (!isAddition) {
      return x - y !== Number(input);
    }

    return x + y !== Number(input);
  }

  handleSubmit = () => {
    if (this.checkResult()) {
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
    this.setState({ timerId: newTimerId, timerValue: TIMER_VALUE });
  };

  render() {
    const { x, y, input, counter, timerValue, lives } = this.state;
    const { isAddition } = this.props;

    return (
      <div className="test">
        <div className="hearts">
          {R.range(0, lives).map(idx => <img key={idx} className="heart" alt="heart" src={heart} />)}
        </div>
        <span className="calculator">
          <b>{counter}:</b> {x} {isAddition ? '+' : '-'} {y} ={' '}
          <input type="number" onChange={this.handleInputChange} value={input} ref={this.inputRef} />
        </span>
        <div className="timer">
          <img src={clock} alt="clock" className="clock" />
          {timerValue}
        </div>
      </div>
    );
  }
}

export default Test;
