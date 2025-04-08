-- Tabelle für Routen (abhängig von addresses)
CREATE TABLE IF NOT EXISTS routes (
    route_id BIGINT PRIMARY KEY AUTO_INCREMENT,
    start_address_id BIGINT NOT NULL,
    destination_address_id BIGINT NOT NULL,
    distance DOUBLE NOT NULL,
    FOREIGN KEY (start_address_id) REFERENCES addresses(address_id),
    FOREIGN KEY (destination_address_id) REFERENCES addresses(address_id)
);