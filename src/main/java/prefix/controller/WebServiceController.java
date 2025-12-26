package prefix.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import prefix.entity.Prefix;
import prefix.service.PrefixService;

import java.util.List;

@RestController
@RequestMapping("/api")
public class WebServiceController {

    @Autowired
    private PrefixService prefixService;

//    @PostMapping("/")

    @GetMapping("/prefixes")
    public List<Prefix> getPrefixesJson() {
        return prefixService.getAllPrefixes();
    }
}
