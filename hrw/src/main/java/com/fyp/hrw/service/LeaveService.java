package com.fyp.hrw.service;

import com.fyp.hrw.exception.RecordNotFoundException;
import com.fyp.hrw.model.EmployeeLeave;
import com.fyp.hrw.model.Employee;
import com.fyp.hrw.payload.request.AddLeaveRequest;
import com.fyp.hrw.payload.request.DenyLeaveRequest;
import com.fyp.hrw.repo.EmployeeRepo;
import com.fyp.hrw.repo.LeaveRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.text.ParseException;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

@Service
@Transactional
public class LeaveService {
    private final LeaveRepo leaveRepo;

    private final EmployeeRepo employeeRepo;

    private final EmployeeService employeeService;

    @Autowired
    public LeaveService(LeaveRepo leaveRepo, EmployeeRepo employeeRepo, EmployeeService employeeService) {
        this.leaveRepo = leaveRepo;
        this.employeeRepo = employeeRepo;
        this.employeeService = employeeService;
    }

    public EmployeeLeave addLeave(AddLeaveRequest addLeaveRequest) throws ParseException {
        EmployeeLeave employeeLeave = new EmployeeLeave();
        employeeLeave.setType(addLeaveRequest.getType());
        employeeLeave.setLeaveReason(addLeaveRequest.getLeaveReason());
        employeeLeave.setStatus("PENDING");
        employeeLeave.setFilename(addLeaveRequest.getFilename());
        Employee emp = employeeRepo.findById(Long.parseLong(addLeaveRequest.getUserId()))
                .orElseThrow(() -> new RecordNotFoundException("User Not Found"));
        employeeLeave.setEmployee(emp);
        // find the number of days between two dates
        Date dateFrom = addLeaveRequest.getDateFrom();
        Date dateTo = addLeaveRequest.getDateTo();
        Calendar calFrom = Calendar.getInstance();
        Calendar calTo = Calendar.getInstance();
        calFrom.setTime(dateFrom);
        calTo.setTime(dateTo);
        // calculate the number of day between start and end day
        int numberOfDays = 1;
        while (calFrom.before(calTo)) {
            if ((Calendar.SATURDAY != calFrom.get(Calendar.DAY_OF_WEEK))
                    && (Calendar.SUNDAY != calFrom.get(Calendar.DAY_OF_WEEK))) {
                numberOfDays++;
            }
            calFrom.add(Calendar.DATE, 1);
        }
        // check if leave day is enough
        switch (employeeLeave.getType()) {
            case "Annual Leave":
                if (emp.getAnnualLeaveDays() - numberOfDays >= 0) {
                    int remainingDays = emp.getAnnualLeaveDays() - numberOfDays;
                    this.employeeService.updateRemainingLeaveDays(emp.getId(), "Annual Leave", remainingDays);
                } else {
                    return null;
                }
                break;
            case "Sick Leave":
                if (emp.getSickLeaveDays() - numberOfDays >= 0) {
                    int remainingDays = emp.getSickLeaveDays() - numberOfDays;
                    this.employeeService.updateRemainingLeaveDays(emp.getId(), "Sick Leave", remainingDays);
                } else {
                    return null;
                }
                break;
            case "Family Leave":
                if (emp.getFamilyLeaveDays() - numberOfDays >= 0) {
                    int remainingDays = emp.getFamilyLeaveDays() - numberOfDays;
                    this.employeeService.updateRemainingLeaveDays(emp.getId(), "Family Leave", remainingDays);
                } else {
                    return null;
                }
                break;
        }
        employeeLeave.setDuration(numberOfDays);
        employeeLeave.setDateFrom(dateFrom);
        employeeLeave.setDateTo(dateTo);
        return leaveRepo.save(employeeLeave);
    }

    public List<EmployeeLeave> findAllLeaves() {
        return leaveRepo.findAll();
    }

    public EmployeeLeave findById(String id) {
        return leaveRepo.findById(Long.parseLong(id)).orElseThrow(() -> new RecordNotFoundException("Leave Not Found"));
    }

    public List<EmployeeLeave> findLeavesByEmployee(String empId) throws ParseException {
        Employee employee = employeeRepo.findById(Long.valueOf(empId))
                .orElseThrow(() -> new RecordNotFoundException("User Not Found"));
        return leaveRepo.findLeavesByEmployee(employee)
                .orElseThrow(() -> new RecordNotFoundException("Leave Not Found"));
    }

