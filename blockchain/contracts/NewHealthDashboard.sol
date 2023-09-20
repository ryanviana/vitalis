// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import "./AnamnesisContract.sol";

contract NewHealthDashboard {

    AnamnesisContract public anamnesisContract;

    struct Diagnosis {
        string diagnosisName;
        string diagnosisId;
    }

    struct MedicalConsultationData {
        uint timestamp;
        string conditions;
        string medications;
        string observations;
        Diagnosis diagnosis;
    }

    struct DoctorDetails {
        string name;
        string crm;
        bool verified;
    }

    mapping(address => MedicalConsultationData[]) private userMedicalRecords;
    mapping(address => bool) public patientRegistered;
    mapping(address => DoctorDetails) public doctors;
    mapping(address => mapping(address => bool)) public patientDoctorAuthorization;

    address public admin;

    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin can perform this action");
        _;
    }

    modifier onlyPatient() {
        require(patientRegistered[msg.sender] == true, "Only registered patients can perform this action");
        _;
    }

    modifier onlyDoctor() {
        require(doctors[msg.sender].verified == true, "Only verified doctors can perform this action");
        _;
    }

    modifier notPatient() {
        require(patientRegistered[msg.sender] == false, "Registered patients can not perform this action");
        _;
    }

    modifier notDoctor() {
        require(doctors[msg.sender].verified == false, "Verified doctors can not perform this action");
        _;
    }

    modifier onlyAuthorizedDoctors(address patient) {
        require(patientDoctorAuthorization[patient][msg.sender], "Only authorized doctors for this patient can perform this action");
        _;
    }

    constructor() {
        admin = msg.sender;
        anamnesisContract = new AnamnesisContract();
    }

    function registerPatient() public notPatient {
        patientRegistered[msg.sender] = true;
    }

    function registerDoctor(string memory _name, string memory _crm) public notDoctor {
        DoctorDetails memory newDoctor = DoctorDetails({
            name: _name,
            crm: _crm,
            verified: false
        });
        doctors[msg.sender] = newDoctor;
    }

    function verifyDoctor(address doctorAddress) public onlyAdmin {
        doctors[doctorAddress].verified = true;
    }

    function startConsultation(address doctor) public onlyPatient returns (bool) {
        patientDoctorAuthorization[msg.sender][doctor] = true;
        return true;
    }

    function getUserMedicalRecordsDoctor(address patient) public view onlyAuthorizedDoctors(patient) returns (MedicalConsultationData[] memory) {
        return userMedicalRecords[patient];
    }

    function getUserMedicalRecordsPatient() public view returns (MedicalConsultationData[] memory) {
        return userMedicalRecords[msg.sender];
    }

    function finishConsultation(address patient, string memory _conditions, string memory _medications, string memory _observations, string memory _diagnosisName, string memory _diagnosisId) public onlyAuthorizedDoctors(patient) returns (bool) {
        
        Diagnosis memory _diagnosis = Diagnosis({
            diagnosisName: _diagnosisName,
            diagnosisId: _diagnosisId
        });

        MedicalConsultationData memory newConsultation = MedicalConsultationData(block.timestamp ,_conditions, _medications, _observations, _diagnosis);
        userMedicalRecords[patient].push(newConsultation);

        patientDoctorAuthorization[patient][msg.sender] = false;

        return true;
    }

    function setAnamnesis(address _patient, string memory _familyHistory, string memory _immunizationHistory, string memory _surgicalHistory, string memory _allergiesAndReactions) public onlyAuthorizedDoctors(_patient) {
        anamnesisContract._setAnamnesis(_patient, _familyHistory, _immunizationHistory, _surgicalHistory, _allergiesAndReactions);
    }

    function getAnamnesis(address _patient) public view onlyAuthorizedDoctors(_patient) {
        anamnesisContract._getAnamnesis(_patient);
    }
}
