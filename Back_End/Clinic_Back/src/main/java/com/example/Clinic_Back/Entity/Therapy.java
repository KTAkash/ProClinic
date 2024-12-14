package com.example.Clinic_Back.Entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "Therapy")  // Change the collection name to "Therapy"
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Therapy {
    @Id
    private String id;  // Use String for MongoDB IDs

    private String patientName;    // Added Patient Name
    private String titleOfTherapy;
    private String patientPhone;   // Added Patient Phone Number
    private String patientAddress; // Added Patient Address

}
