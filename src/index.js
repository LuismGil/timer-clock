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
      isPlay: false,
    };

    this.onIncreaseCounterSession = this.onIncreaseCounterSession.bind(this);
    this.onDecreaseCounterSession = this.onDecreaseCounterSession.bind(this);
    this.onIncreaseCounterBreak = this.onIncreaseCounterBreak.bind(this);
    this.onDecreaseCounterBreak = this.onDecreaseCounterBreak.bind(this);
    this.onUpdateMinutes = this.onUpdateMinutes.bind(this);
    this.onChangeIntervalLengths = this.onChangeIntervalLengths.bind(this);
    this.onPlayTimer = this.onPlayTimer.bind(this);
    this.decreaseTimer = this.decreaseTimer.bind(this);
    this.onStopTimer = this.onStopTimer.bind(this);
    this.onResetTimer = this.onResetTimer.bind(this);
    this.onPlayStopTimer = this.onPlayStopTimer.bind(this);
  }

  onIncreaseCounterSession = () => {
    this.setState(prevState => {
      return {
        sessionLength: prevState.sessionLength + 1,
        timerMinute: prevState.sessionLength + 1,
      };
    });
  };

  onDecreaseCounterSession = () => {
    this.setState(prevState => {
      return {
        sessionLength: prevState.sessionLength - 1,
        timerMinute: prevState.sessionLength - 1,
      };
    });
  };

  onIncreaseCounterBreak = () => {
    this.setState(prevState => {
      return {
        breakLength: prevState.breakLength + 1,
      };
    });
  };

  onDecreaseCounterBreak = () => {
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
        isSession: false, // tal vez n funcione
        timerMinute: breakLength,
      });
    }
  };

  onPlayTimer = () => {
    let interval = setInterval(this.decreaseTimer, 1000);
    this.onPlayStopTimer(true);
    this.setState({
      interval: interval,
    });
  };

  decreaseTimer = () => {
    const { timerSecond, timerMinute, isSession } = this.state;
    switch (timerSecond) {
      case 0:
        if (timerMinute === 0) {
          if (isSession) {
            this.setState({
              isSession: false,
            });
            this.onChangeIntervalLengths(isSession);
          } else {
            this.setState({
              isSession: true,
            });

            this.onChangeIntervalLengths(isSession);
          }
        } else {
          this.onUpdateMinutes();
          this.setState({
            timerSecond: 59,
          });
        }

        break;
      default:
        this.setState(prevState => {
          return {
            timerSecond: prevState.timerSecond - 1,
          };
        });
    }
  };

  onStopTimer = () => {
    const { interval } = this.state;
    clearInterval(interval);
    // this.onPlayTimer();
    this.onPlayStopTimer(false);
  };

  onResetTimer = () => {
    this.onStopTimer();
    this.onPlayStopTimer(false);
    this.setState({
      timerSecond: 0,
      timerMinute: 25,
      isSession: true,
    });
  };

  onPlayStopTimer = isPlay => {
    this.setState({ isPlay: isPlay });
  };

  render() {
    const {
      sessionLength,
      breakLength,
      timerMinute,
      timerSecond,
      isSession,
      isPlay,
    } = this.state;

    return (
      <div>
        <h1 className="container--title">TIMER CLOCK 25 + 5</h1>
        <div className="container--lengths">
          <BreakLength
            value={breakLength}
            onIncreaseBreak={this.onIncreaseCounterBreak}
            onDecreaseBreak={this.onDecreaseCounterBreak}
            isPlay={isPlay}
          />
          <SessionLength
            value={sessionLength}
            onIncreaseSession={this.onIncreaseCounterSession}
            onDecreaseSession={this.onDecreaseCounterSession}
            isPlay={isPlay}
          />
        </div>
        <div className="container container--timer">
          <Timer
            timerMinute={timerMinute}
            timerSecond={timerSecond}
            isSession={isSession}
            breakLength={breakLength}
            updateTimerMinute={this.onUpdateMinutes}
            changeInterval={this.onChangeIntervalLengths}
            onPlayStopTimer={this.onPlayStopTimer}
          />
          <ButtonsTimer
            play={this.onPlayTimer}
            stop={this.onStopTimer}
            reset={this.onResetTimer}
          />
        </div>
      </div>
    );
  }
}

const BreakLength = props => {
  const { value, onIncreaseBreak, onDecreaseBreak, isPlay } = props;

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
            disabled={isPlay === true ? 'disabled' : ''}
            id="break-increment"
            className="container--btns container--btns-lengths"
            onClick={increaseBreak}
          >
            <i className="fas fa-arrow-up container--btns-icons"></i>
          </button>
          {value}
          <button
            disabled={isPlay === true ? 'disabled' : ''}
            id="break-decrement"
            className="container--btns container--btns-lengths"
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
  const { value, onIncreaseSession, onDecreaseSession, isPlay } = props;

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
            disabled={isPlay === true ? 'disabled' : ''}
            id="session-increment"
            className="container--btns container--btns-lengths"
            onClick={increaseSession}
          >
            <i className="fas fa-arrow-up container--btns-icons"></i>
          </button>
          {value}
          <button
            disabled={isPlay === true ? 'disabled' : ''}
            id="session-decrement"
            className="container--btns container--btns-lengths"
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
      <h4 id="timer-label">{isSession === true ? 'Session' : 'Break'}</h4>
      <div id="timer-left" className="container--timer-time">
        <p className="container--timer-time-panel">
          {timerMinute === 0
            ? '00'
            : timerMinute < 10
            ? '0' + timerMinute
            : timerMinute}
        </p>
        <p className="container--timer-time-panel">:</p>
        <p className="container--timer-time-panel">
          {timerSecond === 0
            ? '00'
            : timerSecond < 10
            ? '0' + timerSecond
            : timerSecond}
        </p>
      </div>
    </>
  );
};

const ButtonsTimer = props => {
  const { play, stop, reset } = props;
  return (
    <div>
      <div>
        <button id="start_stop" onClick={play} className="container--btns">
          <i className="fas fa-play container--btns-icons"></i>
        </button>
        <button onClick={stop} className="container--btns">
          <i className="fas fa-pause container--btns-icons"></i>
        </button>
        <button
          id="reset"
          onClick={reset}
          className="container--btns container--btns-icons"
        >
          <i className="fas fa-sync-alt"></i>
        </button>
      </div>
    </div>
  );
};

ReactDOM.render(<TimerScreen />, document.getElementById('root'));
