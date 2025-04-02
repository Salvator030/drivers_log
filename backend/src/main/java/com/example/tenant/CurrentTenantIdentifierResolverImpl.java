package com.example.tenant;

import org.hibernate.context.spi.CurrentTenantIdentifierResolver;
import org.springframework.stereotype.Component;

@Component
public class CurrentTenantIdentifierResolverImpl implements CurrentTenantIdentifierResolver {

    @Override
    public String resolveCurrentTenantIdentifier() {
        String tenantId = TenantContext.getCurrentTenant();
        // Fallback, falls kein Tenant gesetzt ist (z.B. für nicht-mandantenfähige Operationen)
        return tenantId != null ? tenantId : "default_tenant";
    }

    @Override
    public boolean validateExistingCurrentSessions() {
        return true; // Sicherheitsprüfung aktiviert
    }
}