package com.smartcampus.catalog.service;

import com.smartcampus.booking.exception.BadRequestException;
import com.smartcampus.booking.exception.UnauthorizedException;
import com.smartcampus.catalog.security.MockUserContext;
import com.smartcampus.catalog.security.MockUserRole;
import com.smartcampus.catalog.util.IdValidationUtils;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.stream.Collectors;

@Service
public class MockAccessService {

    private static final String DEFAULT_USER_ID = "mock-user-001";
    private static final String DEFAULT_USER_NAME = "Mock User";
    private static final MockUserRole DEFAULT_ROLE = MockUserRole.USER;

    public MockUserContext resolveUser(String userIdHeader, String userNameHeader, String userRoleHeader) {
        String userId = IdValidationUtils.trimToNull(userIdHeader);
        String userName = IdValidationUtils.trimToNull(userNameHeader);
        String roleValue = IdValidationUtils.trimToNull(userRoleHeader);

        if (userId == null) {
            userId = DEFAULT_USER_ID;
        }
        if (userName == null) {
            userName = DEFAULT_USER_NAME;
        }

        MockUserRole role = DEFAULT_ROLE;
        if (roleValue != null) {
            try {
                role = MockUserRole.valueOf(roleValue.toUpperCase());
            } catch (IllegalArgumentException ex) {
                throw new BadRequestException("X-User-Role must be one of: ADMIN, USER, ASSET_MANAGER, TECHNICIAN");
            }
        }

        return new MockUserContext(userId, userName, role);
    }

    public void requireAnyRole(MockUserContext userContext, MockUserRole... allowedRoles) {
        for (MockUserRole allowedRole : allowedRoles) {
            if (allowedRole == userContext.getRole()) {
                return;
            }
        }

        String allowed = Arrays.stream(allowedRoles)
                .map(Enum::name)
                .collect(Collectors.joining(", "));
        throw new UnauthorizedException("Access denied. Required role: " + allowed);
    }
}
