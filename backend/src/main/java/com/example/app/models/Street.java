package com.example.app.models;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "streets")
public class Street {

    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    @Column(name = "street_id")
    private Long streetId;

    @Column(name = "street_name", unique=true)
    private String streetName;

    protected Street() {
    }
    public Street(String streetName) {
        this.streetName = streetName;
    }

    public Long getStreetId() {
        return streetId;
    }



    public String getStreetName() {
        return streetName;
    }

    public void setStreetName(String streetName) {
        this.streetName = streetName;
    }

}
