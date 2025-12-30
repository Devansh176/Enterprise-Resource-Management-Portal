package prefix.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.*;
import prefix.entity.Patient;
import prefix.service.PatientService;

import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/api")
public class WebServiceController {

    @Autowired
    private PatientService patientService;

    @PostMapping("/prefixes")
    public String createPrefix(
            @RequestParam("title") String title,
            @RequestParam("name") String name,
            @RequestParam("dob") @DateTimeFormat(pattern = "yyyy-MM-dd") Date dob,
            @RequestParam("gender") String gender,
            @RequestParam("prefix") String prefixName) {
        try {
            patientService.createPrefix(title, name, dob, gender, prefixName);
            return "{ \"success\": true, \"message\": \"Record Created Successfully\" }";
        }
        catch (Exception e) {
            return "{ \"success\": false, \"message\": \"Error: " + e.getMessage() + "\" }";
        }
    }

    @GetMapping("/prefixes")
    public List<Patient> getPrefixesJson() {
        return patientService.getAllPrefixes();
    }

    @DeleteMapping("/prefixes/{id}")
    public String deletePrefix(@PathVariable("id") int id) {
        try {
            patientService.deletePrefixById(id);
            return "{ \"success\": true, \"message\": \"Record Deleted Successfully\" }";
        }
        catch (Exception e) {
            return "{ \"success\": false, \"message\": \"Error: " + e.getMessage() + "\" }";
        }
    }
}
