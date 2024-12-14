package com.example.Clinic_Back.Entity;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document (collection = "Offers")
@Data
@NoArgsConstructor
@AllArgsConstructor

public class Offers {

    @Id
    private String id; // MongoDB generates a unique ID automatically


    private String name;
    private String address;
    private Integer phoneNumber;
    private Integer numberOfMonths;
    private String offerType;


}
