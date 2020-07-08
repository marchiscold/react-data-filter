import axios from 'axios';
import React, { useState, useEffect } from 'react';
import './App.css';
import Header from './components/ui/Header';

function Characters (props) {
  console.log(props.characters[0].name);
  let chars = props.characters.slice(0, 12);
  let charElems = chars.map((character) => {
    return (
      <div className='characters__item'
           style={{backgroundImage: `url(${character.img})`,
                   backgroundSize: 'cover'}}
            >
            {character.name}
      </div>
    );
  });
  return (
    <div className='characters'>
      {charElems}
    </div>
  );
}


function App() {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchItems = async () => {
      const response = await axios(`https://www.breakingbadapi.com/api/characters`);
      console.log(response.data);
      setItems(response.data);
      setIsLoading(false);
    }
    
    fetchItems();
  }, []);
  
  return (
    <div className="container">
      <Header />
      {isLoading ? <div>loading...</div> 
                 : <Characters characters={items}/>}
    </div>
  );
}

export default App;
