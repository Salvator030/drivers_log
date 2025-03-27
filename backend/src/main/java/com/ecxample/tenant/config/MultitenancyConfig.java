package com.ecxample.tenant.config;

import java.util.HashMap;
import java.util.Map;
import java.util.Properties;

import javax.sql.DataSource;

import org.springframework.boot.jdbc.DataSourceBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.jdbc.datasource.LazyConnectionDataSourceProxy;
import org.springframework.jdbc.datasource.lookup.AbstractRoutingDataSource;
import org.springframework.orm.jpa.JpaTransactionManager;
import org.springframework.orm.jpa.LocalContainerEntityManagerFactoryBean;
import org.springframework.orm.jpa.vendor.HibernateJpaVendorAdapter;
import org.springframework.transaction.PlatformTransactionManager;

import com.ecxample.tenant.TenantContext;

@Configuration
@EnableJpaRepositories(
    basePackages = "com.ecxample.repositorys", // Tenant-Repositories
    entityManagerFactoryRef = "tenantEntityManager",
    transactionManagerRef = "tenantTransactionManager"
)
public class MultitenancyConfig {

    @Bean(name = "masterDataSource")
    public DataSource masterDataSource() {
        return DataSourceBuilder.create()
                .url("jdbc:mysql://localhost:3306/login_db")
                .username("root")
                .password("")
                .driverClassName("com.mysql.cj.jdbc.Driver")
                .build();
    }

    @Bean
    @Primary
    public DataSource dataSource() {
        AbstractRoutingDataSource routingDataSource = new AbstractRoutingDataSource() {
            @Override
            protected Object determineCurrentLookupKey() {
                return TenantContext.getCurrentTenant();
            }
            // private final Map<Object, Object> dynamicDataSources = new HashMap<>();

            // {
            //     // Initial nur die Master-DB
            //     dynamicDataSources.put("master", masterDataSource());
            //     this.setTargetDataSources(dynamicDataSources);
            //     this.setDefaultTargetDataSource(masterDataSource());
            // }

            // @Override
            // protected Object determineCurrentLookupKey() {
            //     return TenantContext.getCurrentTenant() != null 
            //             ? TenantContext.getCurrentTenant() 
            //             : "master";
            // }

            // @Override
            // protected DataSource determineTargetDataSource() {
            //     String tenantId = (String) determineCurrentLookupKey();
            //     if (!dynamicDataSources.containsKey(tenantId)) {
            //         DataSource tenantDataSource = createTenantDataSource(tenantId);
            //         dynamicDataSources.put(tenantId, tenantDataSource);
            //         super.afterPropertiesSet(); // Wichtig: DataSources aktualisieren
            //     }
            //     return (DataSource) dynamicDataSources.get(tenantId);
            // }
        };
          Map<Object, Object> targetDataSources = new HashMap<>();
        targetDataSources.put("master", masterDataSource());

        routingDataSource.setTargetDataSources(targetDataSources);
        routingDataSource.setDefaultTargetDataSource(masterDataSource());
        routingDataSource.afterPropertiesSet();
        
        return routingDataSource;
    }

    private DataSource createTenantDataSource(String tenantId) {
        return DataSourceBuilder.create()
                .url("jdbc:mysql://localhost:3306/" + tenantId)
                .username("root")
                .password("")
                .driverClassName("com.mysql.cj.jdbc.Driver")
                .build();
    }

    @Bean
    public DataSource tenantDataSource() {
        return new LazyConnectionDataSourceProxy(dataSource());
    }

    @Bean(name = "tenantEntityManager")
    @Primary 
    public LocalContainerEntityManagerFactoryBean tenantEntityManager() {
        LocalContainerEntityManagerFactoryBean em = new LocalContainerEntityManagerFactoryBean();
        em.setDataSource(tenantDataSource());
        em.setPackagesToScan("com.ecxample.models");
        em.setJpaVendorAdapter(new HibernateJpaVendorAdapter());

        Properties props = new Properties();
        props.put("hibernate.hbm2ddl.auto", "none");
        props.put("hibernate.dialect", "org.hibernate.dialect.MySQLDialect"); 
        em.setJpaProperties(props);

        return em;
    }

    @Bean(name = "tenantTransactionManager")
    @Primary
    public PlatformTransactionManager tenantTransactionManager() {
        JpaTransactionManager tm = new JpaTransactionManager();
        tm.setEntityManagerFactory(tenantEntityManager().getObject());
        return tm;
    }
}
