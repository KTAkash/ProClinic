package com.example.Clinic_Back.Repository;

import com.example.Clinic_Back.Entity.Invoice;
import org.springframework.data.mongodb.repository.MongoRepository;
public interface InvoiceRepository extends MongoRepository<Invoice, String> {
}