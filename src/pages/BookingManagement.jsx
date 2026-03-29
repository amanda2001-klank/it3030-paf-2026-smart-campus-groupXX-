// ============================================================================
// BOOKING MANAGEMENT PAGE - Display and manage resource booking requests
// ============================================================================

import React, { useState } from 'react';

const BookingManagement = () => {
  // Track active filter tab
  const [activeTab, setActiveTab] = useState('all');

  // Filter tab configuration
  const tabs = [
    { id: 'all', label: 'All Requests', icon: '📋' },
    { id: 'my', label: 'My Bookings', icon: '📝' },
    { id: 'approved', label: 'Approved', icon: '✅' },
    { id: 'pending', label: 'Pending', icon: '⏳' },
  ];

  // Sample column headers for bookings table
  const tableHeaders = [
    'Resource Name',
    'Requested By',
    'Date & Time',
    'Purpose',
    'Status',
    'Actions',
  ];

  return (
    <div className="min-h-screen bg-white p-8">
      {/* Page Header */}
      <div className="mb-8 flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Booking Management
          </h1>
          <p className="text-gray-600">
            Review and manage resource allocation requests
          </p>
        </div>

        {/* New Booking Button */}
        <button
          type="button"
          className="px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200"
        >
          + New Booking
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="mb-6 border-b border-gray-200">
        <div className="flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`pb-4 px-1 font-medium text-sm transition-colors duration-200 border-b-2 ${
                activeTab === tab.id
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              <span className="mr-2">{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Bookings Table */}
      <div className="overflow-x-auto border border-gray-200 rounded-lg">
        <table className="w-full">
          {/* Table Header */}
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              {tableHeaders.map((header) => (
                <th
                  key={header}
                  className="px-6 py-3 text-left text-sm font-semibold text-gray-900"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>

          {/* Table Body - Empty State */}
          <tbody>
            <tr>
              <td colSpan={tableHeaders.length} className="px-6 py-12">
                <div className="text-center">
                  <div className="text-5xl mb-4">📭</div>
                  <p className="text-gray-600 font-medium">No bookings found</p>
                  <p className="text-gray-500 text-sm mt-1">
                    Try adjusting your filters or create a new booking request
                  </p>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BookingManagement;
