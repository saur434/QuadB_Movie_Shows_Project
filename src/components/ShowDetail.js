import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import '../css/ShowDetail.css';

const ShowDetail = () => {
  const { id } = useParams();
  const [show, setShow] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    userName: '',
    contactNumber: ''
  });

  useEffect(() => {
    fetch(`https://api.tvmaze.com/shows/${id}`)
      .then(response => response.json())
      .then(data => setShow(data));
  }, [id]);

  if (!show) return <div>Loading...</div>;

  const handleBookTicket = () => {
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    
    const storedData = {
      showName: show.name,
      userName: formData.userName,
      contactNumber: formData.contactNumber,
    };
    localStorage.setItem('bookingDetails', JSON.stringify(storedData));
    setFormData({ userName: '', contactNumber: '' });
    setShowForm(false);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const renderRatings = (rating) => {
    return rating && rating.average ? <p>Rating: {rating.average}</p> : <p>Rating: Not available</p>;
  };

  return (
    <div className="show-detail-container">
    <div className="show-detail">
      <h1>{show.name}</h1>
      {show.image && <img src={show.image.medium} alt={show.name} className="show-image"/>}
      <div className="show-summary" dangerouslySetInnerHTML={{ __html: show.summary }}></div>

      <div className="show-info">
        <p>Language: {show.language}</p>
        {renderRatings(show.rating)}
         
      </div>

      <button onClick={handleBookTicket} className="book-ticket-btn">
        Book Ticket
      </button>

      {showForm && (
        <div className="booking-form">
          <h2>Book a Ticket</h2>
          <form onSubmit={handleFormSubmit} style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <div style={{ fontWeight: 'bold', marginBottom: '10px' }}>
              {show.name}
            </div>
            <label>
              Your Name:
              <input 
                type="text" 
                name="userName" 
                value={formData.userName} 
                onChange={handleInputChange} 
                required 
              />
            </label>
            <label>
              Contact Number:
              <input 
                type="text" 
                name="contactNumber" 
                value={formData.contactNumber} 
                onChange={handleInputChange} 
                required 
              />
            </label>
            <div style={{ display: "flex", justifyContent: "center", marginTop: "10px" }}>
              <button type="submit">Submit</button>
              <button onClick={handleCloseForm}>Close</button>
            </div>
          </form>
        </div>
      )}

      <Link to="/" className="back-link">
        Back to Shows List
      </Link>
    </div>
    </div>
  );
};

export default ShowDetail;
