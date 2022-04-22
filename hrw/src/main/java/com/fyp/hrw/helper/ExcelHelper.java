package com.fyp.hrw.helper;

import com.fyp.hrw.model.Attendance;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.List;

public class ExcelHelper {
    public static String TYPE = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
    static String[] HEADERs = {"Employee Id", "Employee Name", "Date", "Clock In", "Clock Out", "Late", "Total Working Hour"};
    static String SHEET = "Attendances";

    public static ByteArrayInputStream attendancesToExcel(List<Attendance> attendanceList) {

        try (Workbook workbook = new XSSFWorkbook(); ByteArrayOutputStream out = new ByteArrayOutputStream();) {
            Sheet sheet = workbook.createSheet(SHEET);

            // Header
            Row headerRow = sheet.createRow(0);

            for (int col = 0; col < HEADERs.length; col++) {
                Cell cell = headerRow.createCell(col);
                cell.setCellValue(HEADERs[col]);
            }

            int rowIdx = 1;
            for (Attendance attendance : attendanceList) {
                Row row = sheet.createRow(rowIdx++);

                row.createCell(0).setCellValue(attendance.getEmployee().getId());
                row.createCell(1).setCellValue(attendance.getEmployee().getName());
                row.createCell(2).setCellValue(attendance.getDate().toString());
                row.createCell(3).setCellValue(attendance.getClockIn().toString());
                if (attendance.getClockOut() != null) {
                    row.createCell(4).setCellValue(attendance.getClockOut().toString());
                } else {
                    row.createCell(4).setCellValue("-");
                }
                row.createCell(5).setCellValue(attendance.isLate());
                if (attendance.getClockOut() != null) {
                    row.createCell(6).setCellValue(attendance.getWorkHours());
                } else {
                    row.createCell(6).setCellValue("-");
                }

            }

            workbook.write(out);
            return new ByteArrayInputStream(out.toByteArray());
        } catch (IOException e) {
            throw new RuntimeException("Fail to import data to Excel file: " + e.getMessage());
        }
    }
}
