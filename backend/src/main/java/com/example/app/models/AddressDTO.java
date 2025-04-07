package com.example.app.models;

public class AddressDTO {
    private Long addressId;
    private String name;
    private Long existingStreetsId;
    private String street;
    private String houseNumber;
    private Long existingPlzId;
    private String plz;
    private Long existingPlaceId;
    private String place;
    private String info;

    public AddressDTO() {
     
    }

    public Long getAddressId() {
        return addressId;
    }

    public void setAddressId(Long addressId) {
        this.addressId = addressId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Long getExistingStreetsId() {
        return existingStreetsId;
    }

    public void setExistingStreetsId(Long existingStreetsId) {
        this.existingStreetsId = existingStreetsId;
    }

    public String getStreet() {
        return street;
    }

    public void setStreet(String street) {
        this.street = street;
    }

    public String getHouseNumber() {
        return houseNumber;
    }

    public void setHouseNumber(String houseNumber) {
        this.houseNumber = houseNumber;
    }

    public Long getExistingPlzId() {
        return existingPlzId;
    }

    public void setExistingPlzId(Long existingPlzId) {
        this.existingPlzId = existingPlzId;
    }

    public String getPlz() {
        return plz;
    }

    public void setPlz(String plz) {
        this.plz = plz;
    }

    public Long getExistingPlaceId() {
        return existingPlaceId;
    }

    public void setExistingPlaceId(Long existingPlaceId) {
        this.existingPlaceId = existingPlaceId;
    }

    public String getPlace() {
        return place;
    }

    public void setPlace(String place) {
        this.place = place;
    }

    public String getInfo() {
        return info;
    }

    public void setInfo(String info) {
        this.info = info;
    }

}
