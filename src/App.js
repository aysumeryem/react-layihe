import React, { useState } from 'react';
import { HashRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import Movie from './Components/MovieLeft/Movie';
import List from './Components/MovieRight/List';
import './App.css';

function App() {
  const [favorites, setFavorites] = useState([]);
  const [isLocked, setIsLocked] = useState(false);
  const [listVisible, setListVisible] = useState(false);
  const [listName, setListName] = useState('List Name');

  const addToFavorites = (film) => {
    if (!favorites.some((favorite) => favorite.imdbID === film.imdbID)) {
      setFavorites((prevFavorites) => [...prevFavorites, film]);
    }
  };

  const handleSendClick = (inputValue) => {
    setIsLocked(true);
    setListName(inputValue);
    setListVisible(true);
  };

  const handleDeleteClick = (filmId) => {
    setFavorites(favorites.filter(film => film.imdbID !== filmId));
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Movie addToFavorites={addToFavorites} isLocked={isLocked} favorites={favorites} />
                <List
                  favorites={favorites}
                  isLocked={isLocked}
                  handleSendClick={handleSendClick}
                  handleDeleteClick={handleDeleteClick} 
                />

                {listVisible && (
                  <NavLink to="/list">
                    <button className="see-list-button">See List</button>
                  </NavLink>
                )}
              </>
            }
          />
          <Route
            path="/list"
            element={<ListPage favorites={favorites} listName={listName} />}
          />
        </Routes>
      </div>
    </Router>
  );
}

const ListPage = ({ favorites, listName }) => {
  const redirectToIMDb = (imdbID) => {
    window.location.href = `https://www.imdb.com/title/${imdbID}/`;
  };

  return (
    <div className="list-page">
      <h2>{listName}</h2>
      {favorites.map((film, i) => (
        <div key={i} className="favorite-item">
          <img src={film.Poster} alt={film.Title} />
          <h3>{film.Title}</h3>
          <button className="movie-details" onClick={() => redirectToIMDb(film.imdbID)}>
            See Movie Details
          </button>
        </div>
      ))}
    </div>
  );
};
export default App;