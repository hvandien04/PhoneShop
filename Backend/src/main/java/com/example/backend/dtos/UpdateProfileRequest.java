package com.example.backend.dtos;

public class UpdateProfileRequest {
    private String fullName;
    private String email;
    private String address;
    private String phone;

    public UpdateProfileRequest(String fullName, String email, String address, String phone) {
        this.fullName = fullName;
        this.email = email;
        this.address = address;
        this.phone = phone;
    }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

}
