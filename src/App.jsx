import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import BookingManagement from './pages/BookingManagement'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<BookingManagement />} />
      </Routes>
    </Router>
  )
}

export default App
