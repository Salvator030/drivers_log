package com.unkownkoder.config;

import java.util.HashMap;
import java.util.Map;

import javax.sql.DataSource;

import org.springframework.boot.jdbc.DataSourceBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.jdbc.datasource.LazyConnectionDataSourceProxy;
import org.springframework.jdbc.datasource.lookup.AbstractRoutingDataSource;

import com.unkownkoder.tenant.TenantContext;

@Configuration
public class MultitenancyConfig {

    @Bean
    @Primary
    public DataSource dataSource() {
        AbstractRoutingDataSource routingDataSource = new AbstractRoutingDataSource() {
            @Override
            protected Object determineCurrentLookupKey() {
                String tenantId = TenantContext.getCurrentTenant();
                return tenantId != null ? tenantId : "master";
            }
        };

        Map<Object, Object> targetDataSources = new HashMap<>();
        routingDataSource.setTargetDataSources(targetDataSources);
        routingDataSource.setDefaultTargetDataSource(masterDataSource()); // Fallback-DB

        return routingDataSource;
    }

    @Bean
    public DataSource tenantDataSource() {
        return new LazyConnectionDataSourceProxy(dataSource());
    }

    @Bean(name = "masterDataSource")
    public DataSource masterDataSource() {
        // Konfiguration für die Master-DB (enthält Tabelle "tenants")
        return DataSourceBuilder.create()
                .url("jdbc:mysql://localhost:3306/login_db")
                .username("root")
                .password("")
                .build();
    }
}
