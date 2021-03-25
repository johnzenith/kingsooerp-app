import { EmployeeFormFieldsList } from './../components/version-1.1.0/EmployeeManagement/EmployeeFormFieldsList';

export const initialState = {
    user: null,
    formData: {
        signup: {
            userId: '',
            email: '',
            password: '',
            confirmPassword: '',
        },
        login: {
            email: '',
            password: '',
        },
        forgotPassword: {
            email: ''
        },
        addEmployee: {},
    },
    formError:               {},
    dataCounter:             {},
    currentForm:             'login',
    showPassword:            {},
    formResponse:            {},
    employeeAlert:           false,
    isFormLoading:           {},
    employeesData:           [],
    isFormCompleted:         {},
    isMobileMenuActive:     false,
    dismissibleFormAlert:    {},
    isDashboardDrawerActive: true,
    
    dashboardDrawer: {
        top: false,
        left: false,
        bottom: false,
        right: false,
    },

    employeeFormList: EmployeeFormFieldsList,
};

export const actionTypes = {
    SET_USER:                      'user',
    SET_FORM_DATA:                 'formData',
    SET_FORM_ERROR:                'formError',
    SET_DATA_COUNTER:              'dataCounter',
    SET_CURRENT_FORM:              'currentForm',
    SET_FORM_RESPONSE:             'formResponse',
    SET_FORM_FIELD_REF:            'formFieldRef',
    TOGGLE_MOBILE_MENU:            'isMobileMenuActive',
    SET_COMPLETED_FORM:            'isFormCompleted',
    SET_IS_FORM_LOADING:           'isFormLoading',
    SET_EMPLOYEES_DATA:            'employeesData',
    TOGGLE_FORM_PASSWORD:          'showPassword',
    SET_DASHBOARD_DRAWER:          'dashboardDrawer',
    TOGGLE_DASHBOARD_DRAWER:       'isDashboardDrawerActive',
    SET_DISMISSIBLE_FORM_ALERT:    'dismissibleFormAlert',
    SET_EMPLOYEE_ALERT_VISIBILITY: 'employeeAlert',

    SET_EMPLOYEE_FORM_LIST:        'employeeFormList',
};

/**
 * 
 * @param {object} state   Specifies the app registered states
 * @param {object} action  Specifies the current action to listen for
 * @param {string} prop    Specifies the targeted action with payload data
 * 
 * @see reducer()
 */
const actionPayloadHelper = (state, action, prop) => {
    // Bail undefined actions
    if (typeof state?.[prop] === 'undefined')
        return state;
    
    return {
        ...state,
        [prop]: action?.payload?.[prop] // [action][payload][prop]
    };
};

const reducer = (state, action) => {
    return actionPayloadHelper(state, action, action?.type);
    
    // Bail the payload

    // switch(action.type) {
    //     case actionTypes.SET_USER:
    //         return {
    //             ...state,
    //             user: action.payload.user
    //         };

    //     case actionTypes.SET_CURRENT_FORM:
    //         return {
    //             ...state,
    //             currentForm: action.payload.currentForm
    //         };

    //     case actionTypes.SET_DISMISSIBLE_FORM_ALERT:
    //         return {
    //             ...state,
    //             dismissibleFormAlert: action.payload.dismissibleFormAlert
    //         };

    //     case actionTypes.SET_COMPLETED_FORM:
    //         return {
    //             ...state,
    //             isFormCompleted: action.payload.isFormCompleted
    //         };

    //     case actionTypes.SET_FORM_RESPONSE:
    //         return {
    //             ...state,
    //             formResponse: action.payload.formResponse
    //         };

    //     case actionTypes.SET_FORM_ERROR:
    //         return {
    //             ...state,
    //             formResponse: action.payload.formError
    //         };

    //     case actionTypes.SET_IS_FORM_LOADING:
    //         return {
    //             ...state,
    //             isFormLoading: action.payload.isFormLoading
    //         };

    //     case actionTypes.TOGGLE_FORM_PASSWORD:
    //         console.log(state);
    //         return {
    //             ...state,
    //             showPassword: action.payload.showPassword
    //         };

    //     case actionTypes.SET_FORM_DATA:
    //         return {
    //             ...state,
    //             formData: action.payload.formData
    //         };

    //     case actionTypes.SET_DASHBOARD_DRAWER:
    //         return {
    //             ...state,
    //             dashboardDrawer: action.payload.dashboardDrawer
    //         };

    //     case actionTypes.TOGGLE_DASHBOARD_DRAWER:
    //         return {
    //             ...state,
    //             isDashboardDrawerActive: action.payload.isDashboardDrawerActive
    //         };

    //     default:
    //         return state;
    // }
};

export default reducer;