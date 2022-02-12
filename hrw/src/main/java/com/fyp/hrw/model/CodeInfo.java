package com.fyp.hrw.model;

import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.UUID;

@Entity
public class CodeInfo implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(nullable = false,updatable = false)
    private String id = UUID.randomUUID().toString();
    private LocalDateTime dateTime;
    private String employeeId;
}
