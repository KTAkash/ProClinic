package com.example.Clinic_Back.Controller;

import com.example.Clinic_Back.Entity.Appointment;
import com.example.Clinic_Back.Repository.AppointmentRepository;
import com.example.Clinic_Back.Service.auth.AppointmentService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")   //Allows requests from any domain con
@RestController      //Marks the class as a REST controller to handle HTTP requests and responses
@RequestMapping("/sa") // start with the enpoints sa

public class AppointmentController {

    @Autowired     // interconnect with the service and the repository
    private AppointmentService appointmentService;
    @Autowired
    private AppointmentRepository appointmentRepository;

    // Get all appointments
    @GetMapping("/all")     // retrieves  all appointment using service layer
    public List<Appointment> getAllAppointments() {
        return appointmentService.getAllAppointments();
    }
    @GetMapping("/{id}") //fatch an appointment by id
    public ResponseEntity<Appointment> getAppointmentById(@PathVariable String id) {
        Appointment appointment = appointmentService.getAppointmentById(id);
        if (appointment != null) {
            return ResponseEntity.ok(appointment);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    // Create a new appointment
    @PostMapping("/Appointment/create")
    @ResponseStatus(HttpStatus.CREATED)
    public Appointment createAppointment(@RequestBody Appointment appointment) {
        return appointmentService.createAppointment(appointment);
    }
    // Update an existing appointment
    @PutMapping("/Appointment/update/{id}")
    public ResponseEntity<Appointment> updateAppointment(
            @PathVariable String id,
            @RequestBody Appointment updatedAppointment) {
        Appointment appointment = appointmentService.updateAppointment(String.valueOf(id), updatedAppointment);
        if (appointment != null) {
            return ResponseEntity.ok(appointment);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    @DeleteMapping("/Appointment/delete/{id}")
    public ResponseEntity<String> deleteAppointment(@PathVariable String id) {
        boolean isDeleted = appointmentService.deleteAppointment(id); // Use String id here
        if (isDeleted) {
            return ResponseEntity.ok("Appointment deleted successfully");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Appointment not found");
        }
    }

    @PutMapping("/Appointment/send/{id}")
    public ResponseEntity<String> sendAppointment(@PathVariable String id) {
        boolean isSent = appointmentService.sendAppointment(id);
        if (isSent) {
            return ResponseEntity.ok("Appointment sent successfully");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Appointment not found");
        }
    }

    @GetMapping("/sent")
    public List<Appointment> getSentAppointments() {
        return appointmentRepository.findBySent(true);
    }













}