package com.example.app.models;

public class PlzDto {

    private Long plzId;
    private String name;

    public PlzDto() {
    }

    public PlzDto(Long plzId, String name) {
        this.plzId = plzId;
        this.name = name;
    }

    public Long getPlzId() {
        return plzId;
    }

    public void setPlzId(Long plzId) {
        this.plzId = plzId;
    }

    public String getName() {
        return name;
    }

    public void setName(String plz) {
        this.name = plz;
    }
    
}
