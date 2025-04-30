import React, { useState, useEffect } from "react";
import {
    Button,
    TextField,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Box,
    FormHelperText // Import FormHelperText
} from "@mui/material";
import { fetchAPI, store } from './api'; // Assuming api.js is in the same directory or configured path

// Today's date at midnight for comparison
const today = new Date();
today.setHours(0, 0, 0, 0);

// Max reservation date (6 months from today)
const maxDate = new Date(today);
maxDate.setMonth(today.getMonth() + 6);
maxDate.setHours(0, 0, 0, 0);

const BookingForm = ({ formData, setFormData, submitForm }) => {
    const [availableTimes, setAvailableTimes] = useState([]);
    // State to hold validation errors for each field
    const [errors, setErrors] = useState({});

    // Effect to initialize localStorage (runs once)
    useEffect(() => {
        store();
    }, []);

    // Effect to fetch available times when the date changes
    useEffect(() => {
        // Clear previous times and time errors when date changes
        setAvailableTimes([]);
        setErrors(prev => ({ ...prev, time: '' })); // Clear time error
        setFormData(prev => ({ ...prev, time: ''})); // Clear selected time

        if (formData.date) {
            // Validate the date as soon as it's entered or changed
            const dateValidationResult = validateField('date', formData.date);
            setErrors(prev => ({ ...prev, date: dateValidationResult }));

            // Fetch times only if the date is potentially valid (basic check)
            if (!dateValidationResult) {
                fetchAPI(formData.date)
                    .then((times) => {
                        setAvailableTimes(times);
                        // If no times are returned, set an error/info message
                        if (times.length === 0) {
                           setErrors(prev => ({...prev, time: 'No times available for this date.'}))
                        }
                    })
                    .catch(err => {
                        console.error("Failed to fetch times:", err);
                        // Optionally set an error state here too
                    });
            }
        } else {
             // If date is cleared, clear available times
             setAvailableTimes([]);
        }
    }, [formData.date, setFormData]); // Added setFormData to dependency array


    // Validation logic for a single field or the whole form
    const validateField = (name, value) => {
        let error = "";
        switch (name) {
            case 'date':
                if (!value) {
                    error = 'Please select a reservation date.';
                } else {
                    const selectedDate = new Date(value + 'T00:00:00');
                    if (isNaN(selectedDate.getTime())) {
                       error = 'Invalid date format.';
                    } else if (selectedDate < today) {
                        error = 'Date cannot be in the past.';
                    } else if (selectedDate > maxDate) {
                        error = 'Reservations cannot be made more than 6 months in advance.';
                    }
                }
                break;
            case 'time':
                if (!value) {
                    error = 'Please select a reservation time.';
                } else if (formData.date && availableTimes.length > 0 && !availableTimes.includes(value)) {
                    error = 'Selected time is not available for this date. Please re-select.';
                } else if (formData.date && availableTimes.length === 0) {
                    error = 'No times available for this date.' // Reinforce if needed
                }
                break;
            case 'guests':
                if (!value) {
                    error = 'Please enter the number of guests.';
                } else {
                    const numGuests = parseInt(value, 10);
                    if (isNaN(numGuests)) {
                        error = 'Please enter a valid number.';
                    } else if (numGuests < 1) {
                        error = 'Minimum number of guests is 1.';
                    } else if (numGuests > 12) {
                        error = 'Maximum number of guests is 12.';
                    }
                }
                break;
            // Add case for 'occasion' if it becomes required
            default:
                break;
        }
        return error; // Return empty string if valid
    };

    // Validate the entire form - returns true if valid, false otherwise
    const validateForm = () => {
        const formErrors = {
            date: validateField('date', formData.date),
            time: validateField('time', formData.time),
            guests: validateField('guests', formData.guests),
            // occasion: validateField('occasion', formData.occasion), // Add if needed
        };
        setErrors(formErrors); // Update errors state with all current errors
        // Check if any value in the formErrors object is not an empty string
        return Object.values(formErrors).every(error => error === "");
    };

    // Handle input changes and clear validation errors for the specific field
    const handleChange = (e) => {
        const { name, value } = e.target;
        // Update form data via the prop function
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
        // Clear the error for the field being changed
        if (errors[name]) {
            setErrors(prevErrors => ({ ...prevErrors, [name]: '' }));
        }
    };

    // Handle blur event to validate the field that lost focus
    const handleBlur = (e) => {
        const { name, value } = e.target;
        const error = validateField(name, value);
        setErrors(prevErrors => ({ ...prevErrors, [name]: error }));
    };

    // Handle form submission: validate first, then call prop function
    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) { // Check if form is valid
            if (submitForm) {
                submitForm(formData); // Call submitForm function passed as a prop
            } else {
                console.error("submitForm prop is not defined!");
            }
        } else {
            console.log("Form validation failed. Please check errors.", errors);
        }
    };

    // Determine if the submit button should be disabled
    const isFormInvalid =
        !formData.date || !formData.time || !formData.guests || // Check required fields
        Object.values(errors).some(error => error !== ''); // Check if any error message exists


    return (
        // Use noValidate to disable default HTML5 validation, relying on custom validation
        <Box component="form" onSubmit={handleSubmit} noValidate>
            {/* Date Input */}
            <Box>
                <TextField
                    label="Choose date"
                    type="date"
                    name="date"
                    id="res-date" // Added id for label association
                    value={formData.date}
                    onChange={handleChange}
                    onBlur={handleBlur} // Validate on blur
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    inputProps={{
                        min: new Date().toISOString().split("T")[0], // Keep for UX
                    }}
                    error={!!errors.date} // Set error state based on validation
                    helperText={errors.date || ' '} // Display error message or empty space
                    required // Mark field as required
                />
            </Box>

            {/* Time Input */}
            <Box>
                <FormControl fullWidth required error={!!errors.time}> {/* Mark as required, set error state */}
                    <InputLabel id="res-time-label">Choose time</InputLabel> {/* Added id for label */}
                    <Select
                        labelId="res-time-label" // Associate label
                        id="res-time"
                        name="time"
                        value={formData.time}
                        label="Choose time" // Required for outlined variant label positioning
                        onChange={handleChange}
                        onBlur={handleBlur} // Validate on blur
                    >
                        {/* Placeholder options based on date/times state */}
                        {!formData.date && <MenuItem value="" disabled>Select a date first</MenuItem>}
                        {formData.date && !errors.date && availableTimes.length === 0 && <MenuItem value="" disabled>No times available</MenuItem>}

                        {/* Map available times */}
                        {availableTimes.map((time) => (
                            <MenuItem key={time} value={time}>
                                {time}
                            </MenuItem>
                        ))}
                    </Select>
                    {/* Display error message below the Select */}
                    <FormHelperText>{errors.time || ' '}</FormHelperText>
                </FormControl>
            </Box>

            {/* Guests Input */}
            <Box mb={2}>
                <TextField
                    label="Number of guests"
                    type="number"
                    name="guests"
                    id="guests" // Added id
                    value={formData.guests}
                    onChange={handleChange}
                    onBlur={handleBlur} // Validate on blur
                    fullWidth
                    inputProps={{
                        min: 1, // Set min/max for browser hints/native validation
                        max: 12,
                    }}
                    error={!!errors.guests} // Set error state
                    helperText={errors.guests || 'Minimum 1, Maximum 12'} // Display error or hint
                    required // Mark field as required
                />
            </Box>

            {/* Occasion Input */}
            <Box mb={2}>
                <FormControl fullWidth>
                    <InputLabel id="occasion-label">Occasion</InputLabel> {/* Added id */}
                    <Select
                        labelId="occasion-label" // Associate label
                        id="occasion"
                        name="occasion"
                        value={formData.occasion}
                        label="Occasion" // Required for outlined variant
                        onChange={handleChange}
                        // onBlur={handleBlur} // Optional: Validate if it becomes required
                    >
                        <MenuItem value="Birthday">Birthday</MenuItem>
                        <MenuItem value="Anniversary">Anniversary</MenuItem>
                        <MenuItem value="None">None</MenuItem>
                    </Select>
                    {/* <FormHelperText>{errors.occasion || ' '}</FormHelperText> */} {/* Add if validation needed */}
                </FormControl>
            </Box>

            {/* Submit Button */}
            <Button
                type="submit"
                variant="contained"
                disabled={isFormInvalid} // Disable button based on validation state
            >
                Make Your Reservation
            </Button>
        </Box>
    );
};

export default BookingForm;


