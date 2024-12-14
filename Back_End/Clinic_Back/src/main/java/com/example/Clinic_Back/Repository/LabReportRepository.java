package com.example.Clinic_Back.Repository;

import com.example.Clinic_Back.Entity.LabReport;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface LabReportRepository extends MongoRepository<LabReport, String> {
    List<LabReport> findByPatientId(String patientId);
}
