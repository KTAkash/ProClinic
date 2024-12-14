package com.example.Clinic_Back.Repository;

import com.example.Clinic_Back.Entity.Offers;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OffersRepository extends MongoRepository<Offers, String> {
}
