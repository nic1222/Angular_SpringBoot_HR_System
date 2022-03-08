package com.fyp.hrw.service;

import com.fyp.hrw.model.Attendance;
import com.fyp.hrw.model.QR;
import com.fyp.hrw.repo.AttendanceRepo;
import com.fyp.hrw.repo.IUserRepo;
import com.fyp.hrw.repo.QRRepo;
import jdk.dynalink.linker.LinkerServices;
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

    public QR findQRByQrInfo(String qrInfo) {
        return qrRepo.findQRByQrInfo(qrInfo);
    }

    public QR addQR(QR qr) {
        return qrRepo.save(qr);
    }

    public Attendance addAttendance(Attendance attendance) {
        return attendanceRepo.save(attendance);
    }

    public List<Attendance> findAllAttendance() {
        return attendanceRepo.findAll();
    }

    public void deleteAttendance(String empId, Date date) {
        attendanceRepo.deleteAttendanceByEmpIdAndDate(empId, date);
    }

    public Attendance updateAttendance(Attendance attendance) {
        return attendanceRepo.save(attendance);
    }


    public void clockOutAttendance(Attendance attendance) {
        attendanceRepo.clockOutAttendance(attendance.getEmpId(), attendance.getDate(), attendance.getClockOut());
    }

    public Attendance findAttendanceByEmpIdAndDate(String empId, Date date) {
        return attendanceRepo.findAttendanceByEmpIdAndDate(empId, date);
    }
}
