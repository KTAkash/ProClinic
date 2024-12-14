package com.example.Clinic_Back.Controller;

import com.example.Clinic_Back.Entity.Feedback;
import com.example.Clinic_Back.Service.auth.FeedbackService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/feedback")
@CrossOrigin(origins = "*") // Enable CORS for cross-origin requests
public class FeedbackController {

    @Autowired
    private FeedbackService feedbackService;

    // POST mapping to submit feedback
    @PostMapping("/Create")
    public ResponseEntity<Feedback> submitFeedback(@RequestBody Feedback feedback) {
        Feedback savedFeedback = feedbackService.saveFeedback(feedback);
        return ResponseEntity.ok(savedFeedback);
    }

    // GET mapping to retrieve all feedback
    @GetMapping("/all")
    public ResponseEntity<List<Feedback>> getAllFeedback() {
        List<Feedback> feedbackList = feedbackService.getAllFeedback();
        return ResponseEntity.ok(feedbackList);
    }
}
