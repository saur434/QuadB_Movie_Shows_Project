import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../css/ShowList.css'; 

const ShowList = () => {
  const [shows, setShows] = useState([]);

  useEffect(() => {
    fetch('https://api.tvmaze.com/search/shows?q=all')
      .then(response => response.json())
      .then(data => setShows(data));
  }, []);

  return (
    <div className="show-list-container">
      <h1 style={{color:"blue", textAlign:"center"}}>Movie Shows</h1>
      <div className="show-list">
        {shows.map((showItem) => {
          const { show } = showItem;
          return (
            <div key={show.id} className="show-item">
              <h2>{show.name}</h2>
              <img src={show.image?.medium} alt={show.name} />
              <p>Genres: {show.genres.join(', ')}</p>
              <Link to={`/show/${show.id}`} target="_blank" className="view-details-btn">
                View Details
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ShowList;
