package com.example.security.models;

import java.util.Collection;
import java.util.HashSet;
import java.util.Set;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.Table;

@Entity
@Table(name="users")
public class ApplicationUser implements UserDetails{

    @Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "user_id") // Name muss genau mit der DB-Spalte übereinstimmen
	private Integer userId;

	@Column(unique=true)
    private String username;
    private String password;

    @ManyToMany(fetch=FetchType.EAGER)
    @JoinTable(
        name="user_role_junction",
        joinColumns = {@JoinColumn(name="user_id")},
        inverseJoinColumns = {@JoinColumn(name="role_id")}
    )
    private Set<Role> authorities;

	@Column(name = "tenant_id", unique = true)
    private String tenantId;  // Neue Tenant-ID

    public ApplicationUser() {
		super();
		authorities = new HashSet<>();
	}
	

	public ApplicationUser( String username, String password, Set<Role> authorities,  String tenantId) {
		super();
	
		this.username = username;
		this.password = password;
		this.authorities = authorities; 
		this.tenantId = tenantId;
	}

    public Integer getUserId() {
		return this.userId;
	}
	
	public void setId(Integer userId) {
		this.userId = userId;
	}
	
	public void setAuthorities(Set<Role> authorities) {
		this.authorities = authorities; 
	}

	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		// TODO Auto-generated method stub
		return this.authorities;
	}

	@Override
	public String getPassword() {
		// TODO Auto-generated method stub
		return this.password;
	}
	
	public void setPassword(String password) {
		this.password = password;
	}

	@Override
	public String getUsername() {
		// TODO Auto-generated method stub
		return this.username;
	}
	
	public void setUsername(String username) {
		this.username = username;
	}

	public String getTenantId() {
        return tenantId;
    }

    public void setTenantId(String tenantId) {
        this.tenantId = tenantId;
    }
	
	/* If you want account locking capabilities create variables and ways to set them for the methods below */
	@Override
	public boolean isAccountNonExpired() {
		// TODO Auto-generated method stub
		return true;
	}

	@Override
	public boolean isAccountNonLocked() {
		// TODO Auto-generated method stub
		return true;
	}

	@Override
	public boolean isCredentialsNonExpired() {
		// TODO Auto-generated method stub
		return true;
	}

	@Override
	public boolean isEnabled() {
		// TODO Auto-generated method stub
		return true;
	}
    
}
