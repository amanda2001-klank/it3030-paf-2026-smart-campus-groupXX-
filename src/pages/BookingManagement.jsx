// ============================================================================
// BOOKING MANAGEMENT PAGE - Display and manage resource booking requests
// ============================================================================

import React, { useState, useEffect } from 'react';
import StatusBadge from '../components/StatusBadge';
import BookingTable from '../components/booking/BookingTable';
import CreateBookingModal from '../components/booking/CreateBookingModal';
import LoadingSpinner from '../components/common/LoadingSpinner';
import Toast from '../components/common/Toast';
import * as bookingService from '../services/bookingService';

const BookingManagement = () => {
  // Track active filter tab
  const [activeTab, setActiveTab] = useState('all');
  const [activeMainTab, setActiveMainTab] = useState('requests');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [toast, setToast] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  // Main navigation tabs
  const mainTabs = [
    { id: 'requests', label: 'All Requests' },
    { id: 'history', label: 'History' },
    { id: 'resources', label: 'Resources' },
  ];

  // Filter tab configuration
  const filterTabs = [
    { id: 'all', label: 'All Requests', icon: '📋' },
    { id: 'my', label: 'My Bookings', icon: '📝' },
    { id: 'approved', label: 'Approved', icon: '✅' },
    { id: 'pending', label: 'Pending', icon: '⏳' },
  ];

  // Load bookings on component mount and when filters change
  useEffect(() => {
    loadBookings();
    // Check if user is admin from localStorage (team will replace with auth context)
    const userRole = localStorage.getItem('userRole') || 'USER';
    setIsAdmin(userRole === 'ADMIN');
  }, [activeTab]);

  // Fetch bookings based on active tab
  const loadBookings = async () => {
    setLoading(true);
    setError('');
    try {
      let response;
      if (activeTab === 'my') {
        response = await bookingService.getMyBookings();
      } else if (activeTab === 'pending') {
        response = await bookingService.getAllBookings('PENDING');
      } else if (activeTab === 'approved') {
        response = await bookingService.getAllBookings('APPROVED');
      } else {
        response = await bookingService.getAllBookings();
      }
      setBookings(response.data);
    } catch (err) {
      setError('Failed to load bookings. Please try again.');
      console.error('Error loading bookings:', err);
    } finally {
      setLoading(false);
    }
  };

  // Handle modal close
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  // Handle booking form submission
  const handleBookingSubmit = async (formData) => {
    try {
      // Combine date and time fields into ISO format
      const datetime = `${formData.date}T${formData.startTime}`;
      const endtime = `${formData.date}T${formData.endTime}`;

      const payload = {
        resourceId: formData.resourceId || formData.resourceName,
        startTime: datetime,
        endTime: endtime,
        purpose: formData.purpose,
        expectedAttendees: parseInt(formData.expectedAttendees),
      };

      await bookingService.createBooking(payload);
      setToast({ message: 'Booking created successfully!', type: 'success' });
      setIsModalOpen(false);
      loadBookings(); // Refresh the list
    } catch (err) {
      if (err.response?.status === 409) {
        setToast({ message: 'This resource is already booked for the selected time', type: 'error' });
      } else {
        setToast({ message: 'Failed to create booking. Please try again.', type: 'error' });
      }
      console.error('Error creating booking:', err);
    }
  };

  // Handle approve booking
  const handleApprove = async (id) => {
    try {
      await bookingService.approveBooking(id);
      setToast({ message: 'Booking approved successfully!', type: 'success' });
      loadBookings();
    } catch (err) {
      setToast({ message: 'Failed to approve booking', type: 'error' });
      console.error('Error approving booking:', err);
    }
  };

  // Handle reject booking
  const handleReject = async (id) => {
    const reason = prompt('Please enter rejection reason:');
    if (!reason) return;

    try {
      await bookingService.rejectBooking(id, reason);
      setToast({ message: 'Booking rejected successfully!', type: 'success' });
      loadBookings();
    } catch (err) {
      setToast({ message: 'Failed to reject booking', type: 'error' });
      console.error('Error rejecting booking:', err);
    }
  };

  // Handle cancel booking
  const handleCancel = async (id) => {
    if (!window.confirm('Are you sure you want to cancel this booking?')) return;

    try {
      await bookingService.cancelBooking(id);
      setToast({ message: 'Booking cancelled successfully!', type: 'success' });
      loadBookings();
    } catch (err) {
      if (err.response?.status === 403) {
        setToast({ message: 'You can only cancel your own bookings', type: 'error' });
      } else {
        setToast({ message: 'Failed to cancel booking', type: 'error' });
      }
      console.error('Error cancelling booking:', err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Header */}
      <div className="bg-white border-b border-gray-200 px-8 py-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Smart Campus Hub</h1>
          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
          >
            + New Booking
          </button>
        </div>

        {/* Main Tabs */}
        <div className="flex space-x-8 border-b border-gray-200">
          {mainTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveMainTab(tab.id)}
              className={`pb-4 px-1 text-sm font-medium transition-colors ${
                activeMainTab === tab.id
                  ? 'border-b-2 border-blue-600 text-blue-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="p-8">
        {/* Page Title */}
        <h2 className="text-xl font-bold text-gray-900 mb-6">Booking Management</h2>

        {/* Filter Tabs */}
        <div className="mb-6 flex space-x-6 border-b border-gray-200">
          {filterTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`pb-3 px-1 text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? 'border-b-2 border-blue-600 text-blue-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <span className="mr-2">{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>

        {/* Bookings Table */}
        {loading ? (
          <LoadingSpinner />
        ) : error ? (
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-8">
            <p className="text-red-700 font-medium">{error}</p>
            <button
              onClick={loadBookings}
              className="mt-3 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm font-medium"
            >
              Retry
            </button>
          </div>
        ) : (
          <BookingTable
            bookings={bookings}
            onApprove={handleApprove}
            onReject={handleReject}
            onCancel={handleCancel}
            isAdmin={isAdmin}
          />
        )}

        {/* Two Column Section */}
        <div className="grid grid-cols-2 gap-8">
          {/* Critical Conflicts - Placeholder */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">⚠️ Critical Conflicts</h3>
            <p className="text-gray-600 text-sm">No conflicts detected. All bookings are properly scheduled.</p>
          </div>

          {/* Facility Utilization - Placeholder */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">📊 Facility Utilization</h3>
            <p className="text-gray-600 text-sm">Utilization data is being loaded...</p>
          </div>
        </div>
      </div>

      {/* Create Booking Modal */}
      <CreateBookingModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleBookingSubmit}
      />

      {/* Toast Notification */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
};

export default BookingManagement;
