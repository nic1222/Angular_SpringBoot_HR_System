package com.fyp.hrw.controller;

import com.fyp.hrw.model.Attendance;
import com.fyp.hrw.model.Employee;
import com.fyp.hrw.model.QR;
import com.fyp.hrw.payload.request.ClockInOutReq;
import com.fyp.hrw.service.AttendanceService;
import com.fyp.hrw.service.EmployeeService;
import com.fyp.hrw.service.ExcelService;
import org.springframework.core.io.InputStreamResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import java.sql.Date;
import java.sql.Time;
import java.sql.Timestamp;
import java.text.ParseException;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.ZoneId;
import java.util.Calendar;
import java.util.List;

@RestController
@RequestMapping("/api/attendance")
public class AttendanceController {

    private final AttendanceService attendanceService;
    private final EmployeeService employeeService;
    private final ExcelService excelService;

    public AttendanceController(AttendanceService attendanceService, EmployeeService employeeService, ExcelService excelService) {
        this.attendanceService = attendanceService;
        this.employeeService = employeeService;
        this.excelService = excelService;
    }

    @GetMapping("/download/excel")
    public ResponseEntity<Resource> getFile() {
        String filename = "attendances.xlsx";
        InputStreamResource file = new InputStreamResource(excelService.load());
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=" + filename)
                .contentType(MediaType.parseMediaType("application/vnd.ms-excel"))
                .body(file);
    }

    @GetMapping("/qr/find")
    public ResponseEntity<?> getQR() {
        List<QR> qr = attendanceService.findQRByQrInfo();
        if(qr.isEmpty()){
            return new ResponseEntity<>("Empty", HttpStatus.OK);
        }else {
            return new ResponseEntity<>(qr, HttpStatus.OK);
        }
    }

    @PostMapping("/qr/add")
    public ResponseEntity<QR> addQR(@RequestBody QR qr) {
        QR newQR = attendanceService.addQR(qr);
        return new ResponseEntity<>(newQR, HttpStatus.CREATED);
    }

    @DeleteMapping("/qr/stop")
    public ResponseEntity<Attendance> deleteAtt() {
        attendanceService.stopQR();
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/all")
    public ResponseEntity<List<Attendance>> getAllAttendance() {
        List<Attendance> attendanceListList = attendanceService.findAllAttendance();
        return new ResponseEntity<>(attendanceListList, HttpStatus.OK);
    }


    @GetMapping("/find-by-empid/{empId}")
    public ResponseEntity<List<Attendance>> findAttendanceByEmployee_Id(@PathVariable("empId") Long empId) {
        List<Attendance> attendanceListList = attendanceService.findAttendanceByEmployee_Id(empId);
        return new ResponseEntity<>(attendanceListList, HttpStatus.OK);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Attendance> deleteAtt(@PathVariable("id") String id) {
        attendanceService.deleteAttendanceById(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PutMapping("/update")
    public ResponseEntity<?> updateAttendance(@RequestBody Attendance attendance) {
        Attendance att = attendanceService.updateAttendance(attendance);
        return ResponseEntity.status(HttpStatus.OK).body(att);
    }

    @PostMapping("/clockIn")
    public ResponseEntity<?> clockInAttendance(@RequestBody ClockInOutReq clockInOutReq) throws ParseException {
        Timestamp stamp = new Timestamp(System.currentTimeMillis());
        Date currentDate = new Date(stamp.getTime());
        Time currentTime = new Time(stamp.getTime());
        //get current calendar
        Calendar now = Calendar.getInstance();
        //set 9am of the day
        java.util.Date today = new java.util.Date();
        Calendar today9 = Calendar.getInstance();
        today9.setTime(today);
        today9.add(Calendar.DATE, 0);
        today9.set(Calendar.HOUR_OF_DAY, 9);
        today9.set(Calendar.MINUTE, 0);
        today9.set(Calendar.SECOND, 0);
        today9.set(Calendar.MILLISECOND, 0);

        Attendance checkAtt = attendanceService.findAttendanceByEmployee_IdAndDate(Long.valueOf(clockInOutReq.getEmployeeId()), currentDate);
        if (checkAtt != null) {
            return null;
        } else {
            Attendance attendance = new Attendance();
            Employee employee = employeeService.findUserById(Long.valueOf(clockInOutReq.getEmployeeId()));
            attendance.setEmployee(employee);
            attendance.setDate(currentDate);
            attendance.setClockIn(currentTime);
            if (now.compareTo(today9) > 0) {
                attendance.setIsLate(true);
            } else {
                attendance.setIsLate(false);
            }
            Attendance att = attendanceService.addAttendance(attendance);
            return new ResponseEntity<>(att, HttpStatus.OK);
        }
    }

    @PutMapping("/clockOut")
    public ResponseEntity clockOutAttendance(@RequestBody ClockInOutReq clockInOutReq) {
        Timestamp stamp = new Timestamp(System.currentTimeMillis());
        Date currentDate = new Date(stamp.getTime());
        Time currentTime = new Time(stamp.getTime());

        Attendance attendance = attendanceService.findAttendanceByEmployee_IdAndDate(Long.valueOf(clockInOutReq.getEmployeeId()), currentDate);
        if (attendance == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Clock in record not found. You did not clock in!!");
        } else if (attendance.getClockOut() != null) {
            return ResponseEntity.status(HttpStatus.OK).body("Clock out record existed. You have clocked out already!!");
        } else {
            //combine date n time for clock in date time
            LocalDate datePart = LocalDate.parse(attendance.getDate().toString());
            LocalTime timePart = LocalTime.parse(attendance.getClockIn().toString());
            LocalDateTime dt = LocalDateTime.of(datePart, timePart);
            java.util.Date dateStart = java.util.Date.from(dt.atZone(ZoneId.systemDefault()).toInstant());
            System.out.println("Start time dateType-----------> " + dateStart);

            java.util.Date dateEnd = new java.util.Date();
            System.out.println("End time dateType-----------> " + dateEnd);

            // Calculating the difference in Hours
            long diff = ((currentDate.getTime() - dateStart.getTime()) / (60 * 60 * 1000)) % 24;

            // Calculating the difference in Seconds
//            long diff = ((currentDate.getTime() - dateStart.getTime()) / 1000) % 60;
            System.out.println((int) diff);

            attendance.setWorkHours((int) diff);
            attendance.setDate(currentDate);
            attendance.setClockOut(currentTime);
            attendanceService.clockOutAttendance(attendance);
            return new ResponseEntity<>(HttpStatus.OK);
        }
    }
}
