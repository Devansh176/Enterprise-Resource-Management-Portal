package prefix.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import prefix.entity.Prefix;
import prefix.entity.gender.GenderType;
import prefix.entity.prefixType.PrefixTypes;
import prefix.repository.PrefixRepository;

import javax.transaction.Transactional;
import java.util.List;

@Service
@Transactional
public class PrefixService {

    @Autowired
    private PrefixRepository prefixRepository;

    public void createPrefix(String prefixName, String gender) {
        Prefix prefix = new Prefix();

        prefix.setPrefix(PrefixTypes.valueOf(prefixName));
        prefix.setGender(GenderType.valueOf(gender));

        prefixRepository.save(prefix);
    }

    public List<Prefix> getAllPrefixes() {
        return prefixRepository.findAll();
    }

    public void deletePrefixById(int id) {
        prefixRepository.deleteById(id);
    }

    public void deleteAll() {
        prefixRepository.deleteAll();
    }
}
