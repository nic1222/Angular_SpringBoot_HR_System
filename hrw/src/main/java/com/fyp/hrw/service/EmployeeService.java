package com.fyp.hrw.service;

import com.fyp.hrw.exception.RecordNotFoundException;
import com.fyp.hrw.model.Employee;
import com.fyp.hrw.repo.AttendanceRepo;
import com.fyp.hrw.repo.EmployeeRepo;
import com.fyp.hrw.repo.LeaveRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class EmployeeService {
    private final EmployeeRepo employeeRepo;

    private final AttendanceRepo attendanceRepo;

    private final LeaveRepo leaveRepo;

    @Autowired
    public EmployeeService(EmployeeRepo employeeRepo, AttendanceRepo attendanceRepo, LeaveRepo leaveRepo) {
        this.employeeRepo = employeeRepo;
        this.attendanceRepo = attendanceRepo;
        this.leaveRepo = leaveRepo;
    }

    public Employee addUser(Employee employee) {
        return employeeRepo.save(employee);
    }

    public List<Employee> findAllUser() {
        return employeeRepo.findAll();
    }

    public Employee updateUser(Employee employee) {
        return employeeRepo.save(employee);
    }

    public void updateUserWithoutPassword(Employee employee) {
        employeeRepo.updateUserWithoutPassword(employee.getUsername(), employee.getName(), employee.getGender(),
                employee.getEmail(), employee.getPhone(), employee.getIc(), employee.getAddress(),
                employee.getAnnualLeaveDays(), employee.getSickLeaveDays(), employee.getFamilyLeaveDays());
    }

    public Employee findUserByUsername(String username) {
        return employeeRepo.findUserByUsername(username).orElseThrow(() -> new RecordNotFoundException("User Not Found"));
    }

    public Employee findUserById(Long id) {
        return employeeRepo.findById(id).orElseThrow(() -> new RecordNotFoundException("User Not Found"));
    }

    public void deleteEmployeeByUsername(String username) {
//        Employee e = findUserByUsername(username);
//        attendanceRepo.deleteAttendanceById(e.getId());
//        leaveRepo.deleteLeaveById(e.getId());
        employeeRepo.deleteUserByUsername(username);
    }

    public void updateRemainingLeaveDays(Long id, String leaveType, int remainingDays) {
        switch (leaveType) {
            case "Annual Leave":
                employeeRepo.updateAnnualDays(id, remainingDays);
                break;
            case "Sick Leave":
                employeeRepo.updateSickDays(id, remainingDays);
                break;
            case "Family Leave":
                employeeRepo.updateFamilyDays(id, remainingDays);
                break;
        }
    }
}
