package com.smartcampus.booking.controller;

import com.smartcampus.booking.dto.BookingRequest;
import com.smartcampus.booking.dto.BookingResponse;
import com.smartcampus.booking.model.BookingStatus;
import com.smartcampus.booking.service.BookingService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/bookings")
public class BookingController {

    private final BookingService bookingService;

    public BookingController(BookingService bookingService) {
        this.bookingService = bookingService;
    }

    /**
     * Create a new booking
     * User ID and name are extracted from request headers: X-User-Id, X-User-Name
     * (Team will integrate OAuth2 later)
     * 
     * @param bookingRequest the booking request DTO
     * @param userId the user ID from header X-User-Id
     * @param userName the user name from header X-User-Name
     * @return BookingResponse with 201 CREATED status
     */
    @PostMapping
    public ResponseEntity<BookingResponse> createBooking(
            @Valid @RequestBody BookingRequest bookingRequest,
            @RequestHeader(value = "X-User-Id", required = false) String userId,
            @RequestHeader(value = "X-User-Name", required = false) String userName) {

        // For testing without headers, use default values
        if (userId == null || userId.isEmpty()) {
            userId = "test-user-123";
        }
        if (userName == null || userName.isEmpty()) {
            userName = "Test User";
        }

        BookingResponse response = bookingService.createBooking(bookingRequest, userId, userName);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    /**
     * Get all bookings (admin only)
     * Can filter by status using ?status=PENDING|APPROVED|REJECTED|CANCELLED
     * 
     * @param status optional status filter
     * @return List of BookingResponse objects
     */
    @GetMapping
    public ResponseEntity<List<BookingResponse>> getAllBookings(
            @RequestParam(value = "status", required = false) BookingStatus status) {

        List<BookingResponse> bookings = bookingService.getAllBookings(status);
        return ResponseEntity.ok(bookings);
    }

    /**
     * Get my bookings (user's own bookings)
     * 
     * @param userId the user ID from header X-User-Id
     * @return List of BookingResponse objects
     */
    @GetMapping("/my")
    public ResponseEntity<List<BookingResponse>> getMyBookings(
            @RequestHeader(value = "X-User-Id", required = false) String userId) {

        // For testing without headers, use default value
        if (userId == null || userId.isEmpty()) {
            userId = "test-user-123";
        }

        List<BookingResponse> bookings = bookingService.getMyBookings(userId);
        return ResponseEntity.ok(bookings);
    }

    /**
     * Get booking by ID
     * 
     * @param id the booking ID
     * @return BookingResponse
     */
    @GetMapping("/{id}")
    public ResponseEntity<BookingResponse> getBookingById(@PathVariable String id) {
        BookingResponse booking = bookingService.getBookingById(id);
        return ResponseEntity.ok(booking);
    }

    /**
     * Approve a pending booking (admin only)
     * 
     * @param id the booking ID
     * @return BookingResponse with APPROVED status
     */
    @PutMapping("/{id}/approve")
    public ResponseEntity<BookingResponse> approveBooking(@PathVariable String id) {
        BookingResponse response = bookingService.approveBooking(id);
        return ResponseEntity.ok(response);
    }

    /**
     * Reject a pending booking (admin only)
     * 
     * @param id the booking ID
     * @param payload must contain "reason" field
     * @return BookingResponse with REJECTED status
     */
    @PutMapping("/{id}/reject")
    public ResponseEntity<BookingResponse> rejectBooking(
            @PathVariable String id,
            @RequestBody Map<String, String> payload) {

        String reason = payload.getOrDefault("reason", "No reason provided");
        BookingResponse response = bookingService.rejectBooking(id, reason);
        return ResponseEntity.ok(response);
    }

    /**
     * Cancel a booking (user can cancel their own APPROVED bookings)
     * 
     * @param id the booking ID
     * @param userId the user ID from header X-User-Id
     * @return BookingResponse with CANCELLED status
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<BookingResponse> cancelBooking(
            @PathVariable String id,
            @RequestHeader(value = "X-User-Id", required = false) String userId) {

        // For testing without headers, use default value
        if (userId == null || userId.isEmpty()) {
            userId = "test-user-123";
        }

        BookingResponse response = bookingService.cancelBooking(id, userId);
        return ResponseEntity.ok(response);
    }

    /**
     * Health check endpoint
     * 
     * @return success response
     */
    @GetMapping("/health")
    public ResponseEntity<Map<String, String>> health() {
        Map<String, String> response = new HashMap<>();
        response.put("status", "UP");
        response.put("service", "Booking Management Service");
        return ResponseEntity.ok(response);
    }
}
