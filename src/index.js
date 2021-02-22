import React from 'react';
import ReactDOM from 'react-dom';
import './styles/styles.scss';

class TimerScreen extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <h1>Hello</h1>
      </div>
    );
  }
}

ReactDOM.render(<TimerScreen />, document.getElementById('root'));
