package com.atyanidan.entity.actor;

import com.atyanidan.entity.Specialisation;
import com.atyanidan.entity.Taluka;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;

import java.sql.Date;

@Entity
@Table(name = "Doctor")
@PrimaryKeyJoinColumn(name = "doctor_id")
public class Doctor extends User {

    @Column(name = "first_name")
    @NotNull
    private String firstName;

    @Column(name = "middle_name")
    private String middleName;

    @Column(name = "last_name")
    @NotNull
    private String lastName;

    @Column(name = "home_address")
    @NotNull
    private String homeAddress;

    @Column(name = "hospital_address")
    @NotNull
    private String hospitalAddress;

    @Column(name = "nearest_railway_station")
    private String nearestRailwayStation;

    @Column(name = "gender")
    private String gender;

    @ManyToOne
    @JoinColumn(name = "specialisation_id")
    @NotNull
    private Specialisation specialisation;

    @ManyToOne
    @JoinColumn(name = "taluka_id")
    @NotNull
    private Taluka taluka;

    @Column(name = "dob")
    private Date dob;

    @Column(name = "blood_group")
    private String bloodGroup;

    @Column(name = "aadhar_number")
    private String aadharNumber;

    public Doctor() {
    }

    public Doctor(String firstName, String middleName, String lastName, String homeAddress, String hospitalAddress, String gender, Date dob, String bloodGroup, String aadharNumber, String nearestRailwayStation, Specialisation specialisation) {
        this.firstName = firstName;
        this.middleName = middleName;
        this.lastName = lastName;
        this.homeAddress = homeAddress;
        this.hospitalAddress = hospitalAddress;
        this.gender = gender;
        this.dob = dob;
        this.bloodGroup = bloodGroup;
        this.aadharNumber = aadharNumber;
        this.nearestRailwayStation = nearestRailwayStation;
        this.specialisation = specialisation;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getHomeAddress() {
        return homeAddress;
    }

    public void setHomeAddress(String homeAddress) {
        this.homeAddress = homeAddress;
    }

    public Date getDob() {
        return dob;
    }

    public void setDob(Date dob) {
        this.dob = dob;
    }

    public String getMiddleName() {
        return middleName;
    }

    public void setMiddleName(String middleName) {
        this.middleName = middleName;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public String getBloodGroup() {
        return bloodGroup;
    }

    public void setBloodGroup(String bloodGroup) {
        this.bloodGroup = bloodGroup;
    }

    public Taluka getTaluka() {
        return taluka;
    }

    public void setTaluka(Taluka taluka) {
        this.taluka = taluka;
    }

    public String getAadharNumber() {
        return aadharNumber;
    }

    public void setAadharNumber(String aadharNumber) {
        this.aadharNumber = aadharNumber;
    }

    public String getNearestRailwayStation() {
        return nearestRailwayStation;
    }

    public void setNearestRailwayStation(String nearestRailwayStation) {
        this.nearestRailwayStation = nearestRailwayStation;
    }

    public String getHospitalAddress() {
        return hospitalAddress;
    }

    public void setHospitalAddress(String hospitalAddress) {
        this.hospitalAddress = hospitalAddress;
    }

    public Specialisation getSpecialisation() {
        return specialisation;
    }

    public void setSpecialisation(Specialisation specialisation) {
        this.specialisation = specialisation;
    }
}
