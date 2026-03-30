package com.smartcampus.booking.dto;

import com.smartcampus.booking.model.Booking;
import com.smartcampus.booking.model.BookingStatus;

import java.time.LocalDateTime;

public class BookingResponse {

    private String id;
    private String resourceId;
    private String resourceName;
    private String requestedById;
    private String requestedByName;
    private LocalDateTime startTime;
    private LocalDateTime endTime;
    private String purpose;
    private Integer expectedAttendees;
    private BookingStatus status;
    private String rejectionReason;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    // Constructors
    public BookingResponse() {
    }

    public BookingResponse(String id, String resourceId, String resourceName, String requestedById,
                          String requestedByName, LocalDateTime startTime, LocalDateTime endTime,
                          String purpose, Integer expectedAttendees, BookingStatus status,
                          String rejectionReason, LocalDateTime createdAt, LocalDateTime updatedAt) {
        this.id = id;
        this.resourceId = resourceId;
        this.resourceName = resourceName;
        this.requestedById = requestedById;
        this.requestedByName = requestedByName;
        this.startTime = startTime;
        this.endTime = endTime;
        this.purpose = purpose;
        this.expectedAttendees = expectedAttendees;
        this.status = status;
        this.rejectionReason = rejectionReason;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    // Factory method to create BookingResponse from Booking
    public static BookingResponse fromBooking(Booking booking) {
        if (booking == null) {
            return null;
        }

        return new BookingResponse(
                booking.getId(),
                booking.getResourceId(),
                booking.getResourceName(),
                booking.getRequestedById(),
                booking.getRequestedByName(),
                booking.getStartTime(),
                booking.getEndTime(),
                booking.getPurpose(),
                booking.getExpectedAttendees(),
                booking.getStatus(),
                booking.getRejectionReason(),
                booking.getCreatedAt(),
                booking.getUpdatedAt()
        );
    }

    // Getters and Setters
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getResourceId() {
        return resourceId;
    }

    public void setResourceId(String resourceId) {
        this.resourceId = resourceId;
    }

    public String getResourceName() {
        return resourceName;
    }

    public void setResourceName(String resourceName) {
        this.resourceName = resourceName;
    }

    public String getRequestedById() {
        return requestedById;
    }

    public void setRequestedById(String requestedById) {
        this.requestedById = requestedById;
    }

    public String getRequestedByName() {
        return requestedByName;
    }

    public void setRequestedByName(String requestedByName) {
        this.requestedByName = requestedByName;
    }

    public LocalDateTime getStartTime() {
        return startTime;
    }

    public void setStartTime(LocalDateTime startTime) {
        this.startTime = startTime;
    }

    public LocalDateTime getEndTime() {
        return endTime;
    }

    public void setEndTime(LocalDateTime endTime) {
        this.endTime = endTime;
    }

    public String getPurpose() {
        return purpose;
    }

    public void setPurpose(String purpose) {
        this.purpose = purpose;
    }

    public Integer getExpectedAttendees() {
        return expectedAttendees;
    }

    public void setExpectedAttendees(Integer expectedAttendees) {
        this.expectedAttendees = expectedAttendees;
    }

    public BookingStatus getStatus() {
        return status;
    }

    public void setStatus(BookingStatus status) {
        this.status = status;
    }

    public String getRejectionReason() {
        return rejectionReason;
    }

    public void setRejectionReason(String rejectionReason) {
        this.rejectionReason = rejectionReason;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }

    @Override
    public String toString() {
        return "BookingResponse{" +
                "id='" + id + '\'' +
                ", resourceId='" + resourceId + '\'' +
                ", resourceName='" + resourceName + '\'' +
                ", requestedById='" + requestedById + '\'' +
                ", requestedByName='" + requestedByName + '\'' +
                ", startTime=" + startTime +
                ", endTime=" + endTime +
                ", purpose='" + purpose + '\'' +
                ", expectedAttendees=" + expectedAttendees +
                ", status=" + status +
                ", rejectionReason='" + rejectionReason + '\'' +
                ", createdAt=" + createdAt +
                ", updatedAt=" + updatedAt +
                '}';
    }
}
