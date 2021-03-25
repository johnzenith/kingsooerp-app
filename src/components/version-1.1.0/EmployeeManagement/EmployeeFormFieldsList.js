import React from 'react';
import PersonIcon from '@material-ui/icons/Person';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import ListAltIcon from '@material-ui/icons/ListAlt';
import SchoolIcon from '@material-ui/icons/School';
import CardMembershipIcon from '@material-ui/icons/CardMembership';
import ViewListIcon from '@material-ui/icons/ViewList';
import StarsIcon from '@material-ui/icons/Stars';

import { actionTypes } from './../../../context/reducer';

import UploadButton from './../Button/UploadButton';
import FormSectionTitle from './../Form/FormSectionTitle';
import TextInput from './../Input/TextInput';
import { getRegisteredFormField } from './../../../helpers/getRegisteredFormFields';
import { NairaIcon } from './../Icon/IconSymbols';
import FlexBoxGrow from '../Flexbox/FlexBoxGrow';
import FlexBoxCenter from './../Flexbox/FlexBoxCenter';
import AddFormFieldItemButton from '../Button/AddFormFieldItemButton';

const childrenData = [
    {
        ...getRegisteredFormField.firstName,
        id:    'childFirstName',
        name:  'childFirstName',
        md: 3,
        lg: 3,
        useField: 'firstName',
    },
    {
        ...getRegisteredFormField.lastName,
        id:    'childLastName',
        name:  'childLastName',
        md: 3,
        lg: 3,
        useField: 'lastName',
    },
    {
        ...getRegisteredFormField.dateOfBirth,
        id:    'childDateOfBirth',
        name:  'childDateOfBirth',
        md: 3,
        lg: 3,
        useField: 'dateOfBirth',
    },
    {
        ...getRegisteredFormField.gender,
        id:         'childGender',
        name:       'childGender',
        label:      'Gender *',
        md:         3,
        lg:         3,
        labelWidth: 60,
        useField: 'gender',
    },
];

/**
 * Add New Employee Form Fields
 */
