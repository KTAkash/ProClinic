package com.example.Clinic_Back.Treatment.Treatment.TreatmentController;


import com.example.Clinic_Back.Controller.TreatmentController;
import com.example.Clinic_Back.Entity.Treatment;
import com.example.Clinic_Back.Entity.User;
import com.example.Clinic_Back.Repository.UserRepository;
import com.example.Clinic_Back.Service.auth.TreatmentService;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.ResponseEntity;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

public class TreatmentControllerTest {

    @Mock
    private TreatmentService treatmentService;

    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private TreatmentController treatmentController;

    public TreatmentControllerTest() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void testGetTreatmentsByPatientEmail() {
        String email = "patient@example.com";
        String patientId = "1";
        User user = new User();
        user.setId(patientId);

        Treatment treatment1 = new Treatment();
        Treatment treatment2 = new Treatment();

        when(userRepository.findByEmail(email)).thenReturn(Optional.of(user));
        when(treatmentService.getTreatmentsByPatientId(patientId)).thenReturn(Arrays.asList(treatment1, treatment2));

        ResponseEntity<List<Treatment>> response = treatmentController.getTreatmentsByPatientEmail(email);

        assertEquals(200, response.getStatusCodeValue());
        assertEquals(2, response.getBody().size());
        verify(userRepository, times(1)).findByEmail(email);
        verify(treatmentService, times(1)).getTreatmentsByPatientId(patientId);
    }

    @Test
    public void testGetTreatmentsByPatientId() {
        String patientId = "1";

        Treatment treatment1 = new Treatment();
        Treatment treatment2 = new Treatment();

        when(treatmentService.getTreatmentsByPatientId(patientId)).thenReturn(Arrays.asList(treatment1, treatment2));

        ResponseEntity<List<Treatment>> response = treatmentController.getTreatmentsByPatientId(patientId);

        assertEquals(200, response.getStatusCodeValue());
        assertEquals(2, response.getBody().size());
        verify(treatmentService, times(1)).getTreatmentsByPatientId(patientId);
    }

    @Test
    public void testCreateTreatment() {
        String patientId = "1";

        User user = new User();
        user.setId(patientId);

        Treatment treatment = new Treatment();
        treatment.setPatientId(patientId);

        Treatment createdTreatment = new Treatment();
        createdTreatment.setPatientId(patientId);

        when(userRepository.findById(patientId)).thenReturn(Optional.of(user));
        when(treatmentService.createTreatment(treatment)).thenReturn(createdTreatment);

        ResponseEntity<Treatment> response = treatmentController.createTreatment(patientId, treatment);

        assertEquals(200, response.getStatusCodeValue());
        assertNotNull(response.getBody());
        verify(userRepository, times(1)).findById(patientId);
        verify(treatmentService, times(1)).createTreatment(treatment);
    }

    @Test
    public void testUpdateTreatment() {
        String treatmentId = "1";
        Treatment treatmentDetails = new Treatment();
        Treatment updatedTreatment = new Treatment();

        when(treatmentService.updateTreatment(treatmentId, treatmentDetails)).thenReturn(updatedTreatment);

        ResponseEntity<Treatment> response = treatmentController.updateTreatment(treatmentId, treatmentDetails);

        assertEquals(200, response.getStatusCodeValue());
        assertNotNull(response.getBody());
        verify(treatmentService, times(1)).updateTreatment(treatmentId, treatmentDetails);
    }

    @Test
    public void testDeleteTreatment() {
        String treatmentId = "1";

        doNothing().when(treatmentService).deleteTreatment(treatmentId);

        ResponseEntity<Void> response = treatmentController.deleteTreatment(treatmentId);

        assertEquals(204, response.getStatusCodeValue());
        verify(treatmentService, times(1)).deleteTreatment(treatmentId);
    }
}

