package com.fyp.hrw.controller;

import com.fyp.hrw.model.EmployeeLeave;
import com.fyp.hrw.model.Employee;
import com.fyp.hrw.payload.request.AddLeaveRequest;
import com.fyp.hrw.payload.request.DenyLeaveRequest;
import com.fyp.hrw.service.LeaveService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.text.ParseException;
import java.util.List;

@RestController
@RequestMapping("/api/leave")
public class LeaveController {

    private final LeaveService leaveService;

    public LeaveController(LeaveService leaveService) {
        this.leaveService = leaveService;
    }

    @GetMapping("/all")
    public ResponseEntity<List<EmployeeLeave>> getAllEmployeeLeaves() {
        List<EmployeeLeave> employeeLeaveList = leaveService.findAllLeaves();
        return new ResponseEntity<>(employeeLeaveList, HttpStatus.OK);
    }

    @GetMapping("/find-by-emp/{empId}")
    public ResponseEntity<List<EmployeeLeave>> getEmployeeLeavesByEmp(@PathVariable("empId") String empId) throws ParseException {
        List<EmployeeLeave> employeeLeaveList = leaveService.findLeavesByEmployee(empId);
        return new ResponseEntity<>(employeeLeaveList, HttpStatus.OK);
    }

    @GetMapping("/find/{id}")
    public ResponseEntity<EmployeeLeave> getEmployeeLeave(@PathVariable("id") String id) {
        EmployeeLeave employeeLeave = leaveService.findById(id);
        return new ResponseEntity<>(employeeLeave, HttpStatus.OK);
    }

    @PostMapping("/add")
    public ResponseEntity<EmployeeLeave> addLeave(@RequestBody AddLeaveRequest addLeaveRequest) throws ParseException {
        EmployeeLeave newEmployeeLeave = leaveService.addLeave(addLeaveRequest);
        return new ResponseEntity<>(newEmployeeLeave, HttpStatus.CREATED);
    }

    @PutMapping("/update")
    public ResponseEntity<EmployeeLeave> updateLeave(@RequestBody EmployeeLeave employeeLeave) {
        EmployeeLeave updateEmployeeLeave = leaveService.updateLeave(employeeLeave);
        return new ResponseEntity<>(updateEmployeeLeave, HttpStatus.OK);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Employee> deleteLeave(@PathVariable("id") String id) {
        leaveService.deleteLeaveById(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PutMapping("/approve-leave/{id}")
    public ResponseEntity<EmployeeLeave> approveUser(@PathVariable("id") String id) {
        EmployeeLeave updateEmployeeLeave = leaveService.approveLeaveById(id);
        return new ResponseEntity<>(updateEmployeeLeave, HttpStatus.OK);
    }

    @PutMapping("/deny-leave")
    public ResponseEntity<EmployeeLeave> denyLeave(@RequestBody DenyLeaveRequest denyLeaveRequest) {
        EmployeeLeave updateEmployeeLeave = leaveService.denyLeave(denyLeaveRequest);
        return new ResponseEntity<>(updateEmployeeLeave, HttpStatus.OK);
    }
}
