package com.fyp.hrw.repo;

import com.fyp.hrw.model.EmployeeLeave;
import com.fyp.hrw.model.Employee;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Date;
import java.util.List;
import java.util.Optional;

public interface LeaveRepo extends JpaRepository<EmployeeLeave, Long> {
    Optional<List<EmployeeLeave>> findLeavesByEmployee(Employee employee);

    void deleteLeaveById(Long id);

    List<EmployeeLeave> findLeaveByDate(Date date1, Date date2);
}
