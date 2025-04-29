// src/pages/ConfirmationPage.js
import React from 'react';
// Import useNavigate for navigation
import { useLocation, useNavigate } from 'react-router-dom';
// Import necessary MUI components
import { Box, Typography, Container, Paper, Button, Stack } from '@mui/material'; // Added Button, Stack

const ConfirmationPage = () => {
    const location = useLocation();
    const navigate = useNavigate(); // Initialize useNavigate hook
    const bookingData = location.state?.bookingData;

    // --- Fallback Content (if no booking data) ---
    if (!bookingData) {
        return (
            <Container maxWidth="sm" sx={{ mt: 4, mb: 4 }}>
                <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="h4" component="h1" gutterBottom>
                        Booking Confirmation
                    </Typography>
                    <Typography sx={{ mb: 3 }}> {/* Added margin-bottom */}
                        No booking details found. Please make a reservation first.
                    </Typography>
                    {/* Also provide a way back home from the fallback */}
                    <Button variant="contained" onClick={() => navigate('/')}>
                         Go to Homepage
                    </Button>
                </Box>
            </Container>
        );
    }

    // --- Main Confirmation Content ---
    return (
        <Container maxWidth="sm" sx={{ mt: 4, mb: 4 }}>

            {/* Centered Header and Subheader */}
            <Box sx={{ textAlign: 'center', mb: 4 }}>
                <Typography variant="h4" component="h1" gutterBottom>
                    Booking Confirmed!
                </Typography>
                <Typography variant="h6" component="p">
                    Thank you for your reservation.
                </Typography>
            </Box>

            {/* Details Block */}
            {/* Added mb: 4 to create space below details before buttons */}
            <Paper elevation={3} sx={{ p: 3, maxWidth: '400px', mx: 'auto', textAlign: 'left', mb: 4 }}>
                <Typography variant="h6" component="h2" gutterBottom sx={{ fontWeight: 'bold' }}>
                    Details:
                </Typography>
                <Typography>Date: {bookingData.date}</Typography>
                <Typography>Time: {bookingData.time}</Typography>
                <Typography>Guests: {bookingData.guests}</Typography>
                <Typography>Occasion: {bookingData.occasion}</Typography>
            </Paper>

            {/* --- Button Group --- */}
            {/* Stack arranges items (buttons) in a row or column with spacing */}
            <Stack
                direction="row" // Arrange buttons horizontally
                spacing={2}      // Add space (theme-aware) between buttons
                justifyContent="center" // Center the buttons within the Stack
                sx={{ mt: 3 }} // Add margin-top for spacing from the details block
            >
                {/* Home Button */}
                <Button
                    variant="outlined" // Style preference: outlined for secondary action
                    onClick={() => navigate('/')} // Navigate to homepage on click
                >
                    Home
                </Button>

                {/* Make Another Reservation Button */}
                <Button
                    variant="contained" // Style preference: contained for primary action
                    onClick={() => navigate('/bookingpage')} // Navigate to booking page on click
                >
                    Make Another Reservation
                </Button>
            </Stack>

        </Container>
    );
};

export default ConfirmationPage;