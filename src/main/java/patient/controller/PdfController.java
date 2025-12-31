//package prefix.controller;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Controller;
//import org.springframework.web.bind.annotation.GetMapping;
//import prefix.service.PdfService;
//
//import javax.servlet.http.HttpServletResponse;
//import java.io.IOException;
//
//@Controller
//public class PdfController {
//
//    @Autowired
//    private PdfService pdfService;
//
//    @GetMapping("/downloadPrefixPdf")
//    public void downloadPdf(HttpServletResponse response) throws IOException {
//        response.setContentType("application/pdf");
//        response.setHeader("Content-Disposition", "attachment; filename=prefix_report.pdf");
//
//        pdfService.generatePdfReport(response.getOutputStream());
//    }
//}