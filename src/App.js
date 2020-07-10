import axios from 'axios';
import React, { useState, useEffect } from 'react';
import './App.css';
import Header from './components/ui/Header';

function Characters (props) {
  let starterPos = (props.page - 1) * props.postsPerPage;
  let chars = props.characters.slice(starterPos, starterPos + props.postsPerPage);
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

function Pagination (props) {
  if (props.isLoading) {
    return null;
  }

  let numberOfPages = Math.ceil(props.characters.length / props.postsPerPage);
  let pageButtons = [];
  for (let i = 0; i < numberOfPages; i++) {
    pageButtons.push(
      <li className={'pagination__item ' + (props.page == i + 1 ? 'active' : '')} 
          key={ i }
          onClick={ () => props.onClick( i + 1 ) }
      >
        { i + 1 }
      </li>
    );
  }

  return (    
    <div className='pagination'>
      <ul>
        {pageButtons}
      </ul>
    </div>
  )
}

function App() {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchValue, setSearchValue] = useState('');
  const [page, setPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(10);

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

  function changePage (page) {
    setPage(page);
  }
  
  return (
    <div className="container">
      <Header />
      <FilterSearch onChange={handleSearch} value={searchValue}/>
      <Pagination isLoading={isLoading}
                  characters={items}
                  page={page}
                  postsPerPage={postsPerPage}
                  onClick={changePage}
      />
      <Characters characters={items} 
                  searchValue={searchValue}
                  isLoading={isLoading}
                  page={page}
                  postsPerPage={postsPerPage}
                  />
    </div>
  );
}

export default App;
