# Frontend-Backend Integration Guide

## Overview
The Booking Management system is now fully integrated between the React frontend (localhost:5173) and Spring Boot backend (localhost:8080).

---

## Architecture

### Backend (Spring Boot on http://localhost:8080)
- **Model**: Booking document with MongoDB
- **Repository**: BookingRepository with custom conflict detection query
- **Service**: BookingService with business logic
- **Controller**: BookingController with REST endpoints
- **Exception Handling**: GlobalExceptionHandler for standardized error responses
- **CORS**: Configured to allow frontend requests from localhost:5173

### Frontend (React on http://localhost:5173)
- **Pages**: BookingManagement.jsx with real API calls
- **Components**: 
  - CreateBookingModal.jsx - Booking form with validation
  - BookingTable.jsx - Display bookings with action buttons
  - LoadingSpinner.jsx - Loading indicator
  - Toast.jsx - Success/Error notifications
- **Service**: bookingService.js with Axios interceptors for user context headers

---

## User Authentication (Temporary)

Currently uses localStorage for user context (team will integrate OAuth2 later):

```javascript
// Set in localStorage before navigating to booking page
localStorage.setItem('userId', 'unique-user-id');
localStorage.setItem('userName', 'User Full Name');
localStorage.setItem('userRole', 'ADMIN'); // or 'USER'
```

Headers automatically added to all requests:
- `X-User-Id`: From localStorage.userId
- `X-User-Name`: From localStorage.userName

**Admin Role** is determined by:
```javascript
const isAdmin = localStorage.getItem('userRole') === 'ADMIN';
```

---

## API Endpoints

### Available Endpoints (Backend on port 8080)

| Method | Endpoint | Description | Admin Only |
|--------|----------|-------------|-----------|
| POST | /api/bookings | Create new booking | ❌ |
| GET | /api/bookings | Get all bookings | ✅ |
| GET | /api/bookings?status=PENDING | Filter by status | ✅ |
| GET | /api/bookings/my | Get user's bookings | ❌ |
| GET | /api/bookings/{id} | Get booking details | ❌ |
| PUT | /api/bookings/{id}/approve | Approve booking | ✅ |
| PUT | /api/bookings/{id}/reject | Reject booking with reason | ✅ |
| DELETE | /api/bookings/{id} | Cancel booking | ❌ (own bookings) |

---

## Booking Status Flow

```
PENDING → APPROVED → CANCELLED
       ↘ REJECTED
```

- **PENDING**: Initial state when booking is created
- **APPROVED**: Booking confirmed by admin (can be cancelled by user)
- **REJECTED**: Booking declined by admin with reason
- **CANCELLED**: User or system cancelled the booking

---

## User Workflows

### Regular User (isAdmin = false)
1. **View My Bookings**: Click "My Bookings" tab → Shows only their bookings
2. **View Approved**: Click "Approved" tab → Shows all approved bookings (system shows all)
3. **Create Booking**: 
   - Click "+ New Booking" button
   - Fill form with resource name, date, time, purpose, attendees
   - Submit → Shows toast on success/error
   - Conflict detection: If resource already booked → 409 error with message
4. **Cancel Booking**: 
   - Find their APPROVED booking
   - Click "Cancel" button
   - Confirm action
   - Success toast → List refreshes
   - Error if not owner: "You can only cancel your own bookings"

### Admin User (isAdmin = true)
1. **View All Bookings**: Click "All Requests" tab → Shows all bookings
2. **View Pending**: Click "Pending" tab → Shows only PENDING bookings (useful for approvals)
3. **Approve Booking**: 
   - Find PENDING booking
   - Click "Approve" button
   - Booking moves to APPROVED status
   - Success toast
4. **Reject Booking**: 
   - Find PENDING booking
   - Click "Reject" button
   - Prompted for rejection reason
   - Booking moves to REJECTED status
   - Success toast

---

## Error Handling

### Frontend Toast Notifications

**Success (Green)**
- "Booking created successfully!"
- "Booking approved successfully!"
- "Booking rejected successfully!"
- "Booking cancelled successfully!"

**Error (Red)**
- "This resource is already booked for the selected time" (409 Conflict)
- "Failed to create booking. Please try again." (Generic creation error)
- "You can only cancel your own bookings" (403 Forbidden)
- "Failed to approve booking" (Generic approval error)
- "Failed to reject booking" (Generic rejection error)
- "Failed to cancel booking" (Generic cancellation error)
- "Failed to load bookings. Please try again." (Loading error)

