import axios from 'axios';
import React, { useState, useEffect } from 'react';
import './App.css';
import Header from './components/ui/Header';

function Characters (props) {
  let chars = props.characters.slice(0, 12);
  let charElems = chars.map((character) => {
    if (!character.name.includes(props.searchValue)) {
      return null;
    }
    return (
      <div className='characters__item'
           key={character.char_id}
           style={{backgroundImage: `url(${character.img})`,
                   backgroundSize: 'cover'}}
            >
            <div className='characters__name'>{character.name}</div>
      </div>
    );
  });

  if (props.isLoading) {
    return (
      <div>loading...</div>
    );
  }
  
  return (
    <div className='characters'>
      {charElems}
    </div>
  );
}

function FilterSearch (props) {

  return (
    <input value={props.value}
           onChange={(e) => props.onChange(e.target.value)}
           id='search' 
           type='text' 
           placeholder='Character name'></input>
  );
}


function App() {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    const fetchItems = async () => {
      const response = await axios(`https://www.breakingbadapi.com/api/characters`);
      console.log(response.data);
      setItems(response.data);
      setIsLoading(false);
    }
    
    fetchItems();
  }, []);

  function handleSearch (name) {
    setSearchValue(name);
  }
  
  return (
    <div className="container">
      <Header />
      <FilterSearch onChange={handleSearch} value={searchValue}/>
      <Characters characters={items} 
                  searchValue={searchValue}
                  isLoading={isLoading}
                  />
    </div>
  );
}

export default App;
