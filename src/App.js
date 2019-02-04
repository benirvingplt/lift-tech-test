import React, { Component } from 'react';
import './style/App.css';

import Building from './components/Building';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Building />
        <div>
          <p>Call a lift by pressing the button on the desired floor.</p>
          <p>red =  lift not at floor</p>
          <p>amber =  lift at floor but has no further destination</p>
          <p>green = lift at floor and doors are opened</p>
        </div>
      </div>
    );
  }
}

export default App;
