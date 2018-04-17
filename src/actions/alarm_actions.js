import {
    GET_CATEGORY_ALARMS,
    GET_CATEGORY_ALARMS_SUCCESS,
    GET_CATEGORY_ALARMS_FAIL,
    TOGGLE_CATEGORY_ALARM,
    TOGGLE_CATEGORY_ALARM_SUCCESS,
    TOGGLE_CATEGORY_ALARM_FAIL
} from "./types";
import axios from "axios/index";
import firebase from "firebase/index";
import {BUDGETBUD_FUNCTIONS_URL} from "../config/firebase_config";

export const getCategoryAlarms = (budgetID) => async dispatch => {
    dispatch({type: GET_CATEGORY_ALARMS});

    try {
        let token = await firebase.auth().currentUser.getIdToken();

        let {data} = await axios.get(`${BUDGETBUD_FUNCTIONS_URL}/getCategoryAlarms?budgetID=${budgetID}`,
            {headers: {Authorization: 'Bearer ' + token}});

        dispatch({type: GET_CATEGORY_ALARMS_SUCCESS, payload: data});
    } catch (err) {
        let {data} = err.response;
        dispatch({type: GET_CATEGORY_ALARMS_FAIL, payload: data});
    }
};

export const toggleCategoryAlarm = (categoryID, budgetID) => async dispatch => {
    dispatch({type: TOGGLE_CATEGORY_ALARM, payload: categoryID});

    try {
        let token = await firebase.auth().currentUser.getIdToken();

        await axios.post(`${BUDGETBUD_FUNCTIONS_URL}/toggleCategoryAlarm`,
            {categoryID, budgetID}, {headers: {Authorization: 'Bearer ' + token}});

        dispatch({type: TOGGLE_CATEGORY_ALARM_SUCCESS});
    } catch (err) {
        let {data} = err.response;
        dispatch({type: TOGGLE_CATEGORY_ALARM_FAIL, payload: data});
    }
};
