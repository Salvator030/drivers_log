package com.example;

import java.util.HashSet;
import java.util.Set;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.transaction.PlatformTransactionManager;

import com.example.security.models.Role;
import com.example.security.repository.RoleRepository;
import com.example.security.repository.UserRepository;

import jakarta.transaction.Transactional;

@SpringBootApplication

public class AuthenticatedBackendApplication {
	public static void main(String[] args) {
		SpringApplication.run(AuthenticatedBackendApplication.class, args);
	}

	@Bean
	@Transactional
	CommandLineRunner run(RoleRepository roleRepository, UserRepository userRepository, PasswordEncoder passwordEncode, @Qualifier("tenantTransactionManager") PlatformTransactionManager transactionManager){
		return args ->{
			if (roleRepository.findByAuthority("ROLE_ADMIN").isPresent()) return;

			// Rollen mit Präfix erstellen und speichern
			Role adminRole = roleRepository.save(new Role("ROLE_ADMIN"));
			Role userRole = roleRepository.save(new Role("ROLE_USER")); // Explizit speichern
	
			Set<Role> adminRoles = new HashSet<>();
			adminRoles.add(adminRole);
	

			// ApplicationUser admin = new ApplicationUser( "admin", passwordEncode.encode("password"), roles);
			//userRepository.save(admin);
		};
	}
}
