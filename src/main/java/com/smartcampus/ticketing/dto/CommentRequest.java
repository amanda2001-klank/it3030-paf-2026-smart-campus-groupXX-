package com.smartcampus.ticketing.dto;

import jakarta.validation.constraints.NotBlank;

public class CommentRequest {
    @NotBlank(message = "Comment message is required")
    private String message;

    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }
}
