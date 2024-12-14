package com.example.Clinic_Back.Service.auth;

import com.example.Clinic_Back.Entity.Feedback;
import com.example.Clinic_Back.Repository.FeedbackRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FeedbackService {

    @Autowired
    private FeedbackRepository feedbackRepository;

    // Save a feedback document
    public Feedback saveFeedback(Feedback feedback) {
        return feedbackRepository.save(feedback);
    }

    // Retrieve all feedback documents
    public List<Feedback> getAllFeedback() {
        return feedbackRepository.findAll();
    }
}
