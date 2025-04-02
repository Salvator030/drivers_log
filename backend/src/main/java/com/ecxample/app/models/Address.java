package com.ecxample.app.models;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "addresses")
public class Address {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "address_id")
    private Long addressId;

    private String name;

    @ManyToOne 
    @JoinColumn(name = "street_id") // Name de
    private Street street;

    private String houseNumber;

    @ManyToOne 
    @JoinColumn(name = "plz_id") // Name de
    private Plz plz;

    @ManyToOne 
    @JoinColumn(name = "place_id") // Name de
    private Place place;

protected Address() {}

    public Address(String name, Street street, String houseNumber, Plz plz, Place place) {
        this.name = name;
        this.street = street;
        this.houseNumber = houseNumber;
        this.plz = plz;
        this.place = place;
    }

    public Long getAddressId() {
        return addressId;
    }


    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Street getStreet() {
        return street;
    }

    public void setStreet(Street street) {
        this.street = street;
    }

    public String getHouseNumber() {
        return houseNumber;
    }

    public void setHouseNumber(String houseNumber) {
        this.houseNumber = houseNumber;
    }

    public Plz getPlz() {
        return plz;
    }

    public void setPlz(Plz plz) {
        this.plz = plz;
    }

    public Place getPlace() {
        return place;
    }

    public void setPlace(Place place) {
        this.place = place;
    }

    

}
