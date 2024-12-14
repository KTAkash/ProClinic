package com.example.Clinic_Back.Repository;

import com.example.Clinic_Back.Entity.Appointment;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface AppointmentRepository extends MongoRepository<Appointment, String> {


    List<Appointment> findBySent(boolean sent);

}
