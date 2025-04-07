package com.example.security.models;

public class RegistrationDTO {
    private String username;
    private String password;
    private String tenantId;

    public RegistrationDTO(){
        super();
    }

    public RegistrationDTO(String username, String password, String tenantId){
        super();
        this.username = username;
        this.password = password;
        this.tenantId = tenantId;
    }

    public String getUsername(){
        return this.username;
    }

    public void setUsername(String username){
        this.username = username;
    }

    public String getPassword(){
        return this.password;
    }

    public void setPassword(String password){
        this.password = password;
    }

    public String getTenantId(){
        return this.tenantId;
    }

    public void setTenantId(String tenantId){
        this.tenantId = tenantId;
    }

    public String toString(){
        return "Registration info: username: " + this.username + " password: " + this.password + " tenantId: " + this.tenantId;
    }
}
