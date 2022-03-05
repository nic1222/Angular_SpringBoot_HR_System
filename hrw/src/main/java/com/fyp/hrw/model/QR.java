package com.fyp.hrw.model;

import javax.persistence.*;
import java.io.Serializable;

@Entity
public class QR implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(nullable = false, updatable = false)
    private Long id;
    private String qrInfo;

    public QR() {
    }

    public QR(Long id, String qrInfo) {
        this.id = id;
        this.qrInfo = qrInfo;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getQrInfo() {
        return qrInfo;
    }

    public void setQrInfo(String qrInfo) {
        this.qrInfo = qrInfo;
    }
}
