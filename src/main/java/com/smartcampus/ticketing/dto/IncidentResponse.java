package com.smartcampus.ticketing.dto;

import com.smartcampus.ticketing.model.Incident;
import com.smartcampus.ticketing.model.IncidentPriority;
import com.smartcampus.ticketing.model.IncidentStatus;
import com.smartcampus.ticketing.model.DiscussionEntry;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

public class IncidentResponse {
    private String id;
    private String ticketNumber;
    private String title;
    private String description;
    private IncidentPriority priority;
    private IncidentStatus status;
    private String assignedTechnicianId;
    private String assignedTechnicianName;
    private String reportedById;
    private String reportedByName;
    private List<String> attachmentUrls;
    private List<DiscussionEntryResponse> discussion;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public static IncidentResponse fromIncident(Incident incident) {
        IncidentResponse response = new IncidentResponse();
        response.setId(incident.getId());
        response.setTicketNumber(incident.getTicketNumber());
        response.setTitle(incident.getTitle());
        response.setDescription(incident.getDescription());
        response.setPriority(incident.getPriority());
        response.setStatus(incident.getStatus());
        response.setAssignedTechnicianId(incident.getAssignedTechnicianId());
        response.setAssignedTechnicianName(incident.getAssignedTechnicianName());
        response.setReportedById(incident.getReportedById());
        response.setReportedByName(incident.getReportedByName());
        response.setAttachmentUrls(incident.getAttachmentUrls());
        response.setDiscussion(incident.getDiscussion().stream()
                .map(DiscussionEntryResponse::fromDiscussionEntry)
                .collect(Collectors.toList()));
        response.setCreatedAt(incident.getCreatedAt());
        response.setUpdatedAt(incident.getUpdatedAt());
        return response;
    }

    // Getters and Setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getTicketNumber() { return ticketNumber; }
    public void setTicketNumber(String ticketNumber) { this.ticketNumber = ticketNumber; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public IncidentPriority getPriority() { return priority; }
    public void setPriority(IncidentPriority priority) { this.priority = priority; }

    public IncidentStatus getStatus() { return status; }
    public void setStatus(IncidentStatus status) { this.status = status; }

    public String getAssignedTechnicianId() { return assignedTechnicianId; }
    public void setAssignedTechnicianId(String assignedTechnicianId) { this.assignedTechnicianId = assignedTechnicianId; }

    public String getAssignedTechnicianName() { return assignedTechnicianName; }
    public void setAssignedTechnicianName(String assignedTechnicianName) { this.assignedTechnicianName = assignedTechnicianName; }

    public String getReportedById() { return reportedById; }
    public void setReportedById(String reportedById) { this.reportedById = reportedById; }

    public String getReportedByName() { return reportedByName; }
    public void setReportedByName(String reportedByName) { this.reportedByName = reportedByName; }

    public List<String> getAttachmentUrls() { return attachmentUrls; }
    public void setAttachmentUrls(List<String> attachmentUrls) { this.attachmentUrls = attachmentUrls; }

    public List<DiscussionEntryResponse> getDiscussion() { return discussion; }
    public void setDiscussion(List<DiscussionEntryResponse> discussion) { this.discussion = discussion; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }

    public static class DiscussionEntryResponse {
        private String authorName;
        private String message;
        private LocalDateTime timestamp;
        private boolean isStaff;

        public static DiscussionEntryResponse fromDiscussionEntry(DiscussionEntry entry) {
            DiscussionEntryResponse response = new DiscussionEntryResponse();
            response.setAuthorName(entry.getAuthorName());
            response.setMessage(entry.getMessage());
            response.setTimestamp(entry.getTimestamp());
            response.setStaff(entry.isStaff());
            return response;
        }

        public String getAuthorName() { return authorName; }
        public void setAuthorName(String authorName) { this.authorName = authorName; }

        public String getMessage() { return message; }
        public void setMessage(String message) { this.message = message; }

        public LocalDateTime getTimestamp() { return timestamp; }
        public void setTimestamp(LocalDateTime timestamp) { this.timestamp = timestamp; }

        public boolean isStaff() { return isStaff; }
        public void setStaff(boolean staff) { isStaff = staff; }
    }
}
