import {
    GET_INITIAL_STATE,
    GET_BUDGET_ALARMS,
    GET_BUDGET_ALARMS_SUCCESS,
    GET_BUDGET_ALARMS_FAIL,
    GET_CATEGORY_ALARMS,
    GET_CATEGORY_ALARMS_SUCCESS,
    GET_CATEGORY_ALARMS_FAIL,
    TOGGLE_BUDGET_ALARMS,
    TOGGLE_BUDGET_ALARMS_SUCCESS,
    TOGGLE_BUDGET_ALARMS_FAIL,
    TOGGLE_CATEGORY_ALARM,
    TOGGLE_CATEGORY_ALARM_SUCCESS,
    TOGGLE_CATEGORY_ALARM_FAIL,
    RESET_ALARMS_ERROR,
    WEEKLY_STATUS_TOGGLED,
    BUDGET_EXCEEDED_TOGGLED
} from '../../strings/types';

const INITIAL_STATE = {
    categoryAlarms: [],
    budgetExceeded: false,
    weeklyStatus: false,
    alarmsLoading: false,
    toggleLoading: false,
    alarmsError: '',
    budgetAlarmsInitialized: false,
    categoryAlarmsInitialized: false
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case GET_INITIAL_STATE:
            return INITIAL_STATE;
        case RESET_ALARMS_ERROR:
            return {...state, alarmsError: ''};
        case BUDGET_EXCEEDED_TOGGLED:
            return {...state, budgetExceeded: action.payload};
        case WEEKLY_STATUS_TOGGLED:
            return {...state, weeklyStatus: action.payload};
        case GET_BUDGET_ALARMS:
            return {...state, alarmsLoading: true};
        case GET_BUDGET_ALARMS_SUCCESS:
            return {
                ...state,
                budgetExceeded: action.payload.budgetExceeded,
                weeklyStatus: action.payload.weeklyStatus,
                alarmsLoading: false,
                budgetAlarmsInitialized: true
            };
        case GET_BUDGET_ALARMS_FAIL:
            return {...state, alarmsLoading: false, alarmsError: action.payload};
        case GET_CATEGORY_ALARMS:
            return {...state, alarmsLoading: true};
        case GET_CATEGORY_ALARMS_SUCCESS:
            return {
                ...state,
                categoryAlarms: action.payload,
                alarmsLoading: false,
                categoryAlarmsInitialized: true
            };
        case GET_CATEGORY_ALARMS_FAIL:
            return {...state, alarmsLoading: false, alarmsError: action.payload};
        case TOGGLE_BUDGET_ALARMS:
            return {...state, toggleLoading: true};
        case TOGGLE_BUDGET_ALARMS_SUCCESS:
            return {...state, toggleLoading: false};
        case TOGGLE_BUDGET_ALARMS_FAIL:
            return {...state, alarmsError: action.payload, toggleLoading: false};
        case TOGGLE_CATEGORY_ALARM:
            const categoryAlarms = state.categoryAlarms;
            if (categoryAlarms.includes(action.payload)) {
                categoryAlarms.splice(categoryAlarms.indexOf(action.payload), 1)
            } else {
                categoryAlarms.push(action.payload);
            }
            return {...state, categoryAlarms, toggleLoading: true};
        case TOGGLE_CATEGORY_ALARM_SUCCESS:
            return {...state, toggleLoading: false};
        case TOGGLE_CATEGORY_ALARM_FAIL:
            return {...state, alarmsError: action.payload, toggleLoading: false};
        default:
            return state;
    }
};
