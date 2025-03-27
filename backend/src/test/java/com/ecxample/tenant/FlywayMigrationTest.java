package com.ecxample.tenant;

import org.flywaydb.core.Flyway;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.context.SpringBootTest;
import javax.sql.DataSource;
import java.sql.SQLException;
import static org.junit.jupiter.api.Assertions.assertTrue;

@SpringBootTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
public class FlywayMigrationTest {

    @Autowired
    private DataSource dataSource;

    @Test
    void testV1Migration() throws SQLException {
        Flyway flyway = Flyway.configure()
                .dataSource(dataSource)
                .locations("db/migration/tenant")
                .load();

        // Führe Migrationen durch
        flyway.migrate();

        // Überprüfe, ob die Tabelle 'streets' existiert
        try (var connection = dataSource.getConnection();
             var rs = connection.getMetaData().getTables(null, null, "streets", null)) {
            assertTrue(rs.next(), "Tabelle 'streets' sollte existieren");
        }
    }
}