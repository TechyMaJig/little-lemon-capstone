import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom'; // Make sure this is imported for custom matchers like .toBeInTheDocument()

// Import the component to test
import BookingForm from './BookingForm'; // <-- ADJUST PATH if needed

// Import the function to mock (assuming it's a named export)
import { fetchAPI } from './api.js'; // <-- ADJUST PATH if needed

// --- Mock the API module ---
// This replaces the actual fetchAPI with a Jest mock function for all tests in this file
jest.mock('./api.js', () => ({
    fetchAPI: jest.fn(),
    // Add other functions from this module if they are used and need mocking
}));

// --- Helper to get today's date in YYYY-MM-DD format ---
// (Useful for setting the 'min' attribute dynamically if needed, though your error shows a hardcoded future date)
// const getTodayString = () => {
//  const today = new Date();
//  return today.toISOString().split('T')[0];
// };

describe('BookingForm Component Rendering and Interaction', () => {

    // Clear mocks before each test to ensure clean state
    beforeEach(() => {
        // Clears usage data (like call counts) but keeps the mock implementation
        // fetchAPI.mockClear();
        // Or reset everything about the mock:
        jest.clearAllMocks();
    });

    test('Renders BookingForm fields correctly after async effects', async () => {
        // Mock the *initial* fetch call (assuming one happens on mount)
        // Let's include '17:00' here, as the MUI warning mentioned it.
        const initialTimes = ['17:00', '18:00', '19:00'];
        fetchAPI.mockResolvedValueOnce(initialTimes);

        render(<BookingForm availableTimes={[]} dispatch={jest.fn()} submitForm={jest.fn()} />);

        // Wait for the initial times to be fetched and displayed (if applicable)
        await waitFor(() => {
            expect(fetchAPI).toHaveBeenCalledTimes(1); // Assuming fetchAPI is called on initial mount
        });

        // Check for key elements (add more as needed)
        expect(screen.getByLabelText(/Choose date/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Choose time/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Number of guests/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Occasion/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /Make Your reservation/i })).toBeInTheDocument();

        // Check if initial times populate the select dropdown
        // You might need to click the dropdown first depending on implementation
        // For MUI Select, querying options directly can be tricky.
        // A possible check is that the initial value is set if one exists
        // Or check that an option exists after waiting for the API call
        await waitFor(() => {
            // Check if one of the fetched times is present (this might require clicking the select first)
            // Example: If the select renders options immediately:
            // expect(screen.getByRole('option', { name: '17:00' })).toBeInTheDocument();
            // Or if a default value is set:
            // expect(screen.getByLabelText(/Choose time/i)).toHaveValue('17:00'); // Might need adjustment based on how value is set
        });
    });

    // --- THIS IS THE MODIFIED FAILING TEST ---
    test('Calls fetchAPI when date changes', async () => { // <-- Mark test as async
        // Mock the initial fetch call (if any)
        fetchAPI.mockResolvedValueOnce(['17:00', '18:00']);

        // Mock the fetch call that happens *after* the date change
        const newMockTimes = ['20:00', '21:00'];
        // Use mockResolvedValue for subsequent calls, or mockResolvedValueOnce if you know the exact sequence
        fetchAPI.mockResolvedValue(newMockTimes);

        // Provide necessary props. Adjust these based on your BookingForm component.
        const mockDispatch = jest.fn();
        const mockSubmitForm = jest.fn();
        render(
            <BookingForm
                availableTimes={[]} // Initial state might be empty before first fetch
                dispatch={mockDispatch}
                submitForm={mockSubmitForm}
            />
        );

        // --- Wait for the initial fetch to complete ---
        // This ensures we don't overlap with the date change effect
        await waitFor(() => {
            // Assuming fetchAPI IS called on initial mount
            expect(fetchAPI).toHaveBeenCalledTimes(1);
        });

        // Find the date input element
        const dateInput = screen.getByLabelText(/Choose date/i); // Use appropriate label text

        // Define the new date value to simulate user input
        const newDateValue = '2025-11-15'; // Use a date valid according to your component's logic

        // Simulate the user changing the date input's value
        fireEvent.change(dateInput, { target: { value: newDateValue } });

        // --- Wait for the asynchronous effect and assertions ---
        await waitFor(() => {
            // Check that fetchAPI was called again after the date change.
            // If called initially + on change, total calls = 2.
            // If ONLY called on change (less likely for date-dependent times), total calls = 1.
            expect(fetchAPI).toHaveBeenCalledTimes(2); // <-- ADJUST based on initial call behavior

            // Check that the *last* call to fetchAPI used the new date value
            expect(fetchAPI).toHaveBeenLastCalledWith(newDateValue);
        });

        // --- Optional: Wait for the UI to update with new times ---
        // This helps confirm the state update from the API call worked and can help prevent the MUI warning.
        // You might need to click the time dropdown to reveal the options first.
        // Example:
        // fireEvent.mouseDown(screen.getByLabelText(/Choose time/i)); // Or however the MUI select opens
        // await waitFor(() => {
        //    expect(screen.getByRole('option', { name: '20:00' })).toBeInTheDocument();
        //    expect(screen.getByRole('option', { name: '21:00' })).toBeInTheDocument();
        // });
        // If a default time is selected after fetch, you could check that too:
        // await waitFor(() => {
        //     expect(screen.getByLabelText(/Choose time/i)).toHaveValue('20:00'); // Check if first new time is selected? Depends on logic.
        // });

        // You can also check if your mockDispatch was called if changing the date updates state via dispatch
        // await waitFor(() => {
        //     expect(mockDispatch).toHaveBeenCalled();
        // });
    });

});

