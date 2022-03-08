package com.fyp.hrw.repo;

import com.fyp.hrw.model.Attendance;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.sql.Date;
import java.sql.Time;

public interface AttendanceRepo extends JpaRepository<Attendance, Long> {
    @Modifying
    @Query("UPDATE Attendance a SET a.clockOut=?3 WHERE a.empId=?1 AND a.date=?2")
    void clockOutAttendance(String username, Date date, Time clockOut);

    Attendance findAttendanceByEmpIdAndDate(String empId, Date date);

    void deleteAttendanceByEmpIdAndDate(String empId, Date date);
}
