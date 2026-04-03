import React from 'react';

const Sidebar = ({ activeItem, setActiveItem }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: '\u{1F4CA}' },
    { id: 'facilities', label: 'Assets', icon: '\u{1F3E2}' },
    { id: 'bookings', label: 'Bookings', icon: '\u{1F4C5}' },
    { id: 'tickets', label: 'Incident Tickets', icon: '\u{1F3AB}' },
    { id: 'users', label: 'User Management', icon: '\u{1F465}' },
    { id: 'settings', label: 'Settings', icon: '\u2699\uFE0F' },
  ];

  return (
    <div className="w-48 bg-gray-900 text-white h-screen flex flex-col">
      <div className="p-6 border-b border-gray-800">
        <h2 className="text-xs font-bold uppercase tracking-wider text-gray-400">
          Operations Hub
        </h2>
        <p className="text-xs text-gray-500 mt-1">Smart Campus Admin</p>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveItem(item.id)}
            className={`w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
              activeItem === item.id
                ? 'bg-blue-600 text-white'
                : 'text-gray-400 hover:text-white hover:bg-gray-800'
            }`}
          >
            <span className="mr-3">{item.icon}</span>
            {item.label}
          </button>
        ))}
      </nav>

      <div className="p-4 border-t border-gray-800">
        <div className="flex items-center space-x-3 px-4 py-3 rounded-lg bg-gray-800">
          <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-xs font-bold">
            {'\u{1F464}'}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-semibold text-white truncate">Admin User</p>
            <p className="text-xs text-gray-400 truncate">Super Admin</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
