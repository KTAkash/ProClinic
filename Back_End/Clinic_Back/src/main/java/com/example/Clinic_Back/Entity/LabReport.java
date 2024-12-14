package com.example.Clinic_Back.Entity;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document(collection = "labReports")
public class LabReport {

    @Id
    private String id;
    private String patientId;
    private String patientName;
    private String testName;
    private String fileUrl;
}