    public EmployeeLeave updateLeave(EmployeeLeave employeeLeave) {
        //add back the leave day of employee
        int toAddBackDay = employeeLeave.getDuration();
        Employee emp1 = employeeLeave.getEmployee();
        switch (employeeLeave.getType()) {
            case "Annual Leave":
                int d = emp1.getAnnualLeaveDays() + toAddBackDay;
                this.employeeService.updateRemainingLeaveDays(emp1.getId(), "Annual Leave", d);
                break;
            case "Sick Leave":
                int d1 = emp1.getSickLeaveDays() + toAddBackDay;
                this.employeeService.updateRemainingLeaveDays(emp1.getId(), "Sick Leave", d1);
                break;
            case "Family Leave":
                int d2 = emp1.getFamilyLeaveDays() + toAddBackDay;
                this.employeeService.updateRemainingLeaveDays(emp1.getId(), "Family Leave", d2);
                break;
        }

        //check the remaining leave day, if enough then deduct, else return null
        Employee emp = employeeRepo.findById(employeeLeave.getEmployee().getId())
                .orElseThrow(() -> new RecordNotFoundException("User Not Found"));

        Date dateFrom = employeeLeave.getDateFrom();
        Date dateTo = employeeLeave.getDateTo();
        Calendar calFrom = Calendar.getInstance();
        Calendar calTo = Calendar.getInstance();
        calFrom.setTime(dateFrom);
        calTo.setTime(dateTo);

        int numberOfDays = 1;
        while (calFrom.before(calTo)) {
            if ((Calendar.SATURDAY != calFrom.get(Calendar.DAY_OF_WEEK))
                    && (Calendar.SUNDAY != calFrom.get(Calendar.DAY_OF_WEEK))) {
                numberOfDays++;
            }
            calFrom.add(Calendar.DATE, 1);
        }
        switch (employeeLeave.getType()) {
            case "Annual Leave":
                if (emp.getAnnualLeaveDays() - numberOfDays >= 0) {
                    int remainingDays = emp.getAnnualLeaveDays() - numberOfDays;
                    this.employeeService.updateRemainingLeaveDays(emp.getId(), "Annual Leave", remainingDays);
                } else {
                    return null;
                }
                break;
            case "Sick Leave":
                if (emp.getSickLeaveDays() - numberOfDays >= 0) {
                    int remainingDays = emp.getAnnualLeaveDays() - numberOfDays;
                    this.employeeService.updateRemainingLeaveDays(emp.getId(), "Sick Leave", remainingDays);
                } else {
                    return null;
                }
                break;
            case "Family Leave":
                if (emp.getFamilyLeaveDays() - numberOfDays >= 0) {
                    int remainingDays = emp.getAnnualLeaveDays() - numberOfDays;
                    this.employeeService.updateRemainingLeaveDays(emp.getId(), "Family Leave", remainingDays);
                } else {
                    return null;
                }
                break;
        }
        employeeLeave.setDuration(numberOfDays);
        return leaveRepo.save(employeeLeave);
    }

    public void deleteLeaveById(String id) {
        EmployeeLeave employeeLeave = findById(id);
        int toAddBackDay = employeeLeave.getDuration();
        Employee emp = employeeRepo.findById(employeeLeave.getEmployee().getId())
                .orElseThrow(() -> new RecordNotFoundException("User Not Found"));
        switch (employeeLeave.getType()) {
            case "Annual Leave":
                int d = emp.getAnnualLeaveDays() + toAddBackDay;
                this.employeeService.updateRemainingLeaveDays(emp.getId(), "Annual Leave", d);
                break;
            case "Sick Leave":
                int d1 = emp.getSickLeaveDays() + toAddBackDay;
                this.employeeService.updateRemainingLeaveDays(emp.getId(), "Sick Leave", d1);
                break;
            case "Family Leave":
                int d2 = emp.getFamilyLeaveDays() + toAddBackDay;
                this.employeeService.updateRemainingLeaveDays(emp.getId(), "Family Leave", d2);
                break;
        }

        leaveRepo.deleteLeaveById(Long.valueOf(id));
    }

    public EmployeeLeave approveLeaveById(String id) {
        EmployeeLeave returnedEmployeeLeave = leaveRepo.findById(Long.parseLong(id))
                .orElseThrow(() -> new RecordNotFoundException("Leave Not Found"));
        returnedEmployeeLeave.setStatus("APPROVED");
        returnedEmployeeLeave.setDeniedReason("");
        return leaveRepo.save(returnedEmployeeLeave);
    }

    public EmployeeLeave denyLeave(DenyLeaveRequest denyLeaveRequest) {
        EmployeeLeave returnedEmployeeLeave = leaveRepo.findById(Long.parseLong(denyLeaveRequest.getId()))
                .orElseThrow(() -> new RecordNotFoundException("Leave Not Found"));
        returnedEmployeeLeave.setStatus("DENIED");
        returnedEmployeeLeave.setDeniedReason(denyLeaveRequest.getDeniedReason());

        int toAddBackDay = returnedEmployeeLeave.getDuration();
        Employee emp = employeeRepo.findById(returnedEmployeeLeave.getEmployee().getId())
                .orElseThrow(() -> new RecordNotFoundException("User Not Found"));
        switch (returnedEmployeeLeave.getType()) {
            case "Annual Leave":
                int d = emp.getAnnualLeaveDays() + toAddBackDay;
                this.employeeService.updateRemainingLeaveDays(emp.getId(), "Annual Leave", d);
                break;
            case "Sick Leave":
                int d1 = emp.getSickLeaveDays() + toAddBackDay;
                this.employeeService.updateRemainingLeaveDays(emp.getId(), "Sick Leave", d1);
                break;
            case "Family Leave":
                int d2 = emp.getFamilyLeaveDays() + toAddBackDay;
                this.employeeService.updateRemainingLeaveDays(emp.getId(), "Family Leave", d2);
                break;
        }

        return leaveRepo.save(returnedEmployeeLeave);
    }

}
