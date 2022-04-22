package com.fyp.hrw.payload.request;

public class LeaveDayRequest {
    private Long id;

    private int annualLeaveDays;

    private int sickLeaveDays;

    private int familyLeaveDays;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public int getAnnualLeaveDays() {
        return annualLeaveDays;
    }

    public void setAnnualLeaveDays(int annualLeaveDays) {
        this.annualLeaveDays = annualLeaveDays;
    }

    public int getSickLeaveDays() {
        return sickLeaveDays;
    }

    public void setSickLeaveDays(int sickLeaveDays) {
        this.sickLeaveDays = sickLeaveDays;
    }

    public int getFamilyLeaveDays() {
        return familyLeaveDays;
    }

    public void setFamilyLeaveDays(int familyLeaveDays) {
        this.familyLeaveDays = familyLeaveDays;
    }
}
