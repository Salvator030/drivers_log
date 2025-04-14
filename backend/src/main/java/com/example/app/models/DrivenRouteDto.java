package com.example.app.models;

import java.util.Date;

public class DrivenRouteDto {
    
    private Long drivenRouteId;
   private Long routeId;
    private Date date;
     
    public DrivenRouteDto() {
    }


    public DrivenRouteDto(Long drivenRouteId, Long routeId, Date date) {
        this.drivenRouteId = drivenRouteId;
        this.routeId = routeId;
        this.date = date;
    }


    public Long getDrivenRouteId() {
        return drivenRouteId;
    }


    public void setDrivenRouteId(Long drivenRouteId) {
        this.drivenRouteId = drivenRouteId;
    }


    public Long getRouteId() {
        return routeId;
    }


    public void setRouteId(Long routeId) {
        this.routeId = routeId;
    }


    public Date getDate() {
        return date;
    }


    public void setDate(Date date) {
        this.date = date;
    }
   
    
    
    
}
