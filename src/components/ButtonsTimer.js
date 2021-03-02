import React from 'react';

export const ButtonsTimer = props => {
  const { onPlayPause, reset, isPlay } = props;
  return (
    <div>
      <div className="container--timer-btns">
        <button
          id="start_stop"
          onClick={onPlayPause}
          className="container--btns"
        >
          <i
            className={`fas fa-${
              isPlay ? 'pause' : 'play'
            } container--btns-icons`}
          />
        </button>
        <button
          id="reset"
          onClick={reset}
          className="container--btns container--btns-icons"
        >
          <i className="fas fa-sync-alt" />
        </button>
      </div>
    </div>
  );
};
