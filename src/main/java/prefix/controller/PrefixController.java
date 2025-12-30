package prefix.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.format.annotation.DateTimeFormat;
import prefix.entity.Prefix;
import prefix.service.PrefixService;

import java.util.Date;
import java.util.List;

@Controller
public class PrefixController {

    @Autowired
    private PrefixService prefixService;

    public void savePrefix(String title, String name, Date dob, String gender, String prefixName) {
        prefixService.createPrefix(title, name, dob, gender, prefixName);
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
    public List<Prefix> search(
            @RequestParam(required = false) String title,
            @RequestParam(required = false) String name,

            @RequestParam(required = false) @DateTimeFormat(pattern="yyyy-MM-dd") Date dobFrom,
            @RequestParam(required = false) @DateTimeFormat(pattern="yyyy-MM-dd") Date dobTo,

            @RequestParam(required = false) String gender,
            @RequestParam(required = false) String prefix
    ) {
        // Pass both dates to service
        return prefixService.searchWithFilters(title, name, dobFrom, dobTo, gender, prefix);
    }
}