import PersonIcon from '@material-ui/icons/Person';
import EmailIcon from '@material-ui/icons/Email';
import PhoneIcon from '@material-ui/icons/Phone';
import EventIcon from '@material-ui/icons/Event';
import PublicIcon from '@material-ui/icons/Public';
import ContactMailIcon from '@material-ui/icons/ContactMail';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';
import ReceiptIcon from '@material-ui/icons/Receipt';
import CreditCardIcon from '@material-ui/icons/CreditCard';
import ContactsIcon from '@material-ui/icons/Contacts';
import AssessmentIcon from '@material-ui/icons/Assessment';
import BookmarksIcon from '@material-ui/icons/Bookmarks';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import EditIcon from '@material-ui/icons/Edit';

import { getBankList } from './getBankList';
import { getCountryList } from './getCountryList';
import { NairaIcon } from './../components/version-1.1.0/Icon/IconSymbols';

export const getRegisteredFormField = {
    text: {
        id:         'text',
        name:       'text',
        type:       'text',
        label:      'Text *',
        icon:       EditIcon,
        labelWidth: 50,
        validate: {
            minLength: 1,
            maxLength: 255,
            required: true,
        },
    },
    number: {
        id:         'number',
        name:       'number',
        type:       'number',
        label:      'Number *',
        icon:       EditIcon,
        labelWidth: 60,
        validate: {
            required: true,
        },
    },
    firstName: {
        id:         'firstName',
        name:       'firstName',
        type:       'text',
        label:      'First Name *',
        icon:       PersonIcon,
        labelWidth: 90,
        validate: {
            minLength: 3,
            maxLength: 40,
            required: true,
        },
    },
    lastName: {
        id:         'lastName',
        name:       'lastName',
        type:       'text',
        label:      'Last Name *',
        icon:       PersonIcon,
        labelWidth: 90,
        validate: {
            minLength: 3,
            maxLength: 40,
            required: true,
        },
    },
    otherName: {
        id:         'otherName',
        name:       'otherName',
        type:       'text',
        label:      'Other Name *',
        icon:       PersonIcon,
        labelWidth: 90,
        validate: {
            minLength: 3,
            maxLength: 40,
            required: true,
        },
    },
    staffID: {
        id:          'staffId',
        name:        'staffId',
        type:        'text',
        icon:         VerifiedUserIcon,
        label:        'Staff ID',
        readOnly:     true,
        labelWidth:   70,
        defaultValue: 'HJ555LM',
        validate:     {},
    },
    email: {
        id:         'email',
        name:       'email',
        type:       'email',
        label:      'Email *',
        icon:       EmailIcon,
        labelWidth: 120,
        validate: {
            required: true,
        },
    },
    phoneNumber: {
        id:         'phoneNumber',
        name:       'phoneNumber',
        type:       'text',
        label:      'Phone Number *',
        icon:       PhoneIcon,
        labelWidth: 120,
        validate: {
            minLength: 8,
            maxLength: 20,
            required: true,
        },
    },
    state: {
        id:         'state',
        name:       'state',
        type:       'text',
        label:      'State *',
        icon:       LocationOnIcon,
        labelWidth: 60,
        validate: {
            minLength: 2,
            maxLength: 60,
            required: true,
        },
    },
    currentAddress: {
        id:         'currentAddress',
        name:       'currentAddress',
        type:       'text',
        label:      'Current Address *',
        icon:       ContactMailIcon,
        labelWidth: 135,
        validate: {
            minLength: 10,
            maxLength: 200,
            required: true,
        },
    },
    grossSalary: {
        id:         'grossSalary',
        name:       'grossSalary',
        type:       'text',
        icon:       ReceiptIcon,
        label:      'Gross Salary *',
        labelWidth: 150,
        validate: {
            minLength: 1,
            maxLength: 10,
            required: true,
        },
    },
    amountText: {
        id:         'amountText',
        name:       'amountText',
        type:       'text',
        icon:       NairaIcon,
        label:      'Amount *',
        labelWidth: 60,
        validate: {
            minLength: 1,
            maxLength: 10
        },
    },
    dateOfBirth: {
        id:         'dateOfBirth',
        name:       'dateOfBirth',
        type:       'date',
        label:      'Date Of Birth *',
        icon:       EventIcon,
        labelWidth: 120,
        validate: {
            required: true,
            pattern: [],
        },
    },
    gender: {
        id:         'gender',
        name:       'gender',
        type:       'select',
        label:      'Gender *',
        icon:       PersonIcon,
        labelWidth: 60,
        validate: {
            required: true,
        },
        items: [ 
            { label: 'Male',   value: 'Male' },
            { label: 'Female', value: 'Female' },
            { label: 'Other',  value: 'Other' },
        ]
    },
    maritalStatus: {
        id:         'maritalStatus',
        name:       'maritalStatus',
        type:       'select',
        label:      'Marital Status *',
        icon:       PersonIcon,
        labelWidth: 100,
        validate: {
            required: true,
        },
        items: [ 
            { value: 'Single' },
            { value: 'Engaged' },
            { value: 'Married' },
            { value: 'Divorced' },
        ]
    },
    nationality: {
        id:         'nationality',
        name:       'nationality',
        type:       'select',
        label:      'Nationality *',
        icon:       PublicIcon,
        labelWidth: 80,
        validate: {
            required: true,
        },
        items: getCountryList.map(country => ({ 
            value: country.name,
            // label: country.code
        })),
    },
    employmentType: {
        id:         'employmentType',
        name:       'employmentType',
        type:       'select',
        label:      'Employment Type *',
        icon:       PersonIcon,
        labelWidth: 130,
        validate: {
            required: true,
        },
        items: [ 
            { value: 'Direct Employee' },
            { value: 'Temporal' },
            { value: 'Expatriate' },
            { value: 'Consultant' },
            { value: 'NYSC Intern' },
            { value: 'SIWES' },
        ]
    },
    designation: {
        id:         'designation',
        name:       'designation',
        type:       'select',
        label:      'Designation *',
        icon:       PersonIcon,
        labelWidth: 100,
        validate: {
            required: true,
        },
        items: [ 
            { value: 'Executive' },
            { value: 'COO' },
            { value: 'Head Of Department' },
            { value: 'Finance Manager' },
            { value: 'Account Officer' },
            { value: 'Staff' },
        ]
    },
    employeeDepartment: {
        id:         'employeeDepartment',
        name:       'employeeDepartment',
        type:       'select',
        label:      'Employee Department *',
        icon:       PersonIcon,
        labelWidth: 180,
        validate: {
            required: true,
        },
        items: [ 
            { value: 'Executive Management Office' },
            { value: 'Commercial' },
            { value: 'Finance and Accounting' },
            { value: 'Procurement' },
            { value: 'Transport and Logistics' },
            { value: 'Human Resource' },
            { value: 'Reporting Compliance' },
            { value: 'Others' },
        ]
    },
    employeeStatus: {
        id:         'employeeStatus',
        name:       'employeeStatus',
        type:       'select',
        label:      'Employee Status *',
        icon:       PersonIcon,
        labelWidth: 140,
        validate: {
            required: true,
        },
        items: [ 
            { value: 'Active' },
            { value: 'Inactive' },
        ]
    },
    employeeConfirmation: {
        id:         'employeeConfirmation',
        name:       'employeeConfirmation',
        type:       'select',
        label:      'Employee Confirmation *',
        icon:       PersonIcon,
        labelWidth: 180,
        validate: {
            required: true,
        },
        items: [ 
            { value: 'Confirmed' },
            { value: 'Probation' },
        ]
    },
    employeeLocation: {
        id:         'employeeLocation',
        name:       'employeeLocation',
        type:       'select',
        label:      'Employee Location *',
        icon:       PersonIcon,
        labelWidth: 160,
        validate: {
            required: true,
        },
        items: [ 
            { value: 'Corporate Head Office' },
            { value: 'Benin' },
            { value: 'Port Harcourt' },
            { value: 'Others' },
        ]
    },
    paymentStatus: {
        id:         'paymentStatus',
        name:       'paymentStatus',
        type:       'select',
        label:      'Payment Status *',
        icon:       PersonIcon,
        labelWidth: 160,
        validate: {
            required: true,
        },
        items: [ 
            { value: 'Unpaid' },
            { value: 'Paid' },
            { value: 'Partially Paid', label: 'Partially Paid (Part Paid)' },
        ]
    },
    approvalStatus: {
        id:         'approvalStatus',
        name:       'approvalStatus',
        type:       'select',
        label:      'Approval Status *',
        icon:       PersonIcon,
        labelWidth: 160,
        validate: {
            required: true,
        },
        items: [ 
            { value: 'Approved' },
            { value: 'Awaiting Approval' },
        ]
    },
    incomeCategory: {
        id:         'incomeCategory',
        name:       'incomeCategory',
        type:       'select',
        label:      'Income Category *',
        icon:       PersonIcon,
        labelWidth: 160,
        validate: {
            required: true,
        },
        items: [ 
            { value: 'Materials' },
            { value: 'Services' },
            { value: 'Others' },
        ]
    },
    requestStatus: {
        id:         'requestStatus',
        name:       'requestStatus',
        type:       'select',
        label:      'Request Status *',
        icon:       PersonIcon,
        labelWidth: 160,
        validate: {
            required: true,
        },
        items: [ 
            { value: 'Approved' },
            { value: 'Return' },
            { value: 'Denied' },
        ]
    },
    requestAction: {
        id:         'requestAction',
        name:       'requestAction',
        type:       'select',
        label:      'Request Action *',
        icon:       PersonIcon,
        labelWidth: 160,
        validate: {
            required: true,
        },
        items: [ 
            { value: 'View' },
            { value: 'Edit' },
            { value: 'Delete' }, // Admin only
        ]
    },
    bankName: {
        id:         'bankName',
        name:       'bankName',
        type:       'select',
        label:      'Bank Name *',
        icon:       PersonIcon,
        labelWidth: 160,
        validate: {
            required: true,
        },
        items: getBankList.map(bank => ({ 
            value: bank.name,
            // label: country.code
        })),
    },
    accountNumber: {
        id:         'accountNumber',
        name:       'accountNumber',
        type:       'text',
        label:      'Account Number *',
        icon:       CreditCardIcon,
        labelWidth: 120,
        validate: {
            minLength: 8,
            maxLength: 20,
            required: true,
        },
    },
    nationalIdentityNumber: {
        id:         'nationalIdentityNo',
        name:       'nationalIdentityNo',
        type:       'text',
        label:      'National Identity Number *',
        icon:       ContactsIcon,
        labelWidth: 180,
        validate: {
            minLength: 8,
            maxLength: 30,
            required: true,
        },
    },
    pensionManager: {
        id:         'pensionManager',
        name:       'pensionManager',
        type:       'select',
        label:      'Pension Manager *',
        icon:       PersonIcon,
        labelWidth: 180,
        validate: {
            required: true,
        },
        items: [
            { value: 'Manager 1' },
            { value: 'Manager 2' },
        ]
    },
    pensionNumber: {
        id:         'pensionNumber',
        name:       'pensionNumber',
        type:       'text',
        label:      'Pension Number *',
        icon:       AssessmentIcon,
        labelWidth: 120,
        validate: {
            minLength: 3,
            maxLength: 30,
            required: true,
        },
    },
    healthMaintenanceOrganization: {
        id:         'healthMaintenanceOrganization',
        name:       'healthMaintenanceOrganization',
        type:       'select',
        label:      'Health Maintenance Organization *',
        icon:       AssessmentIcon,
        labelWidth: 230,
        validate: {
            minLength: 3,
            maxLength: 30,
            required: true,
        },
        items: [
            { value: 'Organization 1' },
            { value: 'Organization 2' },
        ]
    },
    courseOfStudy: {
        id:         'courseOfStudy',
        name:       'courseOfStudy',
        type:       'text',
        label:      'Course Of Study *',
        icon:       MenuBookIcon,
        labelWidth: 150,
        validate: {
            minLength: 5,
            maxLength: 60,
            required: true,
        },
    },
    qualifications: {
        id:         'qualifications',
        name:       'qualifications',
        type:       'select',
        label:      'Qualifications *',
        icon:       BookmarksIcon,
        labelWidth: 110,
        validate: {
            required: true,
        },
        items: [
            { value: 'National Diploma' },
            { value: 'Higher National Diploma' },
            { value: 'BSC' },
            { value: 'MSC' },
            { value: 'Associate Degree' },
        ]
    },
    degreeClass: {
        id:         'degreeClass',
        name:       'degreeClass',
        type:       'select',
        label:      'Degree Class *',
        icon:       BookmarksIcon,
        labelWidth: 100,
        validate: {
            required: true,
        },
        items: [
            { value: 'National Diploma' },
            { value: 'Higher National Diploma' },
            { value: 'BSC' },
            { value: 'MSC' },
            { value: 'Associate Degree' },
        ]
    },
    financeRequestType: {
        id:         'financeRequestType',
        name:       'financeRequestType',
        type:       'select',
        label:      'Request Type *',
        icon:       BookmarksIcon,
        labelWidth: 110,
        validate: {
            required: true,
        },
        items: [
            { value: 'Job Related' },
            { value: 'Non - Job Related' },
        ]
    },
    financeRequestPaymentRate: {
        id:         'financeRequestPaymentRate',
        name:       'financeRequestPaymentRate',
        type:       'select',
        label:      'Payment Rate *',
        icon:       BookmarksIcon,
        labelWidth: 110,
        validate: {
            required: true,
        },
        items: [
            { value: 'Daily' },
            { value: 'Weekly' },
            { value: 'Monthly' },
            { value: 'Yearly' },
        ]
    },
    financeRequestExpenseType: {
        id:         'financeRequestExpenseType',
        name:       'financeRequestExpenseType',
        type:       'select',
        label:      'Expense Type *',
        icon:       BookmarksIcon,
        labelWidth: 110,
        validate: {
            required: true,
        },
        items: [
            { value: 'Expense 1' },
            { value: 'Expense 2' },
        ]
    },
    financeRequestDepartment: {
        id:         'financeRequestDepartment',
        name:       'financeRequestDepartment',
        type:       'select',
        label:      'Requesting Department *',
        icon:       BookmarksIcon,
        labelWidth: 175,
        validate: {
            required: true,
        },
        items: [
            { value: 'Accounting' },
            { value: 'Transport' },
            { value: 'Bursary' },
            { value: 'Telecommunication' },
        ]
    },
    financeRequestClient: {
        id:         'financeRequestClient',
        name:       'financeRequestClient',
        type:       'select',
        label:      'Client *',
        icon:       BookmarksIcon,
        labelWidth: 60,
        validate: {
            required: true,
        },
        items: [
            { value: 'Client 1' },
            { value: 'Client 2' },
        ]
    },
    financeRequestBuyingHouseOrOEM: {
        id:         'financeRequestBuyingHouseOrOEM',
        name:       'financeRequestBuyingHouseOrOEM',
        type:       'select',
        label:      'Buying House / OEM *',
        icon:       BookmarksIcon,
        labelWidth: 130,
        validate: {
            required: true,
        },
        items: [
            { value: 'House 1' },
            { value: 'House 2' },
        ]
    },
    descriptionText: {
        id:         'descriptionText',
        name:       'descriptionText',
        type:       'textarea',
        label:      'Description Text *',
        icon:       EditIcon,
        labelWidth: 110,
        validate: {
            minlength: 10,
            maxlength: 1000,
            required: true,
        },
    },
};