package com.fyp.hrw.repo;

import com.fyp.hrw.model.Attendance;
import com.fyp.hrw.model.Employee;
import com.fyp.hrw.model.EmployeeLeave;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.util.Date;
import java.sql.Time;
import java.util.List;
import java.util.Optional;

public interface AttendanceRepo extends JpaRepository<Attendance, Long> {
    @Modifying
    @Query("UPDATE Attendance a SET a.clockOut=?3 WHERE a.employee.id=?1 AND a.date=?2")
    void clockOutAttendance(Long id, Date date, Time clockOut);

    Attendance findAttendanceByEmployee_IdAndDate(Long empId, Date date);

    Optional<List<Attendance>> findAttendanceByEmployee_Id(Long id);

    void deleteAttendanceById(Long id);
}
