import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { clearAuthState, formatRoleLabel, getCurrentUser } from '../utils/auth';

const Sidebar = () => {
  const navigate = useNavigate();
  const currentUser = getCurrentUser();
  const displayName = currentUser.userName || 'User';
  const displayRole = formatRoleLabel(currentUser.userRole || 'USER');
  const avatarLetter = (displayName.charAt(0) || 'U').toUpperCase();

  const handleLogout = () => {
    clearAuthState();
    navigate('/login', { replace: true });
  };

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: '\u25A6', path: '/dashboard' },
    { id: 'assets', label: 'Assets', icon: '\u25A3', path: '/assets' },
    { id: 'asset-list', label: 'Asset List', icon: '\u25A8', path: '/asset-list' },
    { id: 'bookings', label: 'Bookings', icon: '\u25A4', path: '/bookings' },
    { id: 'tickets', label: 'Incident Tickets', icon: '\u25A9', path: '/tickets' },
    { id: 'users', label: 'User Management', icon: '\u25A7', path: '/users' },
    { id: 'settings', label: 'Settings', icon: '\u2699', path: '/settings' },
  ];

  return (
    <aside className="flex h-screen w-64 shrink-0 flex-col bg-gray-900 text-white xl:w-72">
      <div className="border-b border-gray-800 p-6">
        <h2 className="text-xs font-bold uppercase tracking-wider text-gray-400">Operations Hub</h2>
        <p className="mt-1 text-xs text-gray-500">Smart Campus Admin</p>
      </div>

      <nav className="flex-1 space-y-2 p-4">
        {menuItems.map((item) => (
          <NavLink
            key={item.id}
            to={item.path}
            className={({ isActive }) =>
              `block w-full rounded-lg px-4 py-3 text-left text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-400 hover:bg-gray-800 hover:text-white'
              }`
            }
          >
            <span className="mr-3">{item.icon}</span>
            {item.label}
          </NavLink>
        ))}
      </nav>

      <div className="space-y-3 border-t border-gray-800 p-4">
        <div className="flex items-center space-x-3 rounded-lg bg-gray-800 px-4 py-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-xs font-bold uppercase">
            {avatarLetter}
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-xs font-semibold text-white">{displayName}</p>
            <p className="truncate text-xs text-gray-400">{displayRole}</p>
          </div>
        </div>

        <button
          type="button"
          onClick={handleLogout}
          className="w-full rounded-lg border border-gray-700 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-gray-300 transition hover:border-red-400 hover:text-red-300"
        >
          Log Out
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
