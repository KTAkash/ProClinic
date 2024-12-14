package com.example.Clinic_Back.Service.auth.jwt;

import com.example.Clinic_Back.Entity.Therapy;
import com.example.Clinic_Back.Repository.TherapyRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TherapyService {

    private final TherapyRepository therapyRepository;

    public TherapyService(TherapyRepository therapyRepository) {
        this.therapyRepository = therapyRepository;
    }

    // Create a new therapy
    public Therapy createTherapy(Therapy therapy) {
        return therapyRepository.save(therapy);
    }

    // Get all therapies
    public List<Therapy> getAllTherapies() {
        return therapyRepository.findAll();
    }

    // Get a therapy by its ID
    public Therapy getTherapyById(String id) {
        Optional<Therapy> therapy = therapyRepository.findById(id);
        return therapy.orElse(null);
    }

    // Update a therapy
    public Therapy updateTherapy(String id, Therapy therapy) {
        Optional<Therapy> existingTherapyOpt = therapyRepository.findById(id);
        if (existingTherapyOpt.isPresent()) {
            Therapy existingTherapy = existingTherapyOpt.get();
            existingTherapy.setPatientName(therapy.getPatientName());
            existingTherapy.setTitleOfTherapy(therapy.getTitleOfTherapy());
            existingTherapy.setPatientPhone(therapy.getPatientPhone());
            existingTherapy.setPatientAddress(therapy.getPatientAddress());
            return therapyRepository.save(existingTherapy);
        }
        return null;  // Return null if therapy not found
    }

    // Delete a therapy
    public boolean deleteTherapy(String id) {
        therapyRepository.deleteById(id);
        return false;
    }
}
