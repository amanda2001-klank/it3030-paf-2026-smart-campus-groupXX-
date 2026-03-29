import axios from 'axios';

// Create Axios instance with base configuration
const apiClient = axios.create({
  baseURL: 'http://localhost:8080',
  withCredentials: true,
});

// ============================================================================
// BOOKING SERVICE - API calls for resource booking management
// ============================================================================

/**
 * Get all bookings with optional status filter
 * @param {string} status - Filter by status (optional): 'pending', 'approved', 'rejected'
 * @returns {Promise} - List of bookings
 */
export const getAllBookings = (status) => {
  const params = status ? { status } : {};
  return apiClient.get('/api/bookings', { params });
};

/**
 * Get current user's bookings
 * @returns {Promise} - List of user's bookings
 */
export const getMyBookings = () => {
  return apiClient.get('/api/bookings/my');
};

/**
 * Create a new booking request
 * @param {object} data - Booking data (resourceId, dateTime, purpose, etc.)
 * @returns {Promise} - Created booking object
 */
export const createBooking = (data) => {
  return apiClient.post('/api/bookings', data);
};

/**
 * Approve a pending booking request
 * @param {string} id - Booking ID
 * @returns {Promise} - Updated booking object
 */
export const approveBooking = (id) => {
  return apiClient.put(`/api/bookings/${id}/approve`);
};

/**
 * Reject a booking request
 * @param {string} id - Booking ID
 * @param {string} reason - Rejection reason
 * @returns {Promise} - Updated booking object
 */
export const rejectBooking = (id, reason) => {
  return apiClient.put(`/api/bookings/${id}/reject`, { reason });
};

/**
 * Cancel an existing booking
 * @param {string} id - Booking ID
 * @returns {Promise} - Response from server
 */
export const cancelBooking = (id) => {
  return apiClient.delete(`/api/bookings/${id}`);
};

export default apiClient;
