package com.fyp.hrw.controller;

import com.fyp.hrw.model.Employee;
import com.fyp.hrw.repo.EmployeeRepo;
import com.fyp.hrw.service.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/api/employee")
public class EmployeeController {

    @Autowired
    PasswordEncoder encoder;

    private final EmployeeService employeeService;

    private final EmployeeRepo employeeRepo;

    public EmployeeController(EmployeeService employeeService, EmployeeRepo employeeRepo) {
        this.employeeService = employeeService;
        this.employeeRepo = employeeRepo;
    }

    @GetMapping("/all")
    public ResponseEntity<List<Employee>> getAllUsers() {
        List<Employee> employeeList = employeeService.findAllUser();
        return new ResponseEntity<>(employeeList, HttpStatus.OK);
    }

    @GetMapping("/find/{id}")
    public ResponseEntity<Employee> getUser(@PathVariable("id") Long id) {
        Employee employee = employeeService.findUserById(id);
        return new ResponseEntity<>(employee, HttpStatus.OK);
    }

    @PostMapping("/add")
    public ResponseEntity<Employee> addUser(@RequestBody Employee employee) {
        Employee newEmployee = employeeService.addUser(employee);
        return new ResponseEntity<>(newEmployee, HttpStatus.CREATED);
    }

    @PutMapping("/update")
    public ResponseEntity<?> updateUser(@RequestBody Employee employee) {
        Employee updateEmployee = new Employee();
        if (!employee.getPassword().isEmpty()) {
            String encodePassword = encoder.encode(employee.getPassword());
            employee.setPassword(encodePassword);
            updateEmployee = employeeService.updateUser(employee);
        } else {
            employeeService.updateUserWithoutPassword(employee);
        }
        return new ResponseEntity<>(updateEmployee, HttpStatus.OK);
    }

    @DeleteMapping("/delete/{username}")
    public ResponseEntity<Employee> deleteEmployee(@PathVariable("username") String username) {
        employeeService.deleteEmployeeByUsername(username);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
