package com.example.app.models;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "plz")
public class Plz {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "plz_id")
    private Long plzId;

    @Column(unique=true)
    private String plz;
    
    protected Plz() {}

    public Plz( String plz) {

        this.plz = plz;
    }

    public Long getPlzId() {
        return this.plzId;
    }


    public String getPlz() {
        return this.plz;
    }

    public void setPlz(String plz) {
        this.plz = plz;
    }

}
