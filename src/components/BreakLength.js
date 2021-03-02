import React from 'react';

export const BreakLength = props => {
  const { value, onIncreaseBreak, onDecreaseBreak, isPlay } = props;

  return (
    <>
      <div className="container container--lengths--spaces">
        <h4 id="break-label" className="container--lengths--spaces-title">
          Break Length
        </h4>
        <div className="container--lengths--spaces-row">
          <button
            disabled={isPlay === true ? 'disabled' : ''}
            id="break-increment"
            className="container--btns container--btns-lengths"
            onClick={onIncreaseBreak}
          >
            <i className="fas fa-arrow-up container--btns-icons" />
          </button>
          <p id="break-length" className="container--lengths--spaces-digits">
            {value}
          </p>
          <button
            disabled={isPlay === true ? 'disabled' : ''}
            id="break-decrement"
            className="container--btns container--btns-lengths"
            onClick={onDecreaseBreak}
          >
            <i className="fas fa-arrow-down container--btns-icons" />
          </button>
        </div>
      </div>
    </>
  );
};
