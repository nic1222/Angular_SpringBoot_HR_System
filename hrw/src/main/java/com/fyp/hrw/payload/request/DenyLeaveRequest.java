package com.fyp.hrw.payload.request;

import javax.validation.constraints.NotBlank;

public class DenyLeaveRequest {
    @NotBlank
    private String id;

    @NotBlank
    private String deniedReason;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getDeniedReason() {
        return deniedReason;
    }

    public void setDeniedReason(String deniedReason) {
        this.deniedReason = deniedReason;
    }
}
