package com.ecxample.security.services;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import org.springframework.boot.test.mock.mockito.MockBean;

import com.ecxample.security.models.ApplicationUser;
import com.ecxample.security.models.Role;
import com.ecxample.security.repository.UserRepository;
import com.ecxample.tenant.services.TenantService;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@SpringBootTest
public class AuthenticationServiceTest {

    @Autowired
    private AuthenticationService authenticationService;

    @MockBean
    private UserRepository userRepository;

    @MockBean
    private TenantService tenantService;

    @Test
    void registerUser_ShouldCreateUserAndTenant() {
        // Arrange
        ApplicationUser mockUser = new ApplicationUser();
        mockUser.setUsername("testuser");
        mockUser.setPassword("password");
        when(userRepository.save(any())).thenReturn(mockUser);

        // Act
        ApplicationUser result = authenticationService.registerUser(
            "testuser", "password"
        );

        // Assert
        assertNotNull(result);
        try {
            verify(tenantService, times(1)).createTenantDatabase(anyString());
        } catch (Exception ex) {
        }
    }
}