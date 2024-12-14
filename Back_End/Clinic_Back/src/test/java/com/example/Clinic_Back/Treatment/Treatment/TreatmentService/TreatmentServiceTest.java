package com.example.Clinic_Back.Treatment.Treatment.TreatmentService;


import com.example.Clinic_Back.Entity.Treatment;
import com.example.Clinic_Back.Repository.TreatmentRepository;
import com.example.Clinic_Back.Service.auth.TreatmentService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Arrays;
import java.util.Date;
import java.util.NoSuchElementException;
import java.util.Optional;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

public class TreatmentServiceTest {

    @Mock
    private TreatmentRepository treatmentRepository;

    @InjectMocks
    private TreatmentService treatmentService;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void testGetTreatmentsByPatientId() {
        String patientId = "1";
        Treatment treatment1 = new Treatment();
        Treatment treatment2 = new Treatment();

        when(treatmentRepository.findByPatientId(patientId)).thenReturn(Arrays.asList(treatment1, treatment2));

        List<Treatment> treatments = treatmentService.getTreatmentsByPatientId(patientId);

        assertEquals(2, treatments.size());
        verify(treatmentRepository, times(1)).findByPatientId(patientId);
    }

    @Test
    public void testCreateTreatment() {
        Treatment treatment = new Treatment();
        Treatment savedTreatment = new Treatment();
        savedTreatment.setId("1");

        when(treatmentRepository.save(treatment)).thenReturn(savedTreatment);

        Treatment result = treatmentService.createTreatment(treatment);

        assertNotNull(result);
        assertEquals("1", result.getId());
        verify(treatmentRepository, times(1)).save(treatment);
    }

    @Test
    public void testUpdateTreatment() throws ParseException {
        String treatmentId = "1";
        Treatment existingTreatment = new Treatment();
        existingTreatment.setId(treatmentId);

        Treatment updatedDetails = new Treatment();
        updatedDetails.setDoctorName("Dr. Smith");
        updatedDetails.setTreatmentDate(parseDate("2024-12-08"));
        updatedDetails.setNextTreatmentDate(parseDate("2025-01-08"));
        updatedDetails.setDescription("Routine checkup");

        when(treatmentRepository.findById(treatmentId)).thenReturn(Optional.of(existingTreatment));
        when(treatmentRepository.save(existingTreatment)).thenReturn(existingTreatment);

        Treatment result = treatmentService.updateTreatment(treatmentId, updatedDetails);

        assertNotNull(result);
        assertEquals("Dr. Smith", result.getDoctorName());
        assertEquals(parseDate("2024-12-08"), result.getTreatmentDate());
        assertEquals(parseDate("2025-01-08"), result.getNextTreatmentDate());
        assertEquals("Routine checkup", result.getDescription());
        verify(treatmentRepository, times(1)).findById(treatmentId);
        verify(treatmentRepository, times(1)).save(existingTreatment);
    }

    @Test
    public void testDeleteTreatment() {
        String treatmentId = "1";
        Treatment existingTreatment = new Treatment();

        when(treatmentRepository.findById(treatmentId)).thenReturn(Optional.of(existingTreatment));
        doNothing().when(treatmentRepository).delete(existingTreatment);

        treatmentService.deleteTreatment(treatmentId);

        verify(treatmentRepository, times(1)).findById(treatmentId);
        verify(treatmentRepository, times(1)).delete(existingTreatment);
    }

    @Test
    public void testUpdateTreatment_NotFound() {
        String treatmentId = "1";
        Treatment updatedDetails = new Treatment();

        when(treatmentRepository.findById(treatmentId)).thenReturn(Optional.empty());

        Exception exception = assertThrows(NoSuchElementException.class, () -> {
            treatmentService.updateTreatment(treatmentId, updatedDetails);
        });

        assertEquals("Treatment not found", exception.getMessage());
        verify(treatmentRepository, times(1)).findById(treatmentId);
    }

    @Test
    public void testDeleteTreatment_NotFound() {
        String treatmentId = "1";

        when(treatmentRepository.findById(treatmentId)).thenReturn(Optional.empty());

        Exception exception = assertThrows(NoSuchElementException.class, () -> {
            treatmentService.deleteTreatment(treatmentId);
        });

        assertEquals("Treatment not found", exception.getMessage());
        verify(treatmentRepository, times(1)).findById(treatmentId);
    }

    private Date parseDate(String date) throws ParseException {
        SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");
        return formatter.parse(date);
    }
}
