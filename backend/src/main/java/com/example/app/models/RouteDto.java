package com.example.app.models;

public class RouteDto {
    long routeId;
    long startAddressId;
    long endAddressId;
    double distance;

    public RouteDto() {
    }
    public RouteDto(long routeId, long startAddressId, long endAddressId, double distance) {
        this.routeId = routeId;
        this.startAddressId = startAddressId;
        this.endAddressId = endAddressId;
        this.distance = distance;
    }
    public long getRouteId() {
        return routeId;
    }
    public void setRouteId(long routeId) {
        this.routeId = routeId;
    }
    public long getStartAddressId() {
        return startAddressId;
    }
    public void setStartAddressId(long startAddressId) {
        this.startAddressId = startAddressId;
    }
    public long getEndAddressId() {
        return endAddressId;
    }
    public void setEndAddressId(long endAddressId) {
        this.endAddressId = endAddressId;
    }
    public double getDistance() {
        return distance;
    }
    public void setDistance(double distance) {
        this.distance = distance;
    }


    
}

