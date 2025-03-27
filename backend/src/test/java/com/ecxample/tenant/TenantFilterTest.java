package com.ecxample.tenant;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.web.servlet.MockMvc;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
public class TenantFilterTest {

    @Autowired
    private MockMvc mockMvc;

    @Test
    void tenantFilter_ShouldSetTenantContext() throws Exception {
        mockMvc.perform(get("/api/test")
               .header("X-Tenant-ID", "tenant1"))
               .andExpect(status().isOk());

        // Hier könntest du den TenantContext überprüfen, falls möglich
    }

    @Test
    void tenantFilter_ShouldFailWithoutHeader() throws Exception {
        mockMvc.perform(get("/api/test"))
               .andExpect(status().isForbidden());
    }
}