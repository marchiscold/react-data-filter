import React, { useState } from 'react';
import './App.css';
import Header from './components/ui/Header';

function Episodes (props) {
  return (
    <div className='episodes'>
      <div className='episodes__item'>placeholder</div>
      <div className='episodes__item'>placeholder</div>
      <div className='episodes__item'>placeholder</div>
      <div className='episodes__linebreak'></div>
      <div className='episodes__item'>placeholder</div>
    </div>
  );
}


function App() {
  return (
    <div className="container">
      <Header />
      <Episodes />
    </div>
  );
}

export default App;
