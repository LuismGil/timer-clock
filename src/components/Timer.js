import React from 'react';

export const Timer = props => {
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
      <h4 id="timer-label" className="container--timer-title">
        {currentTimer}
      </h4>
      <div className="container--timer-time">
        <p id="time-left" className="container--timer-time-panel">
          {convertToTime(clockTimer)}
        </p>
      </div>
    </>
  );
};
