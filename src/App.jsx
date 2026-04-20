import React from 'react';
import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import AssetCataloguePage from './pages/AssetCataloguePage';
import AssetDetailPage from './pages/AssetDetailPage';
import AssetListPage from './pages/AssetListPage';
import AssetListDetailPage from './pages/AssetListDetailPage';
import BookingManagement from './pages/BookingManagement';
import LoginPage from './pages/LoginPage';
import PlaceholderPage from './pages/PlaceholderPage';
import RegisterPage from './pages/RegisterPage';
import { isAuthenticated } from './utils/auth';

const PublicOnlyRoute = ({ children }) => {
  if (isAuthenticated()) {
    return <Navigate to="/assets" replace />;
  }

  return children;
};

const PrivateRoute = ({ children }) => {
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

const ProtectedShell = () => (
  <div className="flex h-screen bg-gray-50">
    <Sidebar />

    <div className="flex-1 min-w-0 overflow-auto">
      <Routes>
        <Route path="/" element={<Navigate to="/assets" replace />} />
        <Route
          path="/dashboard"
          element={
            <PlaceholderPage
              title="Dashboard"
              description="The main dashboard shell is ready. This route is now wired through the sidebar so the layout behaves like a real multi-module app."
            />
          }
        />
        <Route path="/assets" element={<AssetCataloguePage />} />
        <Route path="/assets/:assetId" element={<AssetDetailPage />} />
        <Route path="/asset-list" element={<AssetListPage />} />
        <Route path="/asset-list/:assetId" element={<AssetListDetailPage />} />
        <Route path="/bookings" element={<BookingManagement />} />
        <Route
          path="/tickets"
          element={
            <PlaceholderPage
              title="Incident Tickets"
              description="Ticketing screens are not implemented yet, but the route and sidebar navigation are now live so the module can be added without reworking the app shell."
            />
          }
        />
        <Route
          path="/users"
          element={
            <PlaceholderPage
              title="User Management"
              description="User administration is still a placeholder. The route exists so the sidebar works end-to-end while the team completes the remaining modules."
            />
          }
        />
        <Route
          path="/settings"
          element={
            <PlaceholderPage
              title="Settings"
              description="Settings has a working route placeholder so the sidebar behaves consistently across the application."
            />
          }
        />
        <Route path="*" element={<Navigate to="/assets" replace />} />
      </Routes>
    </div>
  </div>
);

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/login"
          element={
            <PublicOnlyRoute>
              <LoginPage />
            </PublicOnlyRoute>
          }
        />
        <Route
          path="/register"
          element={
            <PublicOnlyRoute>
              <RegisterPage />
            </PublicOnlyRoute>
          }
        />
        <Route
          path="/*"
          element={
            <PrivateRoute>
              <ProtectedShell />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
