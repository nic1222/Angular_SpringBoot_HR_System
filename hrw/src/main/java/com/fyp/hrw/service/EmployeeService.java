package com.fyp.hrw.service;

import com.fyp.hrw.exception.UserNotFoundException;
import com.fyp.hrw.model.Employee;
import com.fyp.hrw.repo.IEmployeeRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.nio.file.attribute.UserPrincipalNotFoundException;
import java.util.List;

@Service
@Transactional
public class EmployeeService {
    private final IEmployeeRepo iEmployeeRepo;

    @Autowired
    public EmployeeService(IEmployeeRepo iEmployeeRepo) {
        this.iEmployeeRepo = iEmployeeRepo;
    }

    public Employee addEmployee(Employee employee) {
        return iEmployeeRepo.save(employee);
    }

    public List<Employee> findAllEmployee() {
        return iEmployeeRepo.findAll();
    }

    public Employee updateEmployee(Employee employee) {
        return iEmployeeRepo.save(employee);
    }

    public Employee findEmployeeById(Long id) {
        return iEmployeeRepo.findEmployeeById(id).orElseThrow(()-> new UserNotFoundException("User Not Found"));
    }

    public void deleteEmployee(Long id) {
        iEmployeeRepo.deleteEmployeeById(id);
    }
}
