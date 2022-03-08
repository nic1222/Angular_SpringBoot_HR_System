package com.fyp.hrw.controller;

import com.fyp.hrw.model.Attendance;
import com.fyp.hrw.model.QR;
import com.fyp.hrw.model.User;
import com.fyp.hrw.service.AttendanceService;
import com.fyp.hrw.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.parameters.P;
import org.springframework.web.bind.annotation.*;


import java.sql.Date;
import java.sql.Time;
import java.sql.Timestamp;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.List;

@RestController
@RequestMapping("/api/attendance")
public class AttendanceController {

    private final AttendanceService attendanceService;

    public AttendanceController(AttendanceService attendanceService) {
        this.attendanceService = attendanceService;
    }

    @GetMapping("/qr/find/{qrInfo}")
    public ResponseEntity<QR> getQR(@PathVariable("qrInfo") String qrInfo) {
        QR qr = attendanceService.findQRByQrInfo(qrInfo);
        return new ResponseEntity<>(qr, HttpStatus.OK);
    }

    @PostMapping("/qr/add")
    public ResponseEntity<QR> addQR(@RequestBody QR qr) {
        QR newQR = attendanceService.addQR(qr);
        return new ResponseEntity<>(newQR, HttpStatus.CREATED);
    }

    @GetMapping("/all")
    public ResponseEntity<List<Attendance>> getAllAttendance() {
        List<Attendance> attendanceListList = attendanceService.findAllAttendance();
        return new ResponseEntity<>(attendanceListList, HttpStatus.OK);
    }

    @DeleteMapping("/delete/{username}/{date}")
    public ResponseEntity deleteAtt(@PathVariable("username") String empId, @PathVariable("date") Date date) {
        attendanceService.deleteAttendance(empId, date);
        return ResponseEntity.status(HttpStatus.OK).body("Delete successfully");
    }

    @PutMapping("/update")
    public ResponseEntity updateAttendance(@RequestBody Attendance attendance) {
        Attendance att = new Attendance();
        if (isExistAttRecord(attendance.getEmpId(), attendance.getDate())) {
            att = attendanceService.updateAttendance(attendance);
            return ResponseEntity.status(HttpStatus.OK).body(att);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Record not found.");
        }
    }

    private boolean isExistAttRecord(String empId, Date date) {
        Attendance exist = attendanceService.findAttendanceByEmpIdAndDate(empId, date);
        if (exist == null) {
            return false;
        } else {
            return true;
        }
    }

    @PostMapping("/clockIn")
    public ResponseEntity clockInAttendance(@RequestBody Attendance attendance) {

        Timestamp stamp = new Timestamp(System.currentTimeMillis());
        Date currentdate = new Date(stamp.getTime());
        Time currenttime = new Time(stamp.getTime());

        java.util.Date nine = new Date(stamp.getTime());
        try {
            SimpleDateFormat timeFormat = new SimpleDateFormat("hh:mm:ss");
            java.util.Date latetime = timeFormat.parse("09:00:00");
            nine = latetime;
        } catch (ParseException e) {
            e.printStackTrace();
        }

//        Attendance exist = attendanceService.findAttendanceByEmpIdAndDate(attendance.getEmpId(), currentdate);

        if (isExistAttRecord(attendance.getEmpId(), currentdate)) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Record Existed.");
        } else {
            if (currenttime.before(nine)) {
                attendance.setLate(false);
            } else {
                attendance.setLate(true);
            }
            attendance.setDate(currentdate);
            attendance.setClockIn(currenttime);
            Attendance att = attendanceService.addAttendance(attendance);
            return ResponseEntity.ok(att);
        }
    }

    @PutMapping("/clockOut")
    public ResponseEntity clockOutAttendance(@RequestBody Attendance attendance) {
        Timestamp stamp = new Timestamp(System.currentTimeMillis());
        Date currentdate = new Date(stamp.getTime());
        Time currenttime = new Time(stamp.getTime());

//        Attendance exist = attendanceService.findAttendanceByEmpIdAndDate(attendance.getEmpId(), currentdate);

        if (!isExistAttRecord(attendance.getEmpId(), currentdate)) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Clock in record not found.");
        } else {
            attendance.setDate(currentdate);
            attendance.setClockOut(currenttime);
            attendanceService.clockOutAttendance(attendance);
            return ResponseEntity.status(HttpStatus.OK).body("Clock out record saved.");
        }
    }
}
