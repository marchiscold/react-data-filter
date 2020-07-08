import axios from 'axios';
import React, { useState, useEffect } from 'react';
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
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchItems = async () => {
      const items = await axios(`https://www.breakingbadapi.com/api/characters`);
      console.log(items.data);
      setIsLoading(false);
    }
    
    fetchItems();
  });
  
  return (
    <div className="container">
      <Header />
      {isLoading ? <div>loading...</div> 
                 : <Episodes />}
    </div>
  );
}

export default App;
