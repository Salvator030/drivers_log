package com.example.app.repositorys;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.NoRepositoryBean;


   
    @NoRepositoryBean // 👈 Nur hier verwenden!
    public interface BaseRepository<T, ID> extends JpaRepository<T, ID> {
         
    }
