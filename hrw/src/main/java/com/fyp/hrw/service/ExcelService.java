package com.fyp.hrw.service;

import com.fyp.hrw.helper.ExcelHelper;
import com.fyp.hrw.model.Attendance;
import com.fyp.hrw.repo.AttendanceRepo;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.ByteArrayInputStream;
import java.util.List;

@Service
@Transactional
public class ExcelService {

    private final AttendanceRepo attendanceRepo;

    public ExcelService(AttendanceRepo attendanceRepo) {
        this.attendanceRepo = attendanceRepo;
    }

    public ByteArrayInputStream load() {
        List<Attendance> attendanceList = attendanceRepo.findAll();

        ByteArrayInputStream in = ExcelHelper.attendancesToExcel(attendanceList);
        return in;
    }
}
