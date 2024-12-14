package com.example.Clinic_Back.Repository;

import com.example.Clinic_Back.Entity.InventoryItem;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface InventoryRepository extends MongoRepository<InventoryItem, String> {
}

