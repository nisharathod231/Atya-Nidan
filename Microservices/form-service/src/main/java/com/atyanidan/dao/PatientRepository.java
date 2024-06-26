package com.atyanidan.dao;

import com.atyanidan.entity.mysql.Patient;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PatientRepository extends JpaRepository<Patient, Integer> {
    Patient findByAbhaNumber(String abhaNumber);

    Patient findByPatientNumber(String patientNumber);
}
