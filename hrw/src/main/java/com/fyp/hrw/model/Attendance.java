package com.fyp.hrw.model;

import javax.persistence.*;
import java.io.Serializable;
import java.sql.Date;
import java.sql.Time;
import java.sql.Timestamp;

@Entity
public class Attendance implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false, updatable = false)
    private Long id;
    @Column(nullable = false, updatable = false)
    private String empId;
    private String leaveId;
    private Date date;
    private Time clockIn;
    private Time clockOut;
    private boolean late;

    public Attendance(String empId, String leaveId, Date date, Time clockIn, Time clockOut, boolean late) {
        this.empId = empId;
        this.leaveId = leaveId;
        this.date = date;
        this.clockIn = clockIn;
        this.clockOut = clockOut;
        this.late = late;
    }

    public Attendance() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getEmpId() {
        return empId;
    }

    public void setEmpId(String empId) {
        this.empId = empId;
    }

    public String getLeaveId() {
        return leaveId;
    }

    public void setLeaveId(String leaveId) {
        this.leaveId = leaveId;
    }

    public Time getClockIn() {
        return clockIn;
    }

    public void setClockIn(Time clockIn) {
        this.clockIn = clockIn;
    }

    public Time getClockOut() {
        return clockOut;
    }

    public void setClockOut(Time clockOut) {
        this.clockOut = clockOut;
    }

    public boolean isLate() {
        return late;
    }

    public void setLate(boolean late) {
        this.late = late;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }
}
