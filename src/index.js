import React from 'react';
import ReactDOM from 'react-dom';
import './styles/styles.scss';

class TimerScreen extends React.Component {
  constructor(props) {
    super(props);
    this.loop = undefined;
    this.state = {
      sessionLength: 25,
      breakLength: 5,
      isPlay: false,
      clockTimer: 25 * 60,
      currentTimer: 'Session',
      loop: undefined,
    };

    this.audioRef = React.createRef();

    this.onIncreaseCounterSession = this.onIncreaseCounterSession.bind(this);
    this.onDecreaseCounterSession = this.onDecreaseCounterSession.bind(this);
    this.onIncreaseCounterBreak = this.onIncreaseCounterBreak.bind(this);
    this.onDecreaseCounterBreak = this.onDecreaseCounterBreak.bind(this);

    this.onPlayPause = this.onPlayPause.bind(this);
    this.onResetTimer = this.onResetTimer.bind(this);
  }

  componentWillUnmount() {
    clearInterval(this.loop);
  }

  onIncreaseCounterSession = () => {
    const { sessionLength, isPlay, currentTimer } = this.state;
    if (sessionLength < 60) {
      if (!isPlay && currentTimer === 'Session') {
        this.setState({
          sessionLength: sessionLength + 1,
          clockTimer: (sessionLength + 1) * 60,
        });
      } else {
        this.setState({
          sessionLength: sessionLength + 1,
        });
      }
    }
  };

  onDecreaseCounterSession = () => {
    const { sessionLength, isPlay, currentTimer } = this.state;
    if (sessionLength > 1) {
      if (!isPlay && currentTimer === 'Session') {
        this.setState({
          sessionLength: sessionLength - 1,
          clockTimer: (sessionLength - 1) * 60,
        });
      } else {
        this.setState({
          sessionLength: sessionLength - 1,
        });
      }
    }
  };

  onIncreaseCounterBreak = () => {
    const { breakLength, isPlay, currentTimer } = this.state;
    if (breakLength < 60) {
      if (!isPlay && currentTimer === 'Break') {
        this.setState({
          breakLength: breakLength + 1,
          clockTimer: (breakLength + 1) * 60,
        });
      } else {
        this.setState({
          breakLength: breakLength + 1,
        });
      }
    }
  };

  onDecreaseCounterBreak = () => {
    const { breakLength, isPlay, currentTimer } = this.state;

    if (breakLength > 1) {
      if (!isPlay && currentTimer === 'Break') {
        this.setState({
          breakLength: breakLength - 1,
          clockTimer: (breakLength - 1) * 60,
        });
      } else {
        this.setState({
          breakLength: breakLength - 1,
        });
      }
    }
  };

  onPlayPause = () => {
    const { isPlay } = this.state;

    if (isPlay) {
      clearInterval(this.loop);

      this.setState({
        isPlay: false,
      });
    } else {
      this.setState({
        isPlay: true,
      });
      this.loop = setInterval(() => {
        const {
          clockTimer,
          currentTimer,
          breakLength,
          sessionLength,
        } = this.state;

        if (clockTimer === 0) {
          this.setState({
            currentTimer: currentTimer === 'Session' ? 'Break' : 'Session',
            clockTimer:
              currentTimer === 'Session'
                ? breakLength * 60
                : sessionLength * 60,
          });
          this.beep();
        } else {
          this.setState({
            clockTimer: clockTimer - 1,
          });
        }
      }, 1000);
    }
  };

  onResetTimer = () => {
    this.resetBeep();
    this.setState({
      sessionLength: 25,
      breakLength: 5,
      isPlay: false,
      clockTimer: 25 * 60,
      currentTimer: 'Session',
    });

    clearInterval(this.loop);
  };

  beep = () => {
    const audio = this.audioRef.current;
    if (audio.currentTime > 0) {
      this.resetBeep();
    }

    audio.play();
    setTimeout(() => {
      this.resetBeep();
    }, 1000);
  };

  resetBeep = () => {
    const audio = this.audioRef.current;
    audio.pause();
    audio.currentTime = 0;
  };

  render() {
    const {
      sessionLength,
      breakLength,
      clockTimer,
      currentTimer,
      isPlay,
    } = this.state;

    return (
      <div>
        <audio
          id="beep"
          src="https://www.soundjay.com/appliances/sounds/microwave-oven-bell-1.mp3"
          ref={this.audioRef}
        />

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
            currentTimer={currentTimer}
            clockTimer={clockTimer}
            breakLength={breakLength}
            onPlayStopTimer={this.onPlayStopTimer}
          />
          <ButtonsTimer
            isPlay={isPlay}
            onPlayPause={this.onPlayPause}
            reset={this.onResetTimer}
          />
        </div>
      </div>
    );
  }
}

const BreakLength = props => {
  const { value, onIncreaseBreak, onDecreaseBreak, isPlay } = props;

  return (
    <>
      <div className="container container--lengths--spaces">
        <h4 id="break-label">Break Length</h4>
        <div className="container--lengths--spaces-row">
          <button
            disabled={isPlay === true ? 'disabled' : ''}
            id="break-increment"
            className="container--btns container--btns-lengths"
            onClick={onIncreaseBreak}
          >
            <i className="fas fa-arrow-up container--btns-icons"></i>
          </button>
          <p id="break-length">{value}</p>
          <button
            disabled={isPlay === true ? 'disabled' : ''}
            id="break-decrement"
            className="container--btns container--btns-lengths"
            onClick={onDecreaseBreak}
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

  return (
    <>
      <div className="container container--lengths--spaces">
        <h4 id="session-label">Session Length</h4>
        <div className="container--lengths--spaces-row">
          <button
            disabled={isPlay === true ? 'disabled' : ''}
            id="session-increment"
            className="container--btns container--btns-lengths"
            onClick={onIncreaseSession}
          >
            <i className="fas fa-arrow-up container--btns-icons"></i>
          </button>
          <p id="session-length">{value}</p>
          <button
            disabled={isPlay === true ? 'disabled' : ''}
            id="session-decrement"
            className="container--btns container--btns-lengths"
            onClick={onDecreaseSession}
          >
            <i className="fas fa-arrow-down container--btns-icons"></i>
          </button>
        </div>
      </div>
    </>
  );
};

const Timer = props => {
  const { clockTimer, currentTimer } = props;

  const convertToTime = count => {
    let minutes = Math.floor(count / 60);
    let seconds = count % 60;

    minutes = minutes < 10 ? '0' + minutes : minutes;
    seconds = seconds < 10 ? '0' + seconds : seconds;

    return `${minutes}:${seconds}`;
  };
  return (
    <>
      <h4 id="timer-label">{currentTimer}</h4>

      <div className="container--timer-time">
        <p id="time-left" className="container--timer-time-panel">
          {convertToTime(clockTimer)}
        </p>
      </div>
    </>
  );
};

const ButtonsTimer = props => {
  const { onPlayPause, reset, isPlay } = props;
  return (
    <div>
      <div>
        <button
          id="start_stop"
          onClick={onPlayPause}
          className="container--btns"
        >
          <i
            className={`fas fa-${
              isPlay ? 'pause' : 'play'
            } container--btns-icons`}
          ></i>
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
