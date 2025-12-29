package prefix.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import prefix.entity.Prefix;
import prefix.service.PrefixService;

import java.util.Collections;
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

    @GetMapping("/api/search")
    @ResponseBody
    public List<Prefix> search(@RequestParam(name = "q", defaultValue = "") String query) throws InterruptedException {
        if(query == null || query.isEmpty()) {
            Thread.sleep(500);
            return prefixService.getAllPrefixes();
        }

        try {
            Thread.sleep(500);
        }
        catch (InterruptedException e) {
            e.printStackTrace();
        }

        return prefixService.searchTitle(query);
    }
}
