package prefix.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import prefix.service.CronService;

import java.util.List;

@RestController
@RequestMapping("/api")
public class CronController {

    @Autowired
    private CronService cronService;

    @GetMapping("/run-cron-job")
    public String triggerJob() {
        cronService.performTask();
        return "Cron Job Executed Successfully";
    }

    @GetMapping("/cron-logs")
    public List<String> getCronLogs() {
        return cronService.getLogs();
    }
}
