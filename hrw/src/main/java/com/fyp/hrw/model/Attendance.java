package com.fyp.hrw.model;

import javax.persistence.*;
import java.io.Serializable;
import java.sql.Timestamp;
import java.time.LocalDate;

@Entity
public class Attendance implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false, updatable = false)
    private String id;
    private String empId;
    private String leaveId;
    private Timestamp in;
    private Timestamp out;
    private LocalDate date;
}
