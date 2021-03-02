import React, { Component } from 'react';
import { BreakLength } from './components/BreakLength';
import { SessionLength } from './components/SessionLength';
import { Timer } from './components/Timer';
import { ButtonsTimer } from './components/ButtonsTimer';

class TimerClockApp extends Component {
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
        <h1 className="container--title">TIMER CLOCK</h1>
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

export default TimerClockApp;
