package com.unkownkoder.tenant.utils;

import org.apache.commons.codec.digest.DigestUtils;

public class TenantUtils {

    public static String hashTenantId(String tenantId) {
        // SHA-256 + Hex-Codierung (nur 0-9, a-f)
        return DigestUtils.sha256Hex(tenantId);
    }
}