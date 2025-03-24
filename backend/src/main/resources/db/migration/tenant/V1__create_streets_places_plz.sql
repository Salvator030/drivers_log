-- Tabelle für Straßen
CREATE TABLE streets (
    street_id BIGINT PRIMARY KEY AUTO_INCREMENT,
    street_name VARCHAR(255) UNIQUE NOT NULL
);

-- Tabelle für Orte
CREATE TABLE places (
    place_id BIGINT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL
);

-- Tabelle für Postleitzahlen
CREATE TABLE plz (
    plz_id BIGINT PRIMARY KEY AUTO_INCREMENT,
    plz VARCHAR(10) UNIQUE NOT NULL
);