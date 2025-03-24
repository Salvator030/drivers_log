-- Tabelle für Adressen (abhängig von streets, places, plz)
CREATE TABLE addresses (
    address_id BIGINT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    house_number VARCHAR(50) NOT NULL,
    street_id BIGINT NOT NULL,
    plz_id BIGINT NOT NULL,
    place_id BIGINT NOT NULL,
    FOREIGN KEY (street_id) REFERENCES streets(street_id),
    FOREIGN KEY (plz_id) REFERENCES plz(plz_id),
    FOREIGN KEY (place_id) REFERENCES places(place_id)
);