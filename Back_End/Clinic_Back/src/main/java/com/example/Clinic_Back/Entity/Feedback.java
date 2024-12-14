package com.example.Clinic_Back.Entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "feedbacks") // Specify MongoDB collection name
@AllArgsConstructor
@NoArgsConstructor
@Data
public class Feedback {

    @Id // MongoDB's unique identifier
    private String id; // Use String for MongoDB ObjectId

    private String email;
    private String doctorName;
    private int rating;

}
