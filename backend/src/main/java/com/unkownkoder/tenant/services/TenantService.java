package com.unkownkoder.tenant.services;

import java.sql.Connection;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.Properties;

import javax.sql.DataSource;

import org.flywaydb.core.Flyway;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.jdbc.DataSourceBuilder;
import org.springframework.orm.jpa.LocalContainerEntityManagerFactoryBean;
import org.springframework.orm.jpa.vendor.HibernateJpaVendorAdapter;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.unkownkoder.tenant.utils.TenantUtils;

@Service
public class TenantService {

    @Autowired
    PasswordEncoder passwordEncoder;

    private final DataSource masterDataSource; // Injizierte DataSource

    // Konstruktor-Injection mit @Qualifier
    public TenantService(@Qualifier("masterDataSource") DataSource masterDataSource) {
        this.masterDataSource = masterDataSource;
    }

    public void createTenantDatabase(String tenantId) throws Exception {
        // Beispiel für PostgreSQL
        String encodedDbName = TenantUtils.hashTenantId(tenantId);
        String jdbcUrl = "jdbc:mysql://localhost:3306/" + encodedDbName;

        try (Connection conn = masterDataSource.getConnection(); Statement stmt = conn.createStatement()) {

            // 1. Datenbank erstellen
            stmt.execute("CREATE DATABASE " + encodedDbName);

            // 2. Schema in der neuen DB initialisieren (z.B. mit Flyway/Liquibase)
            DataSource newDbDataSource = DataSourceBuilder.create()
                    .url(jdbcUrl)
                    .username("root")
                    .password("")
                    .build();

            LocalContainerEntityManagerFactoryBean em = new LocalContainerEntityManagerFactoryBean();
            em.setDataSource(newDbDataSource);
            em.setPackagesToScan("com.unkownkoder.models"); // Nur Tenant-Entities scannen
            em.setJpaVendorAdapter(new HibernateJpaVendorAdapter());

            // Aktiviere Hibernate DDL-Auto NUR für Tenant-DBs
            Properties hibernateProps = new Properties();
            hibernateProps.put("hibernate.hbm2ddl.auto", "update");

            em.setJpaProperties(hibernateProps);
            em.afterPropertiesSet();

            Flyway flyway = Flyway.configure()
                    .dataSource(newDbDataSource)
                    .locations("classpath:db/migration/tenant")
                    .load();
            flyway.migrate();

            // 3. In Master-DB als Tenant registrieren
        } catch (SQLException e) {
            throw new Exception("Failed to create DB for tenant " + tenantId, e);
        }
    }
}
