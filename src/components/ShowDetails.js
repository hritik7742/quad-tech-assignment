import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import BookingForm from './BookingForm';

function ShowDetails({ match }) {
  const [show, setShow] = useState(null);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const history = useHistory();

  useEffect(() => {
    async function fetchShow() {
      const response = await axios.get(`https://api.tvmaze.com/shows/${match.params.id}`);
      setShow(response.data);
    }
    fetchShow();
  }, [match.params.id]);

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

  const handleBookingForm = () => {
    history.push(`/book/${show.name}`);
  }

  const handleReadMore = () => {
    history.push(`/shows/${match.params.id}`);
  }



  return (
    <>
      {show ? (
        <div className="show-details">
          <div className="show-details-image">
            <img
              src={show.image?.original || "https://static.tvmaze.com/uploads/images/medium_portrait/413/1034988.jpg"}
              alt="Show Poster"
              onError={handleImageError}
            />
          </div>
          <div className="show-details-info">
            <h1>{show.name}</h1>
            <p>{removeTags(show.summary)}</p>
          </div>

          <button className="book-btn" onClick={handleBookingForm}>Read more</button>
          {showBookingForm && <BookingForm showName={show.name} />}
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </>
  );
}

export default ShowDetails;
