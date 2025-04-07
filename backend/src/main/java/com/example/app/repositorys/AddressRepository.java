package com.example.app.repositorys;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.app.models.Address;
import com.example.app.models.Place;
import com.example.app.models.Plz;
import com.example.app.models.Street;

@Repository
public interface AddressRepository extends JpaRepository<Address, Long>{
    Optional<Address> findByName(String name);
    Optional<Address> findByAddressId(Long addressId);
    Optional<Address> findByPlz(Plz plz);
    Optional<Address> findByPlace(Place place);
    Optional<Address> findByStreet(Street street);
   

}
