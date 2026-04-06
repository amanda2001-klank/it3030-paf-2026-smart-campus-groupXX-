package com.smartcampus.catalog.dto;

import com.smartcampus.catalog.model.AssetMedia;
import com.smartcampus.catalog.model.AssetMediaType;

import java.time.LocalDateTime;

public class AssetMediaResponse {

    private String id;
    private String assetId;
    private String originalFileName;
    private String storedFileName;
    private String contentType;
    private AssetMediaType mediaType;
    private long fileSize;
    private String relativePath;
    private String uploadedById;
    private LocalDateTime createdAt;

    public static AssetMediaResponse fromAssetMedia(AssetMedia assetMedia) {
        AssetMediaResponse response = new AssetMediaResponse();
        response.setId(assetMedia.getId());
        response.setAssetId(assetMedia.getAssetId());
        response.setOriginalFileName(assetMedia.getOriginalFileName());
        response.setStoredFileName(assetMedia.getStoredFileName());
        response.setContentType(assetMedia.getContentType());
        response.setMediaType(assetMedia.getMediaType());
        response.setFileSize(assetMedia.getFileSize());
        response.setRelativePath(assetMedia.getRelativePath());
        response.setUploadedById(assetMedia.getUploadedById());
        response.setCreatedAt(assetMedia.getCreatedAt());
        return response;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getAssetId() {
        return assetId;
    }

    public void setAssetId(String assetId) {
        this.assetId = assetId;
    }

    public String getOriginalFileName() {
        return originalFileName;
    }

    public void setOriginalFileName(String originalFileName) {
        this.originalFileName = originalFileName;
    }

    public String getStoredFileName() {
        return storedFileName;
    }

    public void setStoredFileName(String storedFileName) {
        this.storedFileName = storedFileName;
    }

    public String getContentType() {
        return contentType;
    }

    public void setContentType(String contentType) {
        this.contentType = contentType;
    }

    public AssetMediaType getMediaType() {
        return mediaType;
    }

    public void setMediaType(AssetMediaType mediaType) {
        this.mediaType = mediaType;
    }

    public long getFileSize() {
        return fileSize;
    }

    public void setFileSize(long fileSize) {
        this.fileSize = fileSize;
    }

    public String getRelativePath() {
        return relativePath;
    }

    public void setRelativePath(String relativePath) {
        this.relativePath = relativePath;
    }

    public String getUploadedById() {
        return uploadedById;
    }

    public void setUploadedById(String uploadedById) {
        this.uploadedById = uploadedById;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}
