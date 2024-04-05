import React, { useState, useRef, useEffect } from 'react';
import { Alert, ScrollView, View, StyleSheet } from 'react-native';
import UserInformation from './UserInformation'; 
import axios from 'axios';
import { API_PATHS } from '../constants/apiConstants';
import { useAuth } from '../Context/AuthContext'; // Adjust the import path as needed


const AddUser = ({ saveModal }) => {
  console.log("saveModalFw", saveModal)
  const { authToken } = useAuth(); // Accessing the authToken
  const [firstName, setfirstName] = useState('');
  const [middleName, setmiddleName] = useState('');
  const [lastName, setlastName] = useState('');
  const [address, setAddress] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [emailId, setEmailId] = useState('');
  const [dateofbirth, setDateOfBirth] = useState('');
  const [gender, setGender] = useState('');
  const [aadhar, setAadhar] = useState('');
  const [railwaystation, setRailwayStation] = useState('');
  const [clinicaddress, setClinicAddress] = useState('');
  const [specialisation, setSpecialisation] = useState('');
  const [taluka, setTaluka] = useState('');
  const [bloodgroup, setBloodGroup] = useState('');
  const [lagknown1, setLangKnown1] = useState('');
  const [lagknown2, setLangKnown2] = useState('');
  const [lagknown3, setLangKnown3] = useState('');
  const [errors, setErrors] = useState({});
  const [talukaList, setTalukaList] = useState([]);
  const [specialisationList, setSpecialisationList] = useState([]);

  const scrollViewRef = useRef();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Include authToken in request headers for fetching talukas
        const talukasResponse = await axios.get(API_PATHS.TALUKAS.replace(':districtId', '2'), {
          headers: {
            Authorization: `Bearer ${authToken}`, // Using authToken for authentication
          }
        });
        setTalukaList(talukasResponse.data);
  
        // Include authToken in request headers for fetching specialisations
        const specialisationsResponse = await axios.get(API_PATHS.SPECIALISATIONS, {
          headers: {
            Authorization: `Bearer ${authToken}`, // Using authToken for authentication
          }
        });
        setSpecialisationList(specialisationsResponse.data);
      } catch (error) {
        console.log('Error fetching lists:', error);
      }
    };
  
    fetchData();
  }, [authToken]); // Add authToken as a dependency to re-run the effect if it changes
  
    // useEffect(() => {
    //   const fetchData = async () => {
    //     try {
    //       // Fetch talukas
    //       const talukasResponse = await axios.get(API_PATHS.TALUKAS.replace(':districtId', '2'));
    //       setTalukaList(talukasResponse.data);
  
    //       // Fetch specialisations
    //       const specialisationsResponse = await axios.get(API_PATHS.SPECIALISATIONS);
    //       setSpecialisationList(specialisationsResponse.data);
    //     } catch (error) {
    //       console.log('Error fetching lists:', error);
    //     }
    //   };
  
    //   fetchData();
    // }, []);

    const validateField = (fieldName, value) => {
      let hasError = false;
      if (fieldName === 'taluka') {
        // Ensure that taluka is not empty and is an integer
        if (value === '' || isNaN(value) || parseInt(value, 10) !== Number(value)) {
          hasError = true;
        }
      }
      else if (fieldName === 'specialisation') {
        // Ensure that specialisation is not empty and is an integer
        if (value === '' || isNaN(value) || parseInt(value, 10) !== Number(value)) {
          hasError = true;
        }
      }
      else{
      // Checking for non-empty values for all fields
      if (!value.trim()) {
          hasError = true;
      } 
      // Specific validation for the email field
      else if (fieldName === 'emailId' && !value.endsWith('@gmail.com')) {
          hasError = true;
      } 
      // Specific validation for the contact number field
      else if (fieldName === 'contactNumber') {
          // Regex to check if the contact number contains exactly 10 digits
          const phoneNumberRegex = /^\d{10}$/;
          if (!phoneNumberRegex.test(value)) {
              hasError = true;
          }
      }

      else if (fieldName === 'aadhar') {
        // Regex to check if the contact number contains exactly 10 digits
        const aadharNumberRegex = /^\d{12}$/;
        if (!aadharNumberRegex.test(value)) {
            hasError = true;
        }
    }
    
    else if (fieldName === 'dateofbirth') {
      const dateRegex = /^\d{4}-(\d{2})-(\d{2})$/;
      const matches = value.match(dateRegex);

      if (matches) {
          const year = parseInt(matches[0], 10);
          const month = parseInt(matches[1], 10);
          const day = parseInt(matches[2], 10);

          const dateIsValid = year > 0 &&
                              month >= 1 && month <= 12 &&
                              day >= 1 && day <= 31 &&
                              !isNaN(Date.parse(value));

          if (!dateIsValid) {
              hasError = true;
          }
      } else {
          hasError = false;
      }
  }
}
      setErrors(prevErrors => {
          const newErrors = { ...prevErrors };
          if (hasError) {
              // Set error
              newErrors[fieldName] = true;
          } else {
              // Clear error for this field
              // newErrors[fieldName] = false;
              delete newErrors[fieldName];
          }
          return newErrors;
      });
      return hasError
  };
  
      
  const handleSubmitOrClose = () => {
    
    saveModal();
  };
  const handleImageUpload = () => {
    //Upload image
    };
    const handleSubmit = async () => {
      console.log("handleSubmit called"); // Add this line

      const fieldsToValidate = {firstName, lastName, address, dateofbirth, gender, aadhar, emailId, contactNumber, taluka, lagknown1, specialisation, clinicaddress}; // Extend this with more fields as needed
      let isValid = true;

      // Validate each field in the list
      Object.keys(fieldsToValidate).forEach(fieldName => {
          isValid = !validateField(fieldName, fieldsToValidate[fieldName]) && isValid;
      });

      if (!isValid) {
        console.log("form is not valid")
          return; // Stop the submission if any field is invalid
      }
      console.log("correct called"); // Add this line

      // Reset the errors if all validations pass
      setErrors({});

      const data = {
        "phoneNumber": contactNumber,
        "email": emailId,
        "role": "Doctor",
        "firstName": firstName, 
        "middleName": middleName,
        "lastName": lastName,
        "homeAddress": address,
        "hospitalAddress": clinicaddress,
        "nearestRailwayStation": railwaystation,
        "gender": gender,
        "taluka": {
            "id": taluka
        },
        "dob": dateofbirth,
        "bloodGroup": bloodgroup,
        "aadharNumber": aadhar,
        "languageKnown1": lagknown1,
        "languageKnown2": lagknown2,
        "languageKnown3": lagknown3,
        "specialisation": {
          "id": specialisation
        }
      };
      
      const fieldworkersByDoctors = API_PATHS.POST_DOCTORS_BY_DISTRICTS.replace(':talukaId', taluka);
      axios.post(fieldworkersByDoctors, data, {
        headers: {
          Authorization: `Bearer ${authToken}`, 
          'Content-Type': 'application/json'
        }
      })
          .then(response => {
              console.log('Response:', response.data);
              Alert.alert('Success', 'Doctor added successfully!');
              saveModal();
          })
          .catch(error => {
            // if (error.response && error.response.status === 409) {
            //   // Here you can extract more details if your API sends specific messages for email vs phone
            //   Alert.alert('Error', 'Phone number or email already exists.');
            //   // Alert.alert(error.response)
            // }
            // else if (error.response && error.response.status === 500){
            //   Alert.alert('Server Error', 'Our Server is down. Please try again later');
            // }
            // else{
            //   // Handle error
            //   console.error('Error:', error);
            //   // Show error message or perform any other actions
            //   Alert.alert('Error', 'Failed to add Doctor. Please try again later.');
            //   saveModal();
            // }
            if (error.response) {
              const message = error.response.data.message || "Our Server is down. Please try again later";
              Alert.alert('Error', message);
            } else {
              console.error('Error:', error);
              Alert.alert('Error', 'Failed to add Doctor. Please try again later.');
            }
          });
          
  };

  return (
      <View style={styles.container}>        
        {/* Main Content */}
        
        <ScrollView ref={scrollViewRef} style={styles.mainContent} alwaysBounceVertical={false}> 
        <UserInformation
          firstName={firstName}
          middleName={middleName}
          lastName={lastName}
          address={address}
          contactNumber={contactNumber}
          emailId={emailId}
          setfirstName={setfirstName}
          setmiddleName={setmiddleName}
          setlastName={setlastName}
          setAddress={setAddress}
          setContactNumber={setContactNumber}
          setEmailId={setEmailId}
          handleImageUpload={handleImageUpload} // Pass handleImageUpload as a prop
          saveModal={saveModal}
          handleSubmit={handleSubmit}
          setAadhar={setAadhar}
          aadhar={aadhar}
          setGender={setGender}
          gender={gender}
          setDateOfBirth={setDateOfBirth}
          dateofbirth={dateofbirth}
          setRailwayStation={setRailwayStation}
          railwaystation={railwaystation}
          clinicaddress={clinicaddress}
          setClinicAddress={setClinicAddress}
          bloodgroup = {bloodgroup}
          setBloodGroup = {setBloodGroup}
          taluka = {taluka}
          setTaluka = {setTaluka}
          validateField = {validateField}
          errors = {errors}
          setErrors = {setErrors}
          handleSubmitOrClose = {handleSubmitOrClose}
          talukaList = {talukaList}
          setLangKnown3 = {setLangKnown3}
          setLangKnown2 = {setLangKnown2}
          setLangKnown1 = {setLangKnown1}
          lagknown3 = {lagknown3}
          lagknown2 = {lagknown2}
          lagknown1 = {lagknown1}
          specialisation = {specialisation}
          setSpecialisation = {setSpecialisation}
          specialisationList = {specialisationList}
          setSpecialisationList = {setSpecialisationList}
      />
        </ScrollView>
      </View>
  );
};

const styles = StyleSheet.create({

  container: {
    flex: 1,
    flexDirection: 'row',
  },
  mainContent: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default AddUser;