// --- Keep your existing tests for HTML Attributes Validation ---
describe('BookingForm HTML Attributes Validation', () => {
    beforeEach(() => {
        // Reset mocks if necessary, though these tests might not interact with fetchAPI
        jest.clearAllMocks();
        // Mock fetchAPI returning some default value if the component calls it on render
        fetchAPI.mockResolvedValue(['17:00', '18:00']);
    });

    test('Date input should have correct type, required, and min attributes', async () => {
        render(<BookingForm availableTimes={[]} dispatch={jest.fn()} submitForm={jest.fn()} />);
        // Wait for potential initial async operations if they affect rendering attributes
        await waitFor(() => {
           expect(fetchAPI).toHaveBeenCalledTimes(1); // Example if fetch runs on mount
        });
        const dateInput = screen.getByLabelText(/Choose date/i);
        expect(dateInput).toHaveAttribute('type', 'date');
        expect(dateInput).toBeRequired();
        // The min date might be dynamic or fixed, check accordingly
        // The error log showed min="2025-04-30" during the failure
        expect(dateInput).toHaveAttribute('min', '2025-04-30'); // Use actual expected value
    });

    test('Time select (combobox) should be required', async () => {
        render(<BookingForm availableTimes={[]} dispatch={jest.fn()} submitForm={jest.fn()} />);
         await waitFor(() => {
           expect(fetchAPI).toHaveBeenCalledTimes(1); // Wait if initial fetch affects rendering
        });
        // Targeting the hidden input associated with MUI Select is often reliable for 'required'
        const timeInput = screen.getByTestId('select-time').querySelector('input[name="time"]'); // ASSUMING you add data-testid="select-time" to the FormControl/TextField wrapping the Select
        // Or find by role if possible and check aria-required
        // const timeSelect = screen.getByLabelText(/Choose time/i);
        // expect(timeSelect).toHaveAttribute('aria-required', 'true'); // MUI usually sets this on the button part
        expect(timeInput).toBeRequired(); // Check the underlying input
    });

     test('Guests input should have correct type, required, min, and max attributes', async () => {
        render(<BookingForm availableTimes={[]} dispatch={jest.fn()} submitForm={jest.fn()} />);
         await waitFor(() => {
           expect(fetchAPI).toHaveBeenCalledTimes(1); // Wait if initial fetch affects rendering
        });
        const guestsInput = screen.getByLabelText(/Number of guests/i);
        expect(guestsInput).toHaveAttribute('type', 'number');
        expect(guestsInput).toBeRequired();
        expect(guestsInput).toHaveAttribute('min', '1'); // Assuming min is 1
        expect(guestsInput).toHaveAttribute('max', '10'); // Assuming max is 10
    });

    test('Occasion select (combobox) should have correct attributes and display value', async () => {
        render(<BookingForm availableTimes={[]} dispatch={jest.fn()} submitForm={jest.fn()} />);
         await waitFor(() => {
           expect(fetchAPI).toHaveBeenCalledTimes(1); // Wait if initial fetch affects rendering
        });
        const occasionSelect = screen.getByLabelText(/Occasion/i);
        // Check attributes if necessary (e.g., required)
        // Check default value or selected value
        expect(occasionSelect).toHaveValue('Birthday'); // Assuming 'Birthday' is the default/initial value
        // You might need to check the underlying input for 'required' like with the time select
        const occasionInput = screen.getByTestId('select-occasion').querySelector('input[name="occasion"]'); // ASSUMING data-testid="select-occasion"
        expect(occasionInput).toBeRequired();
    });
});