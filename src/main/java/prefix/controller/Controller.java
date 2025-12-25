package prefix.controller;

import org.springframework.beans.factory.annotation.Autowired;
import prefix.entity.Prefix;
import prefix.service.PrefixService;

import java.util.List;

@org.springframework.stereotype.Controller
public class Controller {

    @Autowired
    private PrefixService prefixService;

    public void savePrefix(String prefixName, String gender) {
        prefixService.createPrefix(prefixName, gender);
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
