import {
    CATEGORY_ALARM_ENABLED,
    CATEGORY_ALARM_ENABLED_FAIL,
} from "./types";
import axios from "axios/index";
import firebase from "firebase/index";
import {BUDGETBUD_FUNCTIONS_URL} from "../config/firebase_config";

/*
export const getEnabledCategoryAlarms = (budgetID) => async dispatch => {
    dispatch({type: GET_ENABLED_CATEGORY_ALARMS});

    try {
        let token = await firebase.auth().currentUser.getIdToken();

        //await axios.post(`${BUDGETBUD_FUNCTIONS_URL}/enableCategoryAlarm`,
        //    {categoryID}, {headers: {Authorization: 'Bearer ' + token}});

        dispatch({type: GET_ENABLED_CATEGORY_ALARMS_SUCCESS});
    } catch (err) {
        let {data} = err.response;
        dispatch({type: GET_ENABLED_CATEGORY_ALARMS_FAIL, payload: data});
    }
};*/

export const categoryAlarmEnabled = ({categoryID}) => async dispatch => {
    dispatch({type: CATEGORY_ALARM_ENABLED, payload: categoryID});

    try {
        //let token = await firebase.auth().currentUser.getIdToken();

        //await axios.post(`${BUDGETBUD_FUNCTIONS_URL}/enableCategoryAlarm`,
        //    {categoryID}, {headers: {Authorization: 'Bearer ' + token}});
    } catch (err) {
        let {data} = err.response;
        dispatch({type: CATEGORY_ALARM_ENABLED_FAIL, payload: data});
    }
};
