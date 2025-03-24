-- Tabelle für gefahrene Routen (abhängig von routes)
CREATE TABLE IF NOT EXISTS driven_routes (
    driven_route_id BIGINT PRIMARY KEY AUTO_INCREMENT,
    date DATE NOT NULL,
    route_id BIGINT NOT NULL,
    FOREIGN KEY (route_id) REFERENCES routes(route_id)
);