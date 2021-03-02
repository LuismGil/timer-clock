import React from 'react';

export const SessionLength = props => {
  const { value, onIncreaseSession, onDecreaseSession, isPlay } = props;

  return (
    <>
      <div className="container container--lengths--spaces">
        <h4 id="session-label" className="container--lengths--spaces-title">
          Session Length
        </h4>
        <div className="container--lengths--spaces-row">
          <button
            disabled={isPlay === true ? 'disabled' : ''}
            id="session-increment"
            className="container--btns container--btns-lengths"
            onClick={onIncreaseSession}
          >
            <i className="fas fa-arrow-up container--btns-icons" />
          </button>
          <p id="session-length" className="container--lengths--spaces-digits">
            {value}
          </p>
          <button
            disabled={isPlay === true ? 'disabled' : ''}
            id="session-decrement"
            className="container--btns container--btns-lengths"
            onClick={onDecreaseSession}
          >
            <i className="fas fa-arrow-down container--btns-icons" />
          </button>
        </div>
      </div>
    </>
  );
};
