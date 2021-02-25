import React from 'react';
import ReactDOM from 'react-dom';
import './styles/styles.scss';

class TimerScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sessionLength: 25,
      breakLength: 5,
      timerMinute: 25,
      timerSecond: 0,
      isSession: true,
      interval: 0,
    };

    this.onIncreaseCounterSession = this.onIncreaseCounterSession.bind(this);
    this.onDecreaseCounterSession = this.onDecreaseCounterSession.bind(this);
    this.onIncreaseCounterBreak = this.onIncreaseCounterBreak.bind(this);
    this.onDecreaseCounterBreak = this.onDecreaseCounterBreak.bind(this);
    this.onUpdateMinutes = this.onUpdateMinutes.bind(this);
    this.onChangeIntervalLengths = this.onChangeIntervalLengths.bind(this);
    this.onPlay = this.onPlay.bind(this);
    this.onStop = this.onStop.bind(this);
    this.onReset = this.onReset.bind(this);
  }

  onIncreaseCounterSession = prevState => {
    this.setState(prevState => {
      return {
        sessionLength: prevState.sessionLength + 1,
        timerMinute: prevState.sessionLength + 1,
      };
    });
  };

  onDecreaseCounterSession = prevState => {
    this.setState(prevState => {
      return {
        sessionLength: prevState.sessionLength - 1,
        timerMinute: prevState.sessionLength - 1,
      };
    });
  };

  onIncreaseCounterBreak = prevState => {
    this.setState(prevState => {
      return {
        breakLength: prevState.breakLength + 1,
      };
    });
  };

  onDecreaseCounterBreak = prevState => {
    this.setState(prevState => {
      return {
        breakLength: prevState.breakLength - 1,
      };
    });
  };

  onUpdateMinutes = () => {
    this.setState(prevState => {
      return {
        timerMinute: prevState.timerMinute - 1,
      };
    });
  };

  onChangeIntervalLengths = isSession => {
    const { sessionLength, breakLength } = this.state;

    if (isSession) {
      this.setState({
        timerMinute: sessionLength,
      });
    } else {
      this.setState({
        timerMinute: breakLength,
      });
    }
  };

  Onplay = () => {};

  onStop = () => {};

  onReset = () => {};

  render() {
    const {
      sessionLength,
      breakLength,
      timerMinute,
      timerSecond,
      isSession,
    } = this.state;

    return (
      <div>
        <h1 className="container--title">TIMER CLOCK 25 + 5</h1>
        <div className="container--lengths">
          <BreakLength
            value={breakLength}
            onIncreaseBreak={this.onIncreaseCounterBreak}
            onDecreaseBreak={this.onDecreaseCounterBreak}
          />
          <SessionLength
            value={sessionLength}
            onIncreaseSession={this.onIncreaseCounterSession}
            onDecreaseSession={this.onDecreaseCounterSession}
          />
        </div>
        <Timer
          timerMinute={timerMinute}
          timerSecond={timerSecond}
          isSession={isSession}
          breakLength={breakLength}
          updateTimerMinute={this.onUpdateMinutes}
          changeInterval={this.onChangeIntervalLengths}
        />
        <ButtonsTimer
          play={this.onPlay}
          stop={this.onStop}
          reset={this.onReset}
        />
      </div>
    );
  }
}

const BreakLength = props => {
  const { value, onIncreaseBreak, onDecreaseBreak } = props;

  const increaseBreak = () => {
    if (value === 60) {
      return;
    } else {
      onIncreaseBreak();
    }
  };

  const decreaseBreak = () => {
    if (value === 1) {
      return;
    } else {
      onDecreaseBreak();
    }
  };

  return (
    <>
      <div className="container container--lengths-break">
        <h4 id="break-label">Break Length</h4>
        <div>
          <button
            id="break-increment"
            className="container--btns"
            onClick={increaseBreak}
          >
            <i className="fas fa-arrow-up container--btns-icons"></i>
          </button>
          {value}
          <button
            id="break-decrement"
            className="container--btns"
            onClick={decreaseBreak}
          >
            <i className="fas fa-arrow-down container--btns-icons"></i>
          </button>
        </div>
      </div>
    </>
  );
};

const SessionLength = props => {
  const { value, onIncreaseSession, onDecreaseSession } = props;

  const increaseSession = () => {
    if (value === 60) {
      return;
    } else {
      onIncreaseSession();
    }
  };

  const decreaseSession = () => {
    if (value === 1) {
      return;
    } else {
      onDecreaseSession();
    }
  };

  return (
    <>
      <div className="container container--lengths-session">
        <h4 id="session-label">Session Length</h4>
        <div>
          <button
            id="session-increment"
            className="container--btns"
            onClick={increaseSession}
          >
            <i className="fas fa-arrow-up container--btns-icons"></i>
          </button>
          {value}
          <button
            id="session-decrement"
            className="container--btns"
            onClick={decreaseSession}
          >
            <i className="fas fa-arrow-down container--btns-icons"></i>
          </button>
        </div>
      </div>
    </>
  );
};

const Timer = props => {
  const { timerMinute, timerSecond, isSession } = props;
  return (
    <>
      <div className="container container--timer">
        <h4>{isSession === true ? 'Session' : 'Break'}</h4>
        <div className="container--timer-time">
          <p className="container--timer-time-panel">{timerMinute}</p>
          <p className="container--timer-time-panel">:</p>
          <p className="container--timer-time-panel">
            {timerSecond === 0
              ? '00'
              : timerSecond < 10
              ? '0' + timerSecond
              : timerSecond}
          </p>
        </div>
      </div>
    </>
  );
};

const ButtonsTimer = props => {
  const { play, stop, reset } = props;
  return (
    <div>
      <div>
        <button onClick={play} className="container--btns">
          <i className="fas fa-play"></i>
        </button>
        <button onClick={stop} className="container--btns">
          <i className="fas fa-pause"></i>
        </button>
        <button onClick={reset} className="container--btns">
          <i className="fas fa-sync-alt"></i>
        </button>
      </div>
    </div>
  );
};

ReactDOM.render(<TimerScreen />, document.getElementById('root'));
