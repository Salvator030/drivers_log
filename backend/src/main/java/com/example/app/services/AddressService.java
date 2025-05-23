package com.example.app.services;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.app.models.Address;
import com.example.app.models.AddressDTO;
import com.example.app.models.Place;
import com.example.app.models.Plz;
import com.example.app.models.Street;
import com.example.app.repositorys.AddressRepository;
import com.example.app.repositorys.PlaceRepository;
import com.example.app.repositorys.PlzRepository;
import com.example.app.repositorys.StreetRepository;

@Service
public class AddressService {

    @Autowired
    AddressRepository addressRepository;

    @Autowired
    StreetRepository streetRepository;

    @Autowired
    PlzRepository plzRepository;

    @Autowired
    PlaceRepository placeRepository;

    public Address create(AddressDTO body) {
        return addressRepository.save(convertToEtentity(body));
    }

    private Address convertToEtentity(AddressDTO body) {
        Address address = new Address();
        address.setName(body.getName());

        Street street = null;
        if (body.getExistingStreetsId() != null) {
            street = streetRepository.findByStreetId(body.getExistingStreetsId())
                    .orElseThrow(() -> new RuntimeException("Street mit ID " + body.getExistingStreetsId() + " nicht gefunden"));

        } else {
            String streetName = body.getStreet();
            Optional<Street> existingStreet = streetRepository.findByStreetName(streetName);
            street = existingStreet.isPresent() ? existingStreet.get() : streetRepository.save(new Street(body.getStreet()));

        }
        address.setStreet(street);

        address.setHouseNumber(body.getHouseNumber());

        Plz plz = null;
        if (body.getExistingPlzId() != null) {
            plz = plzRepository.findByPlzId(body.getExistingPlzId())
                    .orElseThrow(() -> new RuntimeException("Plz mit ID " + body.getExistingPlzId() + " nicht gefunden"));

        } else {
            String plzValue = body.getPlz();
            Optional<Plz> existingPlz = plzRepository.findByPlz(plzValue);
            plz = existingPlz.isPresent() ? existingPlz.get() : plzRepository.save(new Plz(body.getPlz()));
        }
        address.setPlz(plz);

        Place place = null;
        if (body.getExistingPlaceId() != null) {
            place = placeRepository.findByPlaceId(body.getExistingPlzId())
                    .orElseThrow(() -> new RuntimeException("Place mit ID " + body.getExistingPlaceId() + " nicht gefunden"));
            address.setPlace(place);
        } else {
            String plaveName = body.getPlace();
            Optional<Place> existingPlace = placeRepository.findByName(plaveName);
            place = existingPlace.isPresent() ? existingPlace.get() : placeRepository.save(new Place(body.getPlace()));
        }
        address.setPlace(place);

        address.setInfo(body.getInfo());

        return address;

    }

    public List<AddressDTO> getAllAddresses() {
        List<Address> addresses = addressRepository.findAll();
        return addresses.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    private AddressDTO convertToDTO(Address address) {
        AddressDTO dto = new AddressDTO();
        dto.setAddressId(address.getAddressId());

        dto.setName(address.getName());
        dto.setStreet(address.getStreet().getStreetName());
        dto.setExistingStreetsId(address.getStreet().getStreetId());
        dto.setHouseNumber(address.getHouseNumber());
        dto.setPlz(address.getPlz().getPlz());
        dto.setExistingPlzId(address.getPlz().getPlzId());

        dto.setPlace(address.getPlace().getName());
        dto.setExistingPlaceId(address.getPlace().getPlaceId());
        dto.setInfo(address.getInfo());

        return dto;
    }

    public AddressDTO createAddress(AddressDTO addressDTO) {
        Address address = convertToEtentity(addressDTO); // Konvertiere DTO → Entity
        Address savedAddress = addressRepository.save(address);
        return convertToDTO(savedAddress); // Konvertiere Entity → DTO mit ID
    }
}
