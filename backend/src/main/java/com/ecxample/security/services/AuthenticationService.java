package com.ecxample.security.services;

import java.util.HashSet;
import java.util.Set;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ecxample.security.models.ApplicationUser;
import com.ecxample.security.models.LoginResponseDTO;
import com.ecxample.security.models.Role;
import com.ecxample.security.repository.RoleRepository;
import com.ecxample.security.repository.UserRepository;
import com.ecxample.tenant.services.TenantService;

@Service
@Transactional
public class AuthenticationService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private TokenService tokenService;

    @Autowired
    private TenantService tenantService;
    
    @Transactional
    public ApplicationUser registerUser(String username, String password) {

        String encodedPassword = passwordEncoder.encode(password);
        Role userRole = roleRepository.findByAuthority("ROLE_USER") // Beachte "ROLE_"-Präfix
                .orElseThrow(() -> new RuntimeException("Rolle 'ROLE_USER' nicht gefunden!"));

        Set<Role> authorities = new HashSet<>();

        authorities.add(userRole);

        String uuid = UUID.randomUUID().toString();
        ApplicationUser user = new ApplicationUser(username, encodedPassword, authorities, uuid);
        try {
            tenantService.createTenantDatabase(uuid);
        } catch (Exception e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }

        return userRepository.save(user);
    }

    public LoginResponseDTO loginUser(String username, String password) {

        try {
            Authentication auth = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(username, password)
            );

            String token = tokenService.generateJwt(auth);

            return new LoginResponseDTO(userRepository.findByUsername(username).get(), token);

        } catch (AuthenticationException e) {
            return new LoginResponseDTO(null, "");
        }
    }

}
