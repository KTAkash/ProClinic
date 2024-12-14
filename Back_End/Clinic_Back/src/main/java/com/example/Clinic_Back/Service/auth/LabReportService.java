package com.example.Clinic_Back.Service.auth;

import com.example.Clinic_Back.Entity.LabReport;
import com.example.Clinic_Back.Repository.LabReportRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Optional;

@Service
public class LabReportService {

    @Autowired
    private LabReportRepository repository;

    private static final String UPLOAD_DIR = "src/main/resources/static/api/file";

    public LabReport saveLabReport(LabReport labReport, MultipartFile file) throws IOException {
        Files.createDirectories(Paths.get(UPLOAD_DIR));

        String fileName = file.getOriginalFilename();
        Path filePath = Paths.get(UPLOAD_DIR, fileName);
        Files.copy(file.getInputStream(), filePath);
        System.out.println("File saved at: " + filePath.toString());

        // Adjust URL for default static resource serving
        String fileDownloadUrl = "http://localhost:8085/api/file/" + fileName;
        labReport.setFileUrl(fileDownloadUrl);

        return repository.save(labReport);
    }




    public List<LabReport> getAllReports() {
        return repository.findAll();
    }

    public List<LabReport> getReportsByPatientId(String patientId) {
        return repository.findByPatientId(patientId);
    }


    public Optional<LabReport> getReportById(String id) {
        return repository.findById(id);
    }

    public LabReport updateLabReport(String id, LabReport labReport) {
        labReport.setId(id);
        return repository.save(labReport);
    }


    public void deleteLabReport(String id) {
        repository.deleteById(id);
    }
}
