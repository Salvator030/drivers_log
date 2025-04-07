package com.example.tenant;

public class TenantContext {

    private static final ThreadLocal<String> currentTenant = new ThreadLocal<>();

    public static String getCurrentTenant() {
        return currentTenant.get();
    }

    public static void setCurrentTenant(String tenantId) {
        currentTenant.set(tenantId);
        
    }

    public static void clear() {
        currentTenant.remove();
    }




    // public static String getCurrentTenant() {
    //     Authentication auth = SecurityContextHolder.getContext().getAuthentication();
    //     if (auth != null && auth.getPrincipal() instanceof ApplicationUser) {
    //         ApplicationUser user = (ApplicationUser) auth.getPrincipal();
    //         return user.getTenantId();  // Tenant-ID aus User-Objekt
    //     }
    //     return null;
    // }
}