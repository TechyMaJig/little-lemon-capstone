import React, { useState, useEffect } from "react";
import {
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
} from "@mui/material";
import { fetchAPI, store } from './api';


const BookingForm = ({ formData, setFormData, submitForm }) => {
  const [availableTimes, setAvailableTimes] = useState([]);

  useEffect(() => {
    store(); // Initialize local storage
  }, []);

  useEffect(() => {
    if (formData.date) {
      fetchAPI(formData.date).then((times) => setAvailableTimes(times));
    }
  }, [formData.date]);

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submit
    if (submitForm) {
      submitForm(formData); // Call submitForm function passed as a prop
    } else {
      console.error("submitForm is not defined!");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  console.log('BookingForm component: typeof received submitForm prop =', typeof submitForm);

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Box mb={2}>
        <TextField
          label="Choose date"
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          fullWidth
          InputLabelProps={{ shrink: true }}
          inputProps={{
            min: new Date().toISOString().split("T")[0], // disallow past dates
          }}
          sx={{ mb: 2 }}
        />
      </Box>
      <Box mb={2}>
        <FormControl fullWidth>
          <InputLabel>Choose time</InputLabel>
          <Select
            name="time"
            value={formData.time}
            onChange={handleChange}
          >
            {availableTimes.map((time) => (
              <MenuItem key={time} value={time}>
                {time}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <Box mb={2}>
        <TextField
          label="Number of guests"
          type="number"
          name="guests"
          value={formData.guests}
          onChange={handleChange}
          fullWidth
        />
      </Box>
      <Box mb={2}>
        <FormControl fullWidth>
          <InputLabel>Occasion</InputLabel>
          <Select
            name="occasion"
            value={formData.occasion}
            onChange={handleChange}
          >
            <MenuItem value="Birthday">Birthday</MenuItem>
            <MenuItem value="Anniversary">Anniversary</MenuItem>
            <MenuItem value="None">None</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <Button type="submit" variant="contained">
        Make Your Reservation
      </Button>

    </Box>
  );
};

export default BookingForm;


