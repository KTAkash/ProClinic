// src/main/java/com/example/Clinic_Back/Controller/OffersController.java
package com.example.Clinic_Back.Controller;

import com.example.Clinic_Back.Entity.Offers;
import com.example.Clinic_Back.Service.auth.OffersService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/offer")
@RequiredArgsConstructor
public class OffersController {

    @Autowired
    private OffersService offersService;

    // Endpoint to create or update an offer
    @PostMapping("/create")
    public ResponseEntity<Offers> createOffer(@RequestBody Offers offer) {
        Offers savedOffer = offersService.saveOffer(offer);
        return ResponseEntity.ok(savedOffer);
    }

    // Endpoint to retrieve all offers
    @GetMapping("/get")
    public ResponseEntity<List<Offers>> getAllOffers() {
        List<Offers> offersList = offersService.getAllOffers();
        return ResponseEntity.ok(offersList);
    }

    // Endpoint to retrieve a specific offer by ID
    @GetMapping("/get/{id}")
    public ResponseEntity<Offers> getOfferById(@PathVariable String id) {
        Optional<Offers> offer = offersService.getOfferById(id);
        return offer.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Endpoint to delete an offer by ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteOffer(@PathVariable String id) {
        offersService.deleteOfferById(id);
        return ResponseEntity.noContent().build();
    }
}
