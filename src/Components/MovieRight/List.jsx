import React, { useState } from 'react';
import './List.css';

const List = ({ favorites, isLocked, handleSendClick, handleDeleteClick }) => {
  const [inputValue, setInputValue] = useState('List Name');
  const [isInputLocked, setIsInputLocked] = useState(isLocked);

  const handleInputChange = (e) => {
    if (!isInputLocked) {
      setInputValue(e.target.value);
    }
  };

  const handleSend = () => {
    setIsInputLocked(true);
    handleSendClick(inputValue);
  };

  const isSendDisabled = 
    isInputLocked || // Input artıq kilidli olduqda düymə deaktivdir
    inputValue.trim() === '' || // inputValue boş olduqda düymə deaktivdir
    favorites.length === 0; // favorites boş olduqda düymə deaktivdir

  return (
    <div className="right-div">
      <input
        type="text"
        disabled={isInputLocked}
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Enter list name"
      />
      {favorites.length > 0 ? (
        favorites.map((film, i) => (
          <div key={i} className="favorite-item">
            <img src={film.Poster} alt={film.Title} className="film-poster" />
            <h3 className="film-title">{film.Title}</h3>
            <p className="film-year"><strong>Year:</strong> {film.Year}</p>
            <button 
              className="deletebutton" 
              onClick={() => handleDeleteClick(film.imdbID)} 
              disabled={isLocked}
            >
              X
            </button>
          </div>
        ))
      ) : (
        ""
      )}
      <button onClick={handleSend} disabled={isSendDisabled}>
        Send
      </button>
    </div>
  );
};

export default List;