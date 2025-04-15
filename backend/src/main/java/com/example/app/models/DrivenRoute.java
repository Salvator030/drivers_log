package com.example.app.models;

import java.util.Date;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "driven_routes")
public class DrivenRoute {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "driven_route_id")   
    private Long drivenRouteId;

    private Date date;

    @ManyToOne
    @JoinColumn(name = "route_id")
    private Route route;

    public DrivenRoute() {}

    public DrivenRoute(Date date, Route route) {
        this.date = date;
        this.route = route;
    }

    public Long getDrivenRouteId() {
        return drivenRouteId;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public Route getRoute() {
        return route;
    }

    public void setRoute(Route route) {
        this.route = route;
    }

    

}
