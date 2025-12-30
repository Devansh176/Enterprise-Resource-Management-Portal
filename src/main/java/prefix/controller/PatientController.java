package prefix.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.format.annotation.DateTimeFormat;
import prefix.entity.Patient;
import prefix.service.PatientService;

import java.util.Date;
import java.util.List;

@Controller
public class PatientController {

    @Autowired
    private PatientService patientService;

    public void savePrefix(String title, String name, Date dob, String gender, String prefixName) {
        patientService.createPrefix(title, name, dob, gender, prefixName);
    }

    public List<Patient> listPrefixes() {
        return patientService.getAllPrefixes();

    }
    public void deletePrefix(int id) {
        patientService.deletePrefixById(id);
    }

    public void deleteAll() {
        patientService.deleteAll();
    }

    @GetMapping("/api/search")
    @ResponseBody
    public List<Patient> search(
            @RequestParam(required = false) String title,
            @RequestParam(required = false) String name,

            @RequestParam(required = false) @DateTimeFormat(pattern="yyyy-MM-dd") Date dobFrom,
            @RequestParam(required = false) @DateTimeFormat(pattern="yyyy-MM-dd") Date dobTo,

            @RequestParam(required = false) String gender,
            @RequestParam(required = false) String prefix
    ) {
        // Pass both dates to service
        return patientService.searchWithFilters(title, name, dobFrom, dobTo, gender, prefix);
    }
}