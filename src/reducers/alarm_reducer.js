import {
    GET_CATEGORY_ALARMS,
    GET_CATEGORY_ALARMS_SUCCESS,
    GET_CATEGORY_ALARMS_FAIL,
    TOGGLE_CATEGORY_ALARM,
    TOGGLE_CATEGORY_ALARM_SUCCESS,
    TOGGLE_CATEGORY_ALARM_FAIL
} from '../actions/types';

const INITIAL_STATE = {
    categoryAlarms: [],
    alarmsLoading: false,
    enableLoading: false,
    alarmsError: '',
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case GET_CATEGORY_ALARMS:
            return {...state, alarmsLoading: true};
        case GET_CATEGORY_ALARMS_SUCCESS:
            return {
                ...state,
                categoryAlarms: action.payload,
                alarmsLoading: false
            };
        case GET_CATEGORY_ALARMS_FAIL:
            return {...state, alarmsLoading: false};
        case TOGGLE_CATEGORY_ALARM:
            const categoryAlarms = state.categoryAlarms;
            if (categoryAlarms.includes(action.payload)) {
                categoryAlarms.splice(categoryAlarms.indexOf(action.payload), 1)
            } else {
                categoryAlarms.push(action.payload);
            }
            return {...state, categoryAlarms, enableLoading: true};
        case TOGGLE_CATEGORY_ALARM_SUCCESS:
            return {...state, enableLoading: false};
        case TOGGLE_CATEGORY_ALARM_FAIL:
            return {...state, alarmsError: action.payload, enableLoading: false};
        default:
            return state;
    }
};