export const EmployeeFormFieldsList = [
    /**
     * Personal Data Form
     */
    {
        formID    : 'addEmployeeFormPersonalData',
        stepIcon  : <PersonIcon />,
        formTitle : 'Personal Data',
        fields    : [
            [
                { // Last Name
                    ...getRegisteredFormField.lastName
                },
                { // First Name
                    ...getRegisteredFormField.firstName,
                },
                { // Other Name
                    ...getRegisteredFormField.otherName
                },
            ],
            [
                { // Gender
                    ...getRegisteredFormField.gender,
                },
                { // Marital Status
                    ...getRegisteredFormField.maritalStatus,
                },
                { // Phone Number
                    ...getRegisteredFormField.phoneNumber,
                },
            ],
            [
                { // Nationality
                    ...getRegisteredFormField.nationality,
                },
                { // Date Of Birth
                    ...getRegisteredFormField.dateOfBirth,
                },
                { // Personal Email
                    ...getRegisteredFormField.email,
                    id:       'personalEmail',
                    name:     'personalEmail',
                    label:    'Personal Email *',
                    useField: 'email',
                },
            ],
            [
                { // Current Address
                    ...getRegisteredFormField.currentAddress,
                },
                { // Permanent Address
                    ...getRegisteredFormField.currentAddress,
                    id:         'permanentAddress',
                    name:       'permanentAddress',
                    label:      'Permanent Address *',
                    useField:   'currentAddress',
                },
                { // State
                    ...getRegisteredFormField.state,
                },
            ]
        ]
    },
    /**
     * Employee Info
     */
    {
        formID    : 'addEmployeeFormEmployeeInfo',
        stepIcon  : <AssignmentIndIcon />,
        formTitle : 'Employee Info',
        fields    : [
            [
                { // Staff ID
                    /**
                     * @todo - Setup the staff ID
                     */
                    ...getRegisteredFormField.staffID,
                },
                { // Official Email
                    ...getRegisteredFormField.email,
                    md: 8,
                    lg: 8,
                    id:         'officialEmail',
                    name:       'officialEmail',
                    label:      'Official Email *',
                    useField:   'email',
                    labelWidth: 120,
                },
            ],
            [
                {
                    ...getRegisteredFormField.employmentType,
                },
                {
                    ...getRegisteredFormField.designation,
                },
                {
                    ...getRegisteredFormField.employeeDepartment,
                },
            ],
            [
                {
                    ...getRegisteredFormField.employeeStatus,
                },
                {
                    ...getRegisteredFormField.employeeConfirmation,
                },
                {
                    ...getRegisteredFormField.employeeLocation,
                },
            ],
            [
                {
                    ...getRegisteredFormField.dateOfBirth,
                    id:         'dateOfEmployment',
                    name:       'dateOfEmployment',
                    label:      'Date Of Employment *',
                    useField:   'dateOfBirth',
                    labelWidth: 180,
                    md: 6,
                    lg: 6,
                },
                {
                    ...getRegisteredFormField.dateOfBirth,
                    id:         'dateOfLeaving',
                    name:       'dateOfLeaving',
                    label:      'Date Of Leaving *',
                    useField:   'dateOfBirth',
                    labelWidth: 160,
                    md: 6,
                    lg: 6,
                },
            ],
            {
                type: 'section',
                title: <FormSectionTitle title="Referee Details" />,
                style: {
                    margin: '20px 0px -10px 0px',
                },
                line: true,
                md: 12,
                lg: 12,
                padding: 0,
                gridContainer: {},
                divider: {
                    marginTop: '20px',
                }
            },
            [
                {
                    ...getRegisteredFormField.lastName,
                    id:         'refereeLastName',
                    name:       'refereeLastName',
                    type:       'text',
                    label:      'Last Name',
                    useField:   'lastName',
                    labelWidth: 80,
                    validationGroup: 'refereeDetails',
                },
                {
                    ...getRegisteredFormField.firstName,
                    id:         'refereeFirstName',
                    name:       'refereeFirstName',
                    type:       'text',
                    label:      'First Name',
                    useField:   'firstName',
                    labelWidth: 80,
                    validationGroup: 'refereeDetails',
                },
                {
                    ...getRegisteredFormField.phoneNumber,
                    id:         'refereePhoneNumber',
                    name:       'refereePhoneNumber',
                    label:      'Phone Number',
                    useField:   'phoneNumber',
                    labelWidth: 110,
                    validationGroup: 'refereeDetails',
                },
            ],
            [
                {
                    ...getRegisteredFormField.email,
                    id:         'refereeEmail',
                    name:       'refereeEmail',
                    label:      'Last Name',
                    useField:   'email',
                    labelWidth: 80,
                    validationGroup: 'refereeDetails',
                    md: 6,
                    lg: 6,
                },
                {
                    ...getRegisteredFormField.currentAddress,
                    id:         'refereeAddress',
                    name:       'refereeAddress',
                    label:      'Address',
                    useField:   'currentAddress',
                    labelWidth: 60,
                    validationGroup: 'refereeDetails',
                    md: 6,
                    lg: 6,
                },
            ],
        ]
    },
    {
        formID    : 'addEmployeeFormBankAndPension',
        stepIcon  : <AccountBalanceIcon />,
        formTitle : 'Bank & Pension',
        fields    : [
            [
                {
                    ...getRegisteredFormField.bankName,
                    md: 6,
                    lg: 6,
                },
                {
                    ...getRegisteredFormField.accountNumber,
                    md: 6,
                    lg: 6,
                },
            ],
            [
                {
                    ...getRegisteredFormField.nationalIdentityNumber,
                    md: 12,
                    lg: 12,
                },
            ],
            [
                {
                    ...getRegisteredFormField.pensionManager,
                    md: 6,
                    lg: 6,
                },
                {
                    ...getRegisteredFormField.pensionNumber,
                    md: 6,
                    lg: 6,
                },
            ],
            [
                {
                    ...getRegisteredFormField.healthMaintenanceOrganization,
                    md: 12,
                    lg: 12,
                },
            ],
        ]
    },
    {
        formID    : 'addEmployeeFormOtherData',
        stepIcon  : <ListAltIcon />,
        formTitle : 'Other Data',
        fields    : [
            [
                {
                    type: 'section',
                    title: <FormSectionTitle padding={0} title="Spouse Details" />,
                    style: {
                        margin: '-10px 0px -15px 0px',
                    },
                    md: 12,
                    lg: 12,
                }
            ],
            [
                {
                    ...getRegisteredFormField.lastName,
                    id:    'spouseLastName',
                    name:  'spouseLastName',
                    md: 3,
                    lg: 3,
                    useField: 'lastName',
                },
                {
                    ...getRegisteredFormField.firstName,
                    id:    'spouseFirstName',
                    name:  'spouseFirstName',
                    md: 3,
                    lg: 3,
                    useField: 'firstName',
                },
                {
                    ...getRegisteredFormField.phoneNumber,
                    id:    'spousePhoneNumber',
                    name:  'spousePhoneNumber',
                    md: 3,
                    lg: 3,
                    useField: 'phoneNumber',
                },
                {
                    ...getRegisteredFormField.email,
                    id:         'spouseEmail',
                    name:       'spouseEmail',
                    label:      'Email *',
                    md:         3,
                    lg:         3,
                    labelWidth: 60,
                    useField: 'email',
                },
            ],
            [
                {
                    type: 'section',
                    title: <FormSectionTitle padding={0} title="Children" />,
                    style: {
                        margin: '0px 0px -15px 0px',
                    },
                    md: 12,
                    lg: 12,
                }
            ],

            /**
             * Children field data
             */
            childrenData,

            [
                {
                    type: 'custom',
                    md: 12,
                    lg: 12,
                    content: props => (
                        <FlexBoxGrow 
                            items={[
                                <AddFormFieldItemButton 
                                    label="Add Children" 
                                    {...props}
                                />,

                                <UploadButton 
                                    name="marriageCert"
                                    id="marriageCert"
                                    label="Upload Marriage Certificate"
                                    {...props}
                                />,
                            ]}
                        />
                    )
                }
            ],
            {
                type: 'section',
                title: <FormSectionTitle title="Next Of Kin Details" />,
                style: {
                    margin: '20px 0px -10px 0px',
                },
                line: true,
                md: 12,
                lg: 12,
                padding: 0,
                gridContainer: {},
            },
            [
                {
                    ...getRegisteredFormField.firstName,
                    id:         'nextOfKinFirstName',
                    name:       'nextOfKinFirstName',
                    label:      'First Name *',
                    labelWidth: 90,
                    useField: 'firstName',
                },
                {
                    ...getRegisteredFormField.lastName,
                    id:         'nextOfKinLastName',
                    name:       'nextOfKinLastName',
                    label:      'Last Name *',
                    labelWidth: 90,
                    useField: 'lastName',
                },
                {
                    ...getRegisteredFormField.email,
                    id:         'nextOfKinEmail',
                    name:       'nextOfKinEmail',
                    label:      'Email Address *',
                    labelWidth: 110,
                    useField: 'email',
                },
            ],
            [
                {
                    ...getRegisteredFormField.phoneNumber,
                    id:         'nextOfKinPhoneNumber',
                    name:       'nextOfKinPhoneNumber',
                    label:      'Phone Number *',
                    useField:   'phoneNumber',
                },
                {
                    ...getRegisteredFormField.currentAddress,
                    id:         'nextOfKinAddress',
                    name:       'nextOfKinAddress',
                    label:      'Address *',
                    labelWidth: 70,
                    useField: 'currentAddress',
                },                
                {
                    ...getRegisteredFormField.maritalStatus,
                    id:         'nextOfKinRelationship',
                    name:       'nextOfKinRelationship',
                    label:      'Relationship *',
                    useField:   'maritalStatus',
                    labelWidth: 90,
                },
            ],
            {
                type: 'section',
                title: <FormSectionTitle title="Emergency Contact Details" />,
                style: {
                    margin: '20px 0px -10px 0px',
                },
                line: true,
                md: 12,
                lg: 12,
                padding: 0,
                gridContainer: {},
            },
            [
                {
                    ...getRegisteredFormField.firstName,
                    id:         'emergencyContactName1',
                    name:       'emergencyContactName1',
                    label:      'Name 1 *',
                    labelWidth: 50,
                    useField: 'firstName',
                },
                {
                    ...getRegisteredFormField.currentAddress,
                    id:         'emergencyContactAddress1',
                    name:       'emergencyContactAddress1',
                    label:      'Address 1 *',
                    labelWidth: 80,
                    useField: 'currentAddress',
                },
                {
                    ...getRegisteredFormField.phoneNumber,
                    id:         'emergencyContactPhone1',
                    name:       'emergencyContactPhone1',
                    label:      'Phone Number 1 *',
                    useField:   'phoneNumber',
                },
            ],
            [
                {
                    ...getRegisteredFormField.firstName,
                    id:         'emergencyContactName2',
                    name:       'emergencyContactName2',
                    label:      'Name 2 *',
                    labelWidth: 50,
                    useField: 'firstName',
                    validate: {
                        ...getRegisteredFormField.firstName.validate,
                        required: false,
                    }
                },
                {
                    ...getRegisteredFormField.currentAddress,
                    id:         'emergencyContactAddress2',
                    name:       'emergencyContactAddress2',
                    label:      'Address 2 *',
                    labelWidth: 80,
                    useField: 'currentAddress',
                    validate: {
                        ...getRegisteredFormField.currentAddress.validate,
                        required: false,
                    }
                },
                {
                    ...getRegisteredFormField.phoneNumber,
                    id:         'emergencyContactPhone2',
                    name:       'emergencyContactPhone2',
                    label:      'Phone Number 2 *',
                    useField:   'phoneNumber',
                    validate: {
                        ...getRegisteredFormField.phoneNumber.validate,
                        required: false,
                    }
                },
            ],
        ]
    },
    {
        formID    : 'addEmployeeFormEmolument',
        stepIcon  : <NairaIcon fontWeight={500} fontSize="20px" />,
        formTitle : 'Emolument',
        fields    : [
            [
                {
                    ...getRegisteredFormField.amountText,
                    id:         'basicPay',
                    name:       'basicPay',
                    label:      'Basic Pay *',
                    useField:   'amountText',
                    labelWidth: 80,
                },
                {
                    ...getRegisteredFormField.amountText,
                    id:         'housingAllowance',
                    name:       'housingAllowance',
                    label:      'Housing Allowance *',
                    useField:   'amountText',
                    labelWidth: 140,
                },
                {
                    ...getRegisteredFormField.amountText,
                    id:         'feedingAllowance',
                    name:       'feedingAllowance',
                    label:      'Feeding Allowance *',
                    useField:   'amountText',
                    labelWidth: 140,
                },
            ],
            [
                {
                    ...getRegisteredFormField.amountText,
                    id:         'transportAllowance',
                    name:       'transportAllowance',
                    label:      'Transport Allowance *',
                    useField:   'amountText',
                    labelWidth: 150,
                },
                {
                    ...getRegisteredFormField.amountText,
                    id:         'utilityAllowance',
                    name:       'utilityAllowance',
                    label:      'Utility Allowance *',
                    useField:   'amountText',
                    labelWidth: 130,
                },
                {
                    ...getRegisteredFormField.amountText,
                    id:         'fuelAllowance',
                    name:       'fuelAllowance',
                    label:      'Fuel Allowance *',
                    useField:   'amountText',
                    labelWidth: 120,
                },
            ],
            [
                {
                    ...getRegisteredFormField.amountText,
                    id:         'medicalAllowance',
                    name:       'medicalAllowance',
                    label:      'Medical Allowance *',
                    useField:   'amountText',
                    labelWidth: 140,
                },
                {
                    ...getRegisteredFormField.amountText,
                    id:         'commissionAndBenefits',
                    name:       'commissionAndBenefits',
                    label:      'Benefits / Commission *',
                    useField:   'amountText',
                    labelWidth: 170,
                },
                {
                    ...getRegisteredFormField.amountText,
                    id:         'carAllowance',
                    name:       'carAllowance',
                    label:      'Car Allowance *',
                    useField:   'amountText',
                    labelWidth: 110,
                },
            ],
            [
                {
                    ...getRegisteredFormField.amountText,
                    id:         'leaveAllowance',
                    name:       'leaveAllowance',
                    label:      'Leave Allowance *',
                    useField:   'amountText',
                    labelWidth: 130,
                },
                {
                    ...getRegisteredFormField.amountText,
                    id:         'lunchAllowance',
                    name:       'lunchAllowance',
                    label:      'Lunch Allowance *',
                    useField:   'amountText',
                    labelWidth: 130,
                },
                {
                    ...getRegisteredFormField.amountText,
                    id:         'outStationAllowance',
                    name:       'outStationAllowance',
                    label:      'Out Station Allowance *',
                    useField:   'amountText',
                    labelWidth: 160,
                },
            ],
            [
                {
                    type: 'custom',
                    md: 12,
                    lg: 12,
                    content: props => {
                        return (

                            <FlexBoxCenter
                                items={[
                                    {
                                        flex: 0.24,
                                        content: <span
                                            style={{
                                                display: 'flex',
                                                justifyContent: 'center',
                                                fontWeight: 600,
                                                color: '#000',
                                                letterSpacing: '0.5px',
                                                fontSize: '15px',
                                                fontFamily: 'system-ui',
                                            }}
                                        >
                                            Gross Salary
                                        </span>
                                    },

                                    {
                                        flex: 0.1,
                                        content: <span style={{
                                                fontWeight: 600,
                                                color: '#000',
                                                fontSize: '22px',
                                            }}
                                        >
                                            =
                                        </span>
                                    },
                                                                        
                                    {
                                        flex: 0.66,
                                        content: <TextInput
                                            id="grossSalary"
                                            name="grossSalary"
                                            readonly={true}
                                            icon={NairaIcon}
                                            label="Total"
                                            {...props}
                                        />
                                    }
                                ]}
                            />
                        );
                    }
                }
            ]
        ]
    },
    {
        formID    : 'addEmployeeFormQualifications',
        stepIcon  : <SchoolIcon />,
        formTitle : 'Qualifications',
        fields    : [
            {
                type: 'section',
                title: <FormSectionTitle title="Qualifications" />,
                style: {
                    margin: '-10px 0px -10px 0px',
                },
                md: 12,
                lg: 12,
                padding: 0,
                gridContainer: {},
            },
            [
                {
                    ...getRegisteredFormField.courseOfStudy,
                },
                {
                    ...getRegisteredFormField.qualifications,
                },
                {
                    ...getRegisteredFormField.degreeClass,
                },
            ],
            [
                {
                    ...getRegisteredFormField.dateOfBirth,
                    id:         'degreeMatriculationYear',
                    name:       'degreeMatriculationYear',
                    md:         6,
                    lg:         6,
                    label:      'Year of Matriculation *',
                    useField:   'dateOfBirth',
                    labelWidth: 120,
                },
                {
                    ...getRegisteredFormField.dateOfBirth,
                    id:         'degreeGraduationYear',
                    name:       'degreeGraduationYear',
                    md:         6,
                    lg:         6,
                    label:      'Year of Graduation *',
                    useField:   'dateOfBirth',
                    labelWidth: 120,
                },
            ],
            [
                {
                    type: 'custom',
                    md: 12,
                    lg: 12,
                    content: props => (
                        <FlexBoxGrow 
                            items={[
                                <AddFormFieldItemButton
                                    label="Add Qualification"
                                    {...props}
                                />,

                                <UploadButton 
                                    name="qualificationCert"
                                    id="qualificationCert"
                                    label="Upload Certificate"
                                    {...props}
                                />,
                            ]}
                        />
                    )
                }
            ],
            {
                type: 'section',
                title: <FormSectionTitle title="Training Certifications" />,
                style: {
                    margin: '15px 0px -35px 0px',
                },
                md: 12,
                lg: 12,
                line: true,
                padding: 0,
                gridContainer: {
                    margin: '0px 0px -30px 0px',
                },
                divider: {
                    marginTop: '15px',
                }
            },
            {
                type: 'sliceTrainingCertificationStarts',
            },
            [
                {
                    ...getRegisteredFormField.text,
                    id:         'certificationAndAwardingBody',
                    name:       'certificationAndAwardingBody',
                    md:         12,
                    lg:         12,
                    icon:       CardMembershipIcon,
                    label:      'Certification / Awarding Body *',
                    useField:   'text',
                    labelWidth: 210,
                },
            ],
            [
                {
                    ...getRegisteredFormField.text,
                    id:         'certificationTitle',
                    name:       'certificationTitle',
                    md:         6,
                    lg:         6,
                    icon:       ViewListIcon,
                    label:      'Certification Title *',
                    useField:   'text',
                    labelWidth: 130,
                },
                {
                    ...getRegisteredFormField.text,
                    id:         'certification',
                    name:       'certification',
                    md:         6,
                    lg:         6,
                    icon:       StarsIcon,
                    label:      'Certification *',
                    useField:   'text',
                    labelWidth: 110,
                },
            ],
            [
                {
                    ...getRegisteredFormField.dateOfBirth,
                    id:         'certificationStartDate',
                    name:       'certificationStartDate',
                    md:         6,
                    lg:         6,
                    label:      'Validity Start Date *',
                    useField:   'dateOfBirth',
                    labelWidth: 180,
                },
                {
                    ...getRegisteredFormField.dateOfBirth,
                    id:         'certificationEndDate',
                    name:       'certificationEndDate',
                    md:         6,
                    lg:         6,
                    label:      'Validity End Date *',
                    useField:   'dateOfBirth',
                    labelWidth: 170,
                },
            ],
            [
                {
                    type:          'custom',
                    md:            12,
                    lg:            12,
                    id:            'addCertificationButton',
                    name:          'addCertificationButton',
                    isLastButton:  true,
                    actionButton:  true,
                    content: props => {
                        // console.log(props);
                        const isAddNewCertButtonHidden = props?.isLastButton === false;

                        return (
                            <FlexBoxGrow 
                                items={[
                                    <AddFormFieldItemButton
                                        {...props}
                                        label="Add Certification"
                                        removeLabel="Remove Certification"
                                        slice={['sliceTrainingCertificationStarts', 'sliceTrainingCertificationEnds']}
                                        formListName={actionTypes.SET_EMPLOYEE_FORM_LIST}
                                        isHidden={isAddNewCertButtonHidden}
                                    />,

                                    <UploadButton 
                                        {...props}
                                        name="trainingCert"
                                        id="trainingCert"
                                        icon={CardMembershipIcon}
                                        label="Upload Certificate"
                                    />,
                                ]}
                            />
                        );
                    }
                }
            ],
            {
                type: 'sliceTrainingCertificationEnds',
            },
        ]
    },
];