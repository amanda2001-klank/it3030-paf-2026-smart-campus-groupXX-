package com.smartcampus.auth.service;

import com.smartcampus.booking.exception.BadRequestException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClientException;
import org.springframework.web.client.RestTemplate;

import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.Locale;
import java.util.Map;

@Service
public class GoogleTokenService {

    private static final String TOKEN_INFO_ENDPOINT = "https://oauth2.googleapis.com/tokeninfo?id_token=";

    private final String expectedAudience;
    private final RestTemplate restTemplate;

    public GoogleTokenService(@Value("${app.auth.google.client-id}") String expectedAudience) {
        this.expectedAudience = expectedAudience;
        this.restTemplate = new RestTemplate();
    }

    public GoogleProfile verifyIdToken(String idToken) {
        String token = idToken == null ? "" : idToken.trim();
        if (token.isEmpty()) {
            throw new BadRequestException("Google ID token is required.");
        }

        try {
            String url = TOKEN_INFO_ENDPOINT + URLEncoder.encode(token, StandardCharsets.UTF_8);

            @SuppressWarnings("unchecked")
            Map<String, Object> payload = restTemplate.getForObject(url, Map.class);

            if (payload == null || payload.isEmpty()) {
                throw new BadRequestException("Google token verification failed.");
            }

            String audience = asString(payload.get("aud"));
            if (!expectedAudience.equals(audience)) {
                throw new BadRequestException("Google token audience mismatch.");
            }

            String emailVerified = asString(payload.get("email_verified"));
            if (!"true".equalsIgnoreCase(emailVerified)) {
                throw new BadRequestException("Google account email must be verified.");
            }

            String email = asString(payload.get("email"));
            String subject = asString(payload.get("sub"));
            if (email == null || email.isBlank() || subject == null || subject.isBlank()) {
                throw new BadRequestException("Google token response is missing required user data.");
            }

            String displayName = asString(payload.get("name"));
            if (displayName == null || displayName.isBlank()) {
                displayName = email;
            }

            String picture = asString(payload.get("picture"));
            return new GoogleProfile(subject, email.toLowerCase(Locale.ROOT), displayName, picture);
        } catch (RestClientException ex) {
            throw new BadRequestException("Unable to verify Google token.");
        }
    }

    private String asString(Object value) {
        if (value == null) {
            return null;
        }
        return String.valueOf(value);
    }

    public record GoogleProfile(String subject, String email, String name, String pictureUrl) {
    }
}
