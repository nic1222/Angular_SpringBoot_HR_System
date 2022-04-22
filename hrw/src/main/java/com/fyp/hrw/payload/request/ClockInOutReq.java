package com.fyp.hrw.payload.request;

import javax.validation.constraints.NotBlank;

public class ClockInOutReq {
    @NotBlank
    private String employeeId;

    public String getEmployeeId() {
        return employeeId;
    }

    public void setEmployeeId(String employeeId) {
        this.employeeId = employeeId;
    }
}
