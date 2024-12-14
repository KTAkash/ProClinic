package com.example.Clinic_Back.Controller;

import com.example.Clinic_Back.Entity.Therapy;
import com.example.Clinic_Back.Service.auth.jwt.TherapyService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/therapy")
@CrossOrigin(origins = "*")
public class TherapyController {

    private final TherapyService therapyService;

    public TherapyController(TherapyService therapyService) {
        this.therapyService = therapyService;
    }

    // Create a new therapy
    @PostMapping("/post")
    public ResponseEntity<Therapy> createTherapy(@RequestBody Therapy therapy) {
        System.out.println("Received Therapy Data: " + therapy); // Debugging log
        Therapy createdTherapy = therapyService.createTherapy(therapy);
        return new ResponseEntity<>(createdTherapy, HttpStatus.CREATED); // Return 201 Created
    }

    // Get all therapies
    @GetMapping("/get")
    public ResponseEntity<List<Therapy>> getAllTherapies() {
        List<Therapy> therapies = therapyService.getAllTherapies();
        if (therapies.isEmpty()) {
            return ResponseEntity.noContent().build(); // 204 No Content if no therapies are found
        }
        return ResponseEntity.ok(therapies);
    }

    // Get a therapy by its ID
    @GetMapping("/get/{id}")
    public ResponseEntity<Therapy> getTherapyById(@PathVariable String id) {
        Therapy therapy = therapyService.getTherapyById(id);
        if (therapy != null) {
            return ResponseEntity.ok(therapy);
        } else {
            return ResponseEntity.notFound().build(); // Return 404 if therapy not found
        }
    }

    // Update a therapy
    @PutMapping("/{id}")
    public ResponseEntity<Therapy> updateTherapy(
            @PathVariable String id,
            @RequestBody Therapy therapy) {
        Therapy updatedTherapy = therapyService.updateTherapy(id, therapy);
        if (updatedTherapy != null) {
            return ResponseEntity.ok(updatedTherapy);
        } else {
            return ResponseEntity.notFound().build(); // Return 404 if therapy not found
        }
    }

    // Delete a therapy
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTherapy(@PathVariable String id) {
        boolean isDeleted = therapyService.deleteTherapy(id);
        if (isDeleted) {
            return ResponseEntity.noContent().build(); // Return 204 if deletion successful
        } else {
            return ResponseEntity.notFound().build(); // Return 404 if therapy not found
        }
    }
}
