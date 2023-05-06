import React, { useEffect, useState } from 'react';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

function Data() {
  const [shows, setShows] = useState([]);
  const history = useHistory();

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get('https://api.tvmaze.com/search/shows?q=all');
      setShows(response.data);
    }
    fetchData();
  }, []);

  const handleImageError = (event) => {
    event.target.onerror = null;
    event.target.src = "https://static.tvmaze.com/uploads/images/medium_portrait/413/1034988.jpg";
  }

  function removeTags(str) {
    if (str === null || str === '') {
      return false;
    } else {
      str = str.toString();
    }
    return str.replace(/<[^>]*>/g, '');
  }

  function truncateSummary(str, maxLength) {
    if (str.length > maxLength) {
      return str.substring(0, maxLength) + '...';
    } else {
      return str;
    }
  }

  const handleReadMore = (id) => {
    history.push(`/shows/${id}`);
  }

  return (
    <div className='main-box'>
      {shows.map((elem) => {
        return (
          <div className="card" style={{ width: '18rem' }} key={elem.show.id}>
            <a href={`/shows/${elem.show.id}`}>
              <img
                className="card-img-top card-img-custom"
                src={elem.show.image?.medium || "https://static.tvmaze.com/uploads/images/medium_portrait/413/1034988.jpg"}
                alt="Show Poster"
                onError={handleImageError}
              />
            </a>
            <div className="card-body">
              <h5 className="card-title">{elem.show.name}</h5>
              <span>
                {elem.show.averageRuntime} | {elem.show.schedule.time} | {elem.show.genres[0]}, {elem.show.genres[1]} |{' '}
                {elem.show.language}
              </span>
              <p className="card-text">{truncateSummary(removeTags(elem.show.summary), 150)}</p>
              <p>{elem.show.rating.average} ⭐</p>
              <button className="movie-btn text-center" onClick={() => handleReadMore(elem.show.id)}>Read more</button>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Data;
