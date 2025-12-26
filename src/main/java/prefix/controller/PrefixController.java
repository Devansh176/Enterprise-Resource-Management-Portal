package prefix.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import prefix.entity.Prefix;
import prefix.service.PrefixService;

import java.util.List;

@Controller
public class PrefixController {

    @Autowired
    private PrefixService prefixService;

    public void savePrefix(String title, String gender, String prefixName) {
        prefixService.createPrefix(title, gender, prefixName);
    }

    public List<Prefix> listPrefixes() {
        return prefixService.getAllPrefixes();
    }

    public void deletePrefix(int id) {
        prefixService.deletePrefixById(id);
    }

    public void deleteAll() {
        prefixService.deleteAll();
    }
}
