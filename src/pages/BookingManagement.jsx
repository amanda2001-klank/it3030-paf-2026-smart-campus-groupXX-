// ============================================================================
// BOOKING MANAGEMENT PAGE - Display and manage resource booking requests
// ============================================================================

import React, { useState } from 'react';
import StatusBadge from '../components/StatusBadge';
import BookingTable from '../components/booking/BookingTable';
import CreateBookingModal from '../components/booking/CreateBookingModal';

const BookingManagement = () => {
  // Track active filter tab
  const [activeTab, setActiveTab] = useState('all');
  const [activeMainTab, setActiveMainTab] = useState('requests');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const isAdmin = true; // Hardcoded for now

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


  // Mock bookings data
  const mockBookings = [
    {
      id: '1',
      resourceName: 'Auditorium A',
      requestedByName: 'Dr. Aruna Perera',
      startTime: '2023-10-24T09:00',
      endTime: '2023-10-24T11:30',
      purpose: 'Guest Lecture',
      status: 'PENDING',
    },
    {
      id: '2',
      resourceName: 'Advanced Physics Lab',
      requestedByName: 'Samantha Silva',
      startTime: '2023-10-24T14:00',
      endTime: '2023-10-24T16:00',
      purpose: 'Senior Research',
      status: 'APPROVED',
    },
    {
      id: '3',
      resourceName: 'Computer Lab 04',
      requestedByName: 'Kasun Perera',
      startTime: '2023-10-26T08:00',
      endTime: '2023-10-26T10:00',
      purpose: 'Software Training',
      status: 'CANCELLED',
    },
  ];

  // Critical conflicts data
  const conflicts = [
    { id: 1, title: '⚠️ Double booking', resource: 'Lab A', time: 'Mar 29, 2PM', count: 2 },
    { id: 2, title: '🚪 Room unavailable', resource: 'Meeting Room C', time: 'Mar 30, 10AM', count: 3 },
  ];

  // Sample column headers
  const tableHeaders = [
    'Resource Name',
    'Requested By',
    'Date & Time',
    'Purpose',
    'Status',
    'Actions',
  ];

  // Handle modal close
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  // Handle booking form submission
  const handleBookingSubmit = (formData) => {
    console.log('New booking submitted:', formData);
    // This will be replaced with API call later
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
        <BookingTable
          bookings={mockBookings}
          onApprove={(id) => console.log('Approve booking:', id)}
          onReject={(id) => console.log('Reject booking:', id)}
          onCancel={(id) => console.log('Cancel booking:', id)}
          isAdmin={isAdmin}
        />

        {/* Two Column Section */}
        <div className="grid grid-cols-2 gap-8">
          {/* Critical Conflicts */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">⚠️ Critical Conflicts</h3>
            <div className="space-y-3">
              {conflicts.map((conflict) => (
                <div
                  key={conflict.id}
                  className="flex items-center justify-between p-3 bg-red-50 rounded-lg border border-red-200"
                >
                  <div>
                    <p className="text-sm font-medium text-gray-900">{conflict.title}</p>
                    <p className="text-xs text-gray-600">
                      {conflict.resource} • {conflict.time}
                    </p>
                  </div>
                  <span className="px-2.5 py-1 bg-red-100 text-red-700 text-xs font-semibold rounded-full">
                    {conflict.count} Issues
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Facility Utilization */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">📊 Facility Utilization</h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-900">Conference Room A</span>
                  <span className="text-xs font-semibold text-gray-600">85%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: '85%' }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-900">Lab B - Computer</span>
                  <span className="text-xs font-semibold text-gray-600">60%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '60%' }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-900">Auditorium</span>
                  <span className="text-xs font-semibold text-gray-600">30%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-500 h-2 rounded-full" style={{ width: '30%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Create Booking Modal */}
      <CreateBookingModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleBookingSubmit}
      />
    </div>
  );
};

export default BookingManagement;
