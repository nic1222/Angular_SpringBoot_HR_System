package com.fyp.hrw.service;

import com.fyp.hrw.exception.RecordNotFoundException;
import com.fyp.hrw.model.Attendance;
import com.fyp.hrw.model.QR;
import com.fyp.hrw.repo.AttendanceRepo;
import com.fyp.hrw.repo.QRRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.sql.Date;
import java.util.List;

@Service
@Transactional
public class AttendanceService {
    @Autowired
    private QRRepo qrRepo;

    @Autowired
    private AttendanceRepo attendanceRepo;

    public List<QR> findQRByQrInfo() {
        if (qrRepo.findAll() == null) {
            return null;
        } else {
            return qrRepo.findAll();
        }
    }

    public QR addQR(QR qr) {
        qrRepo.deleteAll();
        return qrRepo.save(qr);
    }

    public void stopQR() {
        qrRepo.deleteAll();
    }

    public Attendance addAttendance(Attendance attendance) {
        return attendanceRepo.save(attendance);
    }

    public List<Attendance> findAllAttendance() {
        return attendanceRepo.findAll();
    }

    public void deleteAttendanceById(String id) {
        attendanceRepo.deleteAttendanceById(Long.valueOf(id));
    }

    public Attendance updateAttendance(Attendance attendance) {
        return attendanceRepo.save(attendance);
    }

    public void clockOutAttendance(Attendance attendance) {

        attendanceRepo.clockOutAttendance(attendance.getEmployee().getId(), attendance.getDate(), attendance.getClockOut());
    }

    public Attendance findAttendanceByEmployee_IdAndDate(Long empId, Date date) {
        return attendanceRepo.findAttendanceByEmployee_IdAndDate(empId, date);
    }

    public List<Attendance> findAttendanceByEmployee_Id(Long empId) {
        return attendanceRepo.findAttendanceByEmployee_Id(empId).orElseThrow(() -> new RecordNotFoundException("Attendance not found"));
    }
}
