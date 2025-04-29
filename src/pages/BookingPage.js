// src/pages/BookingPage.js
import React, { useState } from 'react';
import BookingForm from '../components/BookingForm';
import './BookingPage.css';

// Accept submitForm as a prop from Main.js
const BookingPage = ({ submitForm }) => {
  const [formData, setFormData] = useState({
    date: "",
    time: "",
    guests: "",
    occasion: "",
  });

  // Remove the local definition of submitForm
  // const submitForm = (formData) => { ... }; // <-- DELETE THIS

  return (
    <main className="booking-page-container">
      <h1>Make Your Reservation</h1>
      <h2>We are excited to have you join us!</h2>
      <BookingForm
        formData={formData}
        setFormData={setFormData}
        // Pass the submitForm prop received from Main down to BookingForm
        submitForm={submitForm}
      />
    </main>
  );
};

export default BookingPage;
