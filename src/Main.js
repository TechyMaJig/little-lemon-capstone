// src/Main.js
import React from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

// Import pages...
import Homepage from "./pages/Homepage";
import About from "./pages/About";
import Menu from "./pages/Menu";
import BookingPage from "./pages/BookingPage";
import OrderOnline from "./pages/OrderOnline";
import Login from "./pages/Login";
import ConfirmationPage from "./pages/ConfirmationPage";

// Import API functions
import { submitAPI } from './components/api'; // Assuming api.js is in components

const Main = () => {
  const navigate = useNavigate();

  const submitForm = async (formData) => {
    console.log("Main.js submitForm called with:", formData);

    // 1. Simulate or perform the API submission
    const success = await submitAPI(formData);

    if (success) {
      console.log("API submission reported success.");

      // --- BEGIN LOCALSTORAGE UPDATE ---
      try {
        // 2. Get current reservations from localStorage (fallback to empty array string)
        const existingReservationsJSON = localStorage.getItem("reservations") || "[]";

        // 3. Parse the JSON string into a JavaScript array
        let reservations = []; // Default to empty array
        try {
            reservations = JSON.parse(existingReservationsJSON);
            // Safety check: ensure it's actually an array
            if (!Array.isArray(reservations)) {
                console.warn("localStorage 'reservations' item was not an array. Resetting.");
                reservations = [];
            }
        } catch (parseError) {
            console.error("Error parsing reservations from localStorage:", parseError);
            // If parsing fails, start with an empty array to avoid breaking .push()
             reservations = [];
        }


        // 4. Add the new reservation formData to the array
        reservations.push(formData);

        // 5. Convert the updated array back to a JSON string
        const updatedReservationsJSON = JSON.stringify(reservations);

        // 6. Save the updated JSON string back to localStorage
        localStorage.setItem("reservations", updatedReservationsJSON);

        console.log("Reservation successfully saved to localStorage.");
        // Optional: Log the updated array to verify
        // console.log("Updated localStorage reservations:", reservations);

      } catch (error) {
        // Handle potential errors during localStorage access (e.g., storage full, security restrictions)
        console.error("Could not save reservation to localStorage:", error);
        // Decide if you want to inform the user or just log the error
        // The navigation will still proceed even if saving fails here
      }
      // --- END LOCALSTORAGE UPDATE ---

      // 7. Navigate to the confirmation page
      console.log("Navigating to confirmation page...");
      navigate("/confirmation", { state: { bookingData: formData } });

    } else {
      // Handle submission failure (e.g., show an alert or message)
      alert("Submission failed. Please try again or contact support.");
      console.log("API submission failed.");
    }
  };

  // --- JSX for Routes ---
  return (
    <main>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/about" element={<About />} />
        <Route path="/menu" element={<Menu />} />
        {/* Pass the updated submitForm function down */}
        <Route
          path="/bookingpage"
          element={<BookingPage submitForm={submitForm} />}
        />
        <Route path="/orderonline" element={<OrderOnline />} />
        <Route path="/login" element={<Login />} />
        <Route path="/confirmation" element={<ConfirmationPage />} />
        {/* Add other routes as needed */}
      </Routes>
    </main>
  );
};

export default Main;