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
  }
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
        <h1 className="container--title">TIMER 25 + 5</h1>
        <div className="container--lengths">
          <BreakLength value={breakLength} />
          <SessionLength value={sessionLength} />
        </div>
        <Timer
          timerMinute={timerMinute}
          timerSecond={timerSecond}
          isSession={isSession}
        />
      </div>
    );
  }
}

const BreakLength = props => {
  const { value } = props;
  return (
    <>
      <div className="container container--lengths-break">
        <h4>Break Length</h4>
        <div>
          <button className="btn">
            <i class="fas fa-arrow-up"></i>
          </button>
          {value}
          <button className="btn">
            <i class="fas fa-arrow-down"></i>
          </button>
        </div>
      </div>
    </>
  );
};

const SessionLength = props => {
  const { value } = props;
  return (
    <>
      <div className="container container--lengths-session">
        <h4>Session Length</h4>
        <div>
          <button className="btn">
            <i class="fas fa-arrow-up"></i>
          </button>
          {value}
          <button className="btn">
            <i class="fas fa-arrow-down"></i>
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
        <ButtonsTimer />
      </div>
    </>
  );
};

const ButtonsTimer = () => {
  return (
    <div>
      <div>
        <button className="btn">
          <i class="fas fa-play"></i>
        </button>
        <button className="btn">
          <i class="fas fa-pause"></i>
        </button>
        <button className="btn">
          <i class="fas fa-sync-alt"></i>
        </button>
      </div>
    </div>
  );
};

ReactDOM.render(<TimerScreen />, document.getElementById('root'));
