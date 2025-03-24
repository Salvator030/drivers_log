package com.unkownkoder.config;

import java.util.Properties;

import javax.sql.DataSource;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.jdbc.DataSourceBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.orm.jpa.JpaTransactionManager;
import org.springframework.orm.jpa.LocalContainerEntityManagerFactoryBean;
import org.springframework.orm.jpa.vendor.HibernateJpaVendorAdapter;
import org.springframework.transaction.PlatformTransactionManager;

@Configuration
@EnableJpaRepositories(
    basePackages ="com.unkownkoder.security.repository", // Nur Haupt-DB-Entities
    entityManagerFactoryRef = "mainEntityManager",
    transactionManagerRef = "mainTransactionManager"
)
public class MainDbConfig {

    // Haupt-DB: login_db (enthält Benutzer, Tenants-Metadaten)
    @Bean(name = "mainDataSource")
    @ConfigurationProperties(prefix = "spring.datasource.main")
    public DataSource mainDataSource() {
        return DataSourceBuilder.create().build();
    }

    // EntityManager für die Haupt-DB
    @Bean(name = "mainEntityManager")
    public LocalContainerEntityManagerFactoryBean mainEntityManager() {
        LocalContainerEntityManagerFactoryBean em = new LocalContainerEntityManagerFactoryBean();
        em.setDataSource(mainDataSource());
        em.setPackagesToScan("com.unkownkoder.security.models"); // Wichtig: Keine Tenant-Entities!
        em.setJpaVendorAdapter(new HibernateJpaVendorAdapter());

        Properties props = new Properties();
        props.put("hibernate.hbm2ddl.auto", "none");
        props.put("hibernate.dialect", "org.hibernate.dialect.MySQLDialect"); 
        em.setJpaProperties(props);

        return em;
    }

    // TransactionManager für die Haupt-DB
    @Bean(name = "mainTransactionManager")
    public PlatformTransactionManager mainTransactionManager() {
        JpaTransactionManager tm = new JpaTransactionManager();
        tm.setEntityManagerFactory(mainEntityManager().getObject());
        return tm;
    }
}