// src/main/java/com/example/Clinic_Back/Service/OffersService.java
package com.example.Clinic_Back.Service.auth;

import com.example.Clinic_Back.Entity.Offers;
import com.example.Clinic_Back.Repository.OffersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class OffersService {

    @Autowired
    private OffersRepository offersRepository;

    // Create or Update Offer
    public Offers saveOffer(Offers offer) {
        return offersRepository.save(offer);
    }

    // Get all Offers
    public List<Offers> getAllOffers() {
        return offersRepository.findAll();
    }

    // Get Offer by ID
    public Optional<Offers> getOfferById(String id) {
        return offersRepository.findById(id);
    }

    // Delete Offer by ID
    public void deleteOfferById(String id) {
        offersRepository.deleteById(id);
    }
}
