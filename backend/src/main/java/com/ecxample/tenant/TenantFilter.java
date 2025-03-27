package com.ecxample.tenant;

import java.io.IOException;

import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.web.filter.OncePerRequestFilter;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

// TenantFilter.java

public class TenantFilter extends OncePerRequestFilter {

 
  
    private final JwtDecoder jwtDecoder;

    // Konstruktor ohne @Autowired (da nicht mehr als Bean verwaltet)
    public TenantFilter(JwtDecoder jwtDecoder) {
        this.jwtDecoder = jwtDecoder;
    }

    @Override
    protected void doFilterInternal(
        HttpServletRequest request, 
        HttpServletResponse response, 
        FilterChain filterChain
    ) throws ServletException, IOException {
        
        String token = extractToken(request);
        if (token != null) {
            try {
                Jwt jwt = jwtDecoder.decode(token);
                String tenantId = jwt.getClaim("tenantId"); // Tenant-ID aus Claim holen
                System.out.println("[DEBUG] Tenant-ID aus Token: " + tenantId);
                TenantContext.setCurrentTenant(tenantId); // In ThreadLocal speichern
            } catch (Exception e) {
               System.err.println("Error while extracting tenantId from token: " + e.getMessage());
            }
        }

        filterChain.doFilter(request, response);
        TenantContext.clear(); // Kontext nach Request bereinigen
    }

    private String extractToken(HttpServletRequest request) {
        String bearerToken = request.getHeader("Authorization");
        if (bearerToken != null && bearerToken.startsWith("Bearer ")) {
            return bearerToken.substring(7);
        }
        return null;
    }
}