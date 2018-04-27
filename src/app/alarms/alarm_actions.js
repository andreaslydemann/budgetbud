import {
    BUDGET_EXCEEDED_TOGGLED,
    WEEKLY_STATUS_TOGGLED,
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
    TOGGLE_CATEGORY_ALARM_FAIL, RESET_ALARMS_ERROR
} from "../../strings/types";
import axios from "axios/index";
import firebase from "firebase/index";
import {BUDGETBUD_FUNCTIONS_URL} from "../../config/firebase_config";
import {registerForPushNotificationsAsync} from "../../helpers/index";

export const resetAlarmsError = () => {
    return {
        type: RESET_ALARMS_ERROR
    };
};

export const budgetExceededToggled = boolean => {
    return {
        type: BUDGET_EXCEEDED_TOGGLED,
        payload: !boolean
    };
};

export const weeklyStatusToggled = boolean => {
    return {
        type: WEEKLY_STATUS_TOGGLED,
        payload: !boolean
    };
};

export const getBudgetAlarms = (budgetID) => async dispatch => {
    dispatch({type: GET_BUDGET_ALARMS});

    try {
        let token = await firebase.auth().currentUser.getIdToken();

        let {data} = await axios.get(`${BUDGETBUD_FUNCTIONS_URL}/getBudgetAlarms?budgetID=${budgetID}`,
            {headers: {Authorization: 'Bearer ' + token}});

        dispatch({type: GET_BUDGET_ALARMS_SUCCESS, payload: data});
    } catch (err) {
        let {data} = err.response;
        dispatch({type: GET_BUDGET_ALARMS_FAIL, payload: data.error});
    }
};

export const getCategoryAlarms = (budgetID) => async dispatch => {
    dispatch({type: GET_CATEGORY_ALARMS});

    try {
        let token = await firebase.auth().currentUser.getIdToken();

        let {data} = await axios.get(`${BUDGETBUD_FUNCTIONS_URL}/getCategoryAlarms?budgetID=${budgetID}`,
            {headers: {Authorization: 'Bearer ' + token}});

        dispatch({type: GET_CATEGORY_ALARMS_SUCCESS, payload: data});
    } catch (err) {
        let {data} = err.response;
        dispatch({type: GET_CATEGORY_ALARMS_FAIL, payload: data.error});
    }
};

export const toggleBudgetAlarms = ({budgetExceeded, weeklyStatus, budgetID}, callback) => async dispatch => {
    dispatch({type: TOGGLE_BUDGET_ALARMS});

    try {
        await registerForPushNotificationsAsync();
        let token = await firebase.auth().currentUser.getIdToken();

        await axios.post(`${BUDGETBUD_FUNCTIONS_URL}/toggleBudgetAlarms`,
            {budgetExceeded, weeklyStatus, budgetID}, {headers: {Authorization: 'Bearer ' + token}});

        dispatch({type: TOGGLE_BUDGET_ALARMS_SUCCESS});
        callback();
    } catch (err) {
        let {data} = err.response;
        dispatch({type: TOGGLE_BUDGET_ALARMS_FAIL, payload: data.error});
    }
};

export const toggleCategoryAlarm = (categoryID, budgetID) => async dispatch => {
    dispatch({type: TOGGLE_CATEGORY_ALARM, payload: categoryID});

    try {
        await registerForPushNotificationsAsync();
        let token = await firebase.auth().currentUser.getIdToken();

        await axios.post(`${BUDGETBUD_FUNCTIONS_URL}/toggleCategoryAlarm`,
            {categoryID, budgetID}, {headers: {Authorization: 'Bearer ' + token}});

        dispatch({type: TOGGLE_CATEGORY_ALARM_SUCCESS});
    } catch (err) {
        let {data} = err.response;
        dispatch({type: TOGGLE_CATEGORY_ALARM_FAIL, payload: data.error});
    }
};
