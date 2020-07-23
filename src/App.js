import React from 'react';
import './App.css';
import './components'
import { Minesweeper } from './components';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Minesweeper />
      </header>
    </div>
  );
}

export default App;
