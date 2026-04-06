package com.smartcampus.catalog.dto;

import com.smartcampus.catalog.model.AssetMedia;
import org.springframework.core.io.Resource;

public record AssetMediaContent(AssetMedia media, Resource resource) {
}
