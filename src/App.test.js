// src/components/api.test.js (or wherever your api.js tests are)

import { submitAPI } from './components/api'; // Adjust the path as needed

// Group tests for the submitAPI function
describe('submitAPI Mock Function', () => {

  // Test case 1: Verify it returns a Promise (since it's async)
  test('should return a Promise', () => {
    // Define some sample form data
    const sampleFormData = {
      date: '2025-06-15',
      time: '18:00',
      guests: '2',
      occasion: 'Birthday'
    };
    const result = submitAPI(sampleFormData);
    // Check that the returned value is a Promise
    expect(result).toBeInstanceOf(Promise);
  });

  // Test case 2: Verify the promise resolves to true
  test('should resolve with a value of true', async () => {
    // Define some sample form data
    const sampleFormData = {
      date: '2025-07-20',
      time: '19:30',
      guests: '4',
      occasion: 'Anniversary'
    };

    // Use Jest's .resolves matcher to check the resolved value
    await expect(submitAPI(sampleFormData)).resolves.toBe(true);

    // Alternatively, using async/await explicitly:
    // const result = await submitAPI(sampleFormData);
    // expect(result).toBe(true);
  });

  // Test case 3: Verify it consistently resolves to true regardless of input (as per current mock logic)
  test('should always resolve to true for any valid input structure', async () => {
    const differentFormData = {
      date: '2025-12-25',
      time: '20:00',
      guests: '1',
      occasion: 'None'
    };
    await expect(submitAPI(differentFormData)).resolves.toBe(true);
  });

   // Optional: Test that it logs the form data (if that logging is considered part of its contract)
    test('should log the formData passed to it', async () => {
        const formDataToLog = { date: '2025-09-01', time: '21:00', guests: '3', occasion: 'Business' };
        const consoleSpy = jest.spyOn(console, 'log'); // Create a spy on console.log

        await submitAPI(formDataToLog);

        // Check if console.log was called with the expected message and data
        expect(consoleSpy).toHaveBeenCalledWith("submitAPI (mock) called with:", formDataToLog);

        // Clean up the spy afterwards
        consoleSpy.mockRestore();
    });

});

// You can add describe blocks for fetchAPI or other functions from api.js here as well

