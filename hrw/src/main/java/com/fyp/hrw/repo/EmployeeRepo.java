package com.fyp.hrw.repo;

import com.fyp.hrw.model.EGender;
import com.fyp.hrw.model.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface EmployeeRepo extends JpaRepository<Employee, Long> {

    Optional<Employee> findUserByUsername(String username);

    @Modifying
    @Query("UPDATE Employee u SET u.name=?2 , u.gender=?3 , u.email=?4 , u.phone=?5 , u.ic=?6 , u.address=?7, u.annualLeaveDays=?8, u.sickLeaveDays=?9, u.familyLeaveDays=?10 WHERE u.username=?1")
    void updateUserWithoutPassword(String username, String name, EGender gender, String email, String phone,
                                   String ic, String address, int annual, int sick, int family);

    @Modifying
    @Query("UPDATE Employee u SET u.annualLeaveDays=?2 WHERE u.id=?1")
    void updateAnnualDays(Long id, int day);

    @Modifying
    @Query("UPDATE Employee u SET u.sickLeaveDays=?2 WHERE u.id=?1")
    void updateSickDays(Long id, int day);

    @Modifying
    @Query("UPDATE Employee u SET u.familyLeaveDays=?2 WHERE u.id=?1")
    void updateFamilyDays(Long id, int day);

    void deleteUserByUsername(String username);

    Boolean existsByUsername(String username);
    
    Boolean existsByEmail(String email);
}
