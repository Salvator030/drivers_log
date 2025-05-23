package com.example.app.models;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "routes")
public class Route {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "route_id")
    private Long routeId;
;

    @ManyToOne
    @JoinColumn(name = "start_address_id")
    private Address startAddress;

    @ManyToOne
    @JoinColumn(name = "destination_address_id")
    private Address destinationAddress;

    private double distance;

    public Route() {
    }

    public Route( Address startAddress, Address destinationAddress, double distance) {
 
        this.startAddress = startAddress;
        this.destinationAddress = destinationAddress;
        this.distance = distance;
    }

    public Long getRouteId() {
        return routeId;
    }

    public Address getStartAddress() {
        return startAddress;
    }

    public void setStartAddress(Address startAddress) {
        this.startAddress = startAddress;
    }

    public Address getDestinationAddress() {
        return destinationAddress;
    }

    public void setDestinationAddress(Address destinationAddress) {
        this.destinationAddress = destinationAddress;
    }

    public double getDistance() {
        return distance;
    }

    public void setDistance(double distance) {
        this.distance = distance;
    }

    
}
