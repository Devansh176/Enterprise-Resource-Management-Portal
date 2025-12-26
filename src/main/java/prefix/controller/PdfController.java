package prefix.controller;

import com.itextpdf.text.*;
import com.itextpdf.text.pdf.PdfPCell;
import com.itextpdf.text.pdf.PdfPTable;
import com.itextpdf.text.pdf.PdfWriter;
import lombok.var;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import prefix.service.PrefixService;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Controller
public class PdfController {

    @Autowired
    private PrefixService prefixService;

    @GetMapping("/downloadPrefixPdf")
    public void downloadPdf(HttpServletResponse response) throws IOException, DocumentException {

        // Tells browser, this is PDF
        response.setContentType("application/pdf");
        response.setHeader("Content-Disposition", "attachment; filename=prefix_report.pdf");

        // Create PDF Document
        Document document = new Document();
        PdfWriter.getInstance(document, response.getOutputStream());
        document.open();

        // Add a title
        Font titleFont = FontFactory.getFont(FontFactory.HELVETICA_BOLD, 18, BaseColor.BLUE);
        Paragraph title = new Paragraph("Prefix Database Report", titleFont);
        title.setAlignment(Element.ALIGN_CENTER);
        title.setSpacingAfter(20);
        document.add(title);

        // Creating Table with 4 Columns
        PdfPTable table = new PdfPTable(4);
        table.setWidthPercentage(100);
        table.setWidths(new float[]{1, 3, 3, 3});

        // Configuring the columns of the table
        addHeader(table, "ID");
        addHeader(table, "Title");
        addHeader(table, "Gender");
        addHeader(table, "Prefix");

        // Filling the data rows
        var list = prefixService.getAllPrefixes();
        for(var p : list) {
            addCenteredCell(table, String.valueOf(p.getId()));
            addCenteredCell(table, p.getDisplayTitle());
            addCenteredCell(table, String.valueOf(p.getGender()));
            addCenteredCell(table, p.getDisplayPrefix());
        }
        document.add(table);
        document.close();
    }

    private void addHeader(PdfPTable table, String text) {
        PdfPCell cell = new PdfPCell(new Phrase(text, FontFactory.getFont(FontFactory.HELVETICA_BOLD)));
        cell.setBackgroundColor(BaseColor.LIGHT_GRAY);
        cell.setHorizontalAlignment(Element.ALIGN_CENTER);
        cell.setPadding(5);
        table.addCell(cell);
    }

    // Aligning the data to the center
    private void addCenteredCell(PdfPTable table, String text) {
        PdfPCell cell = new PdfPCell(new Phrase(text));
        cell.setHorizontalAlignment(Element.ALIGN_CENTER);
        cell.setVerticalAlignment(Element.ALIGN_CENTER);
        cell.setPadding(5);
        table.addCell(cell);
    }
}
