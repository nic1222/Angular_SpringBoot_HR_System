package com.fyp.hrw.repo;

import com.fyp.hrw.model.Employee;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface IEmployeeRepo extends JpaRepository<Employee, Long> {
    //    Employee findEmployeeById(Long id);
    Optional<Employee> findEmployeeById(Long id);

    void deleteEmployeeById(Long id);
}
