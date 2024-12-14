package com.example.Clinic_Back.Controller;

import com.example.Clinic_Back.Entity.LabReport;
import com.example.Clinic_Back.Service.auth.LabReportService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/lab-reports")
public class LabReportController {

    @Autowired
    private LabReportService service;

    private static final String UPLOAD_DIR = "src/main/resources/static/api/file";

    @PostMapping
    public ResponseEntity<LabReport> uploadLabReport(
            @RequestParam("file") MultipartFile file,
            @RequestParam("patientName") String patientName,
            @RequestParam("patientId") String patientId,
            @RequestParam("testName") String testName) throws IOException {

        LabReport labReport = new LabReport();
        labReport.setPatientName(patientName);
        labReport.setPatientId(patientId);
        labReport.setTestName(testName);

        LabReport savedLabReport = service.saveLabReport(labReport, file);
        return ResponseEntity.ok(savedLabReport);
    }

    @GetMapping
    public List<LabReport> getAllReports() {
        return service.getAllReports();
    }

    @GetMapping("/{id}")
    public ResponseEntity<LabReport> getReportById(@PathVariable String id) {
        return service.getReportById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/patient/{patientId}")
    public List<LabReport> getReportsByPatientId(@PathVariable String patientId) {
        return service.getReportsByPatientId(patientId);
    }


    @PutMapping("/{id}")
    public LabReport updateLabReport(@PathVariable String id, @RequestBody LabReport labReport) {
        return service.updateLabReport(id, labReport);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteLabReport(@PathVariable String id) {
        service.deleteLabReport(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/files/{filename}")
    public ResponseEntity<Resource> getFile(@PathVariable String filename) throws IOException {
        Path filePath = Paths.get(UPLOAD_DIR, filename);
        Resource fileResource = new UrlResource(filePath.toUri());

        if (fileResource.exists() || fileResource.isReadable()) {
            return ResponseEntity.ok()
                    .header(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=\"" + filename + "\"")
                    .body(fileResource);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
