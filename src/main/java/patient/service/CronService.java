package patient.service;

import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

@Service
public class CronService {

    private List<String> executionLogs = new ArrayList<>();

    public void performTask() {
        String timestamp = LocalDateTime.now().format(DateTimeFormatter.ofPattern("HH:mm:ss"));
        String message = "Cron triggered the task at: "+timestamp;

        System.out.println(message);

        if(executionLogs.size() >= 100) executionLogs.remove(0);
        executionLogs.add(message);
    }

    public List<String> getLogs() {
        return executionLogs;
    }
}
