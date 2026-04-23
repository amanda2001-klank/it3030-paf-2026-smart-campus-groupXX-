package com.smartcampus.ticketing.model;

import java.time.LocalDateTime;

public class DiscussionEntry {
    private String authorId;
    private String authorName;
    private String message;
    private LocalDateTime timestamp;
    private boolean isStaff;

    public DiscussionEntry() {}

    public DiscussionEntry(String authorId, String authorName, String message, boolean isStaff) {
        this.authorId = authorId;
        this.authorName = authorName;
        this.message = message;
        this.timestamp = LocalDateTime.now();
        this.isStaff = isStaff;
    }

    // Getters and Setters
    public String getAuthorId() { return authorId; }
    public void setAuthorId(String authorId) { this.authorId = authorId; }

    public String getAuthorName() { return authorName; }
    public void setAuthorName(String authorName) { this.authorName = authorName; }

    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }

    public LocalDateTime getTimestamp() { return timestamp; }
    public void setTimestamp(LocalDateTime timestamp) { this.timestamp = timestamp; }

    public boolean isStaff() { return isStaff; }
    public void setStaff(boolean staff) { isStaff = staff; }
}
