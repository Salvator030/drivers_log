package com.ecxample.app.repositorys;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ecxample.app.models.Address;
import com.ecxample.app.models.Place;
import com.ecxample.app.models.Plz;
import com.ecxample.app.models.Street;

@Repository
public interface AddressRepository extends JpaRepository<Address, Long>{
    Optional<Address> findByName(String name);
    Optional<Address> findByAddressId(Long addressId);
    Optional<Address> findByPlz(Plz plz);
    Optional<Address> findByPlace(Place place);
    Optional<Address> findByStreet(Street street);
   

}
