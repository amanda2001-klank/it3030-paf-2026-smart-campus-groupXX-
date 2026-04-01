package com.smartcampus.catalog.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class LocationRequest {

    @NotBlank(message = "Building is required")
    @Size(max = 100, message = "Building cannot exceed 100 characters")
    private String building;

    @NotBlank(message = "Floor is required")
    @Size(max = 50, message = "Floor cannot exceed 50 characters")
    private String floor;

    @NotBlank(message = "Room code is required")
    @Size(max = 50, message = "Room code cannot exceed 50 characters")
    private String roomCode;

    @NotBlank(message = "Location name is required")
    @Size(max = 255, message = "Location name cannot exceed 255 characters")
    private String locationName;

    @Size(max = 255, message = "Address cannot exceed 255 characters")
    private String address;

    public String getBuilding() {
        return building;
    }

    public void setBuilding(String building) {
        this.building = building;
    }

    public String getFloor() {
        return floor;
    }

    public void setFloor(String floor) {
        this.floor = floor;
    }

    public String getRoomCode() {
        return roomCode;
    }

    public void setRoomCode(String roomCode) {
        this.roomCode = roomCode;
    }

    public String getLocationName() {
        return locationName;
    }

    public void setLocationName(String locationName) {
        this.locationName = locationName;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }
}
