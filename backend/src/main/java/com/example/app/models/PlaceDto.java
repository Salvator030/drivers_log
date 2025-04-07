package com.example.app.models;

public class PlaceDto {
    
        private Long placeId;
        private String name;
    
        public PlaceDto() {
        }
    
        public PlaceDto(Long placeId, String name) {
            this.placeId = placeId;
            this.name = name;
        }
    
        public Long getPlaceId() {
            return placeId;
        }
    
        public void setPlaceId(Long placeId) {
            this.placeId = placeId;
        }
    
        public String getName() {
            return name;
        }
    
        public void setName(String name) {
            this.name = name;
        }
}
