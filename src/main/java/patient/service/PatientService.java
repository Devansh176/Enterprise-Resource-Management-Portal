package patient.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import patient.entity.Patient;
import patient.entity.gender.GenderType;
import patient.entity.prefixType.PrefixTypes;
import patient.entity.titleType.TitleType;
import patient.repository.PatientRepository;

import javax.transaction.Transactional;
import java.util.Date;
import java.util.List;

@Service
@Transactional
public class PatientService {

    @Autowired
    private PatientRepository patientRepository;

    public void createPrefix(String title, String name, Date dob, String gender, String prefixName) {
        Patient patient = new Patient();

        patient.setTitle(TitleType.valueOf(title));
        patient.setName(name);
        patient.setDob(dob);
        patient.setGender(GenderType.valueOf(gender));
        patient.setPrefix(PrefixTypes.valueOf(prefixName));

        patientRepository.save(patient);
    }

    public List<Patient> searchWithFilters(String title, String name, Date dobFrom, Date dobTo, String gender, String prefix) {
        return patientRepository.findWithFilters(title, name, dobFrom, dobTo, gender, prefix);
    }

    public List<Patient> getAllPrefixes() {
        return patientRepository.findAll();
    }
    public void deletePrefixById(int id) {
        patientRepository.deleteById(id);
    }
    public void deleteAll() {
        patientRepository.deleteAll();
    }
}
