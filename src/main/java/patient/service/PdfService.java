//package prefix.service;
//
//import com.itextpdf.text.*;
//import com.itextpdf.text.pdf.PdfPCell;
//import com.itextpdf.text.pdf.PdfPTable;
//import com.itextpdf.text.pdf.PdfWriter;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Service;
//import prefix.entity.Patient;
//import prefix.repository.PatientRepository;
//
//import javax.transaction.Transactional;
//import java.io.OutputStream;
//import java.util.List;
//
//@Service
//@Transactional
//public class PdfService {
//
//    @Autowired
//    private PatientRepository prefixRepository;
//
//    // REMOVED "static" here
//    public void generatePdfReport(OutputStream outputStream) {
//        try {
//            Document document = new Document();
//            PdfWriter.getInstance(document, outputStream);
//
//            document.open();
//
//            // 1. Add Title
//            Font titleFont = FontFactory.getFont(FontFactory.HELVETICA_BOLD, 18, BaseColor.BLUE);
//            Paragraph title = new Paragraph("Patient Database Report", titleFont);
//            title.setAlignment(Element.ALIGN_CENTER);
//            title.setSpacingAfter(20);
//            document.add(title);
//
//            // 2. Create Table
//            PdfPTable table = new PdfPTable(4);
//            table.setWidthPercentage(100);
//            table.setWidths(new float[]{1, 3, 3, 3});
//
//            // 3. Add Headers
//            addHeader(table, "ID");
//            addHeader(table, "Title");
//            addHeader(table, "Gender");
//            addHeader(table, "Patient");
//
//            // 4. Add Data
//            List<Patient> list = prefixRepository.findAll();
//            for (Patient p : list) {
//                addCenteredCell(table, String.valueOf(p.getId()));
//                addCenteredCell(table, p.getTitle() != null ? p.getTitle().getDisplayValue() : "");
//                addCenteredCell(table, p.getGender() != null ? p.getGender().name() : "");
//                addCenteredCell(table, p.getPrefix() != null ? p.getPrefix().getDisplayValue() : "");
//            }
//
//            document.add(table);
//            document.close();
//        } catch (DocumentException e) {
//            e.printStackTrace();
//            throw new RuntimeException("Error generating PDF", e);
//        }
//    }
//
//    private void addHeader(PdfPTable table, String text) {
//        PdfPCell cell = new PdfPCell(new Phrase(text, FontFactory.getFont(FontFactory.HELVETICA_BOLD)));
//        cell.setBackgroundColor(BaseColor.LIGHT_GRAY);
//        cell.setHorizontalAlignment(Element.ALIGN_CENTER);
//        cell.setVerticalAlignment(Element.ALIGN_MIDDLE);
//        cell.setPadding(5);
//        table.addCell(cell);
//    }
//
//    // Aligning data at the center
//    private void addCenteredCell(PdfPTable table, String text) {
//        PdfPCell cell = new PdfPCell(new Phrase(text));
//        cell.setHorizontalAlignment(Element.ALIGN_CENTER);
//        cell.setVerticalAlignment(Element.ALIGN_MIDDLE);
//        cell.setPadding(5);
//        table.addCell(cell);
//    }
//}