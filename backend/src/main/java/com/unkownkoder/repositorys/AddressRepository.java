package com.unkownkoder.repositorys;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.unkownkoder.models.Address;
import com.unkownkoder.models.Place;
import com.unkownkoder.models.Plz;
import com.unkownkoder.models.Street;

@Repository
public interface AddressRepository extends JpaRepository<Address, Long>{
    Optional<Address> findByName(String name);
    Optional<Address> findByAddressId(Long addressId);
    Optional<Address> findByPlz(Plz plz);
    Optional<Address> findByPlace(Place place);
    Optional<Address> findByStreet(Street street);
   

}