### Validation Errors

If form validation fails, errors are shown inline below each field:
- Resource name is required
- Date is required
- Start time is required
- End time must be after start time
- Purpose is required
- Expected attendees must be at least 1

---

## Testing the Integration

### Step 1: Start Backend
```bash
cd path/to/project
mvn spring-boot:run
# Should see: "Tomcat started on port 8080"
```

### Step 2: Start Frontend
```bash
cd path/to/project
npm run dev
# Should see: "Local: http://localhost:5173"
```

### Step 3: Set User Context
Open browser console and run:
```javascript
localStorage.setItem('userId', 'test-user-123');
localStorage.setItem('userName', 'Test User');
localStorage.setItem('userRole', 'USER'); // or 'ADMIN'
```

### Step 4: Test Workflows
1. Refresh page → Should load bookings from backend
2. Create a booking → Should show success toast
3. Try to create conflicting booking → Should show conflict error
4. Approve/Reject (if admin) → Should refresh list

---

## MongoDB Connection

The backend connects to MongoDB:
- **Local MongoDB (Recommended for Development)**
  - Connection: `mongodb://localhost:27017/smart_campus`
  - Status: Auto-detects if local MongoDB is running

- **MongoDB Atlas (Cloud)**
  - Requires SSL/TLS certificate setup
  - Connection string in `application.properties`

---

## CORS Configuration

Frontend allowed origins:
- `http://localhost:3000`
- `http://localhost:5173`

Allowed methods: GET, POST, PUT, DELETE, OPTIONS, PATCH
Allowed headers: `*` (all)
Credentials: Enabled
Max age: 3600 seconds

---

## Component Communication

```
BookingManagement Page
├── useEffect → loadBookings() → bookingService.getAllBookings()
├── State Updates → Toast Notifications
├── ↓
├── BookingTable
│   └── onApprove/onReject/onCancel → parent handlers
│
├── CreateBookingModal
│   └── onSubmit → handleBookingSubmit() → bookingService.createBooking()
│
├── Toast (Conditional Render)
│   └── Auto-dismiss after 3 seconds
│
└── LoadingSpinner
    └── Shows during data fetch
```

---

## Local Development Setup

### Prerequisites
- Java 17+
- Maven 3.8+
- Node.js 16+
- MongoDB (local or Atlas connection)

### Quick Start

1. **Backend**
   ```bash
   cd project-root
   mvn clean install
   mvn spring-boot:run
   ```

2. **Frontend**
   ```bash
   cd project-root
   npm install
   npm run dev
   ```

3. **Set User Context**
   ```javascript
   localStorage.setItem('userId', 'dev-user-1');
   localStorage.setItem('userName', 'Developer');
   localStorage.setItem('userRole', 'ADMIN');
   ```

4. **Navigate to** `http://localhost:5173`

---

## Future Integration Points

1. **OAuth2/JWT Authentication**
   - Replace localStorage with token-based auth
   - Update `bookingService.js` interceptor to use Authorization header

2. **User/Admin Context**
   - Replace localStorage.getItem() with Auth context provider
   - Add role-based access control layer

3. **Notifications**
   - Replace built-in Toast with notification service
   - Add email notifications for booking confirmations

4. **Resource Management**
   - Create separate resource administration page
   - Implement resource validation/selection dropdown

5. **Conflict Management**
   - Advanced conflict detection UI
   - Show available slots for resource

---

## Troubleshooting

### Frontend won't connect to backend
- Check if backend is running on http://localhost:8080
- Check CORS configuration in `CorsConfig.java`
- Check browser console for network errors

### Bookings not loading
- Check MongoDB connection
- Verify backend service layer is working
- Check browser console for error messages

### Validation errors don't show
- Ensure form fields match backend validation rules
- Check API response error format from GlobalExceptionHandler

### Toast notifications don't appear
- Check if Toast component is rendered in parent component
- Verify toast state is being set correctly

---

## File Structure

```
src/
├── pages/
│   └── BookingManagement.jsx (Main integration page)
├── components/
│   ├── booking/
│   │   ├── BookingTable.jsx (Display bookings)
│   │   └── CreateBookingModal.jsx (Create booking form)
│   ├── common/
│   │   ├── Toast.jsx (Notifications)
│   │   └── LoadingSpinner.jsx (Loading indicator)
│   └── StatusBadge.jsx (Status display)
└── services/
    └── bookingService.js (API integration)
```

---

**Last Updated**: March 30, 2026
**Status**: Ready for Testing ✅
