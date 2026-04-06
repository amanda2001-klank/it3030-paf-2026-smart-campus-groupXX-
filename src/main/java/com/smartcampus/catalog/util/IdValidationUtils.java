package com.smartcampus.catalog.util;

import com.smartcampus.booking.exception.BadRequestException;
import org.bson.types.ObjectId;

public final class IdValidationUtils {

    private IdValidationUtils() {
    }

    public static String requireValidObjectId(String value, String fieldName) {
        String trimmed = trimToNull(value);
        if (trimmed == null || !ObjectId.isValid(trimmed)) {
            throw new BadRequestException(fieldName + " must be a valid MongoDB ObjectId");
        }
        return trimmed;
    }

    public static String optionalObjectId(String value, String fieldName) {
        String trimmed = trimToNull(value);
        if (trimmed == null) {
            return null;
        }
        return requireValidObjectId(trimmed, fieldName);
    }

    public static String trimToNull(String value) {
        if (value == null) {
            return null;
        }

        String trimmed = value.trim();
        return trimmed.isEmpty() ? null : trimmed;
    }
}
