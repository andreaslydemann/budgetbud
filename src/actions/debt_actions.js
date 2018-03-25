import axios from 'axios';
import firebase from 'firebase';
import {cloudFunctionsURL} from "../config/firebase_config";

import {
    GET_INITIAL_AUTH_STATE,
    GET_DEBTS,
    GET_DEBTS_SUCCESS,
    GET_DEBTS_FAIL,
    DEBT_SELECTED,
    DELETE_DEBT
} from './types';

const ROOT_URL = cloudFunctionsURL;

export const resetDebtForm = (callback) => async dispatch => {
    dispatch({
        type: GET_INITIAL_AUTH_STATE
    });

    callback();
};

export const debtSelected = (key, debtID) => {
    return {
        type: DEBT_SELECTED,
        payload: {key, debtID}
    };
};

export const getDebts = (budgetID) => async dispatch => {
    try {
        dispatch({type: GET_DEBTS});
        let token = await firebase.auth().currentUser.getIdToken();
        console.log(token);

        let response = await axios.get(`${ROOT_URL}/getDebts?budgetID=${budgetID}`, {
            headers: {Authorization: 'Bearer ' + token}
        });

        dispatch({type: GET_DEBTS_SUCCESS, payload: response.data});
    } catch (err) {
        let {data} = err.response;
        getDebtsFail(dispatch, data.error);
    }
};

const getDebtsFail = (dispatch, error) => {
    dispatch({type: GET_DEBTS_FAIL, payload: error});
};

export const deleteDebt = (debtID) => async dispatch => {
    try {
        dispatch({type: DELETE_DEBT});

        let token = await firebase.auth().currentUser.getIdToken();

        await axios.post(`${ROOT_URL}/deleteDebt`, {debtID: debtID}, {
            headers: {Authorization: 'Bearer ' + token}
        });
    } catch (err) {
        let {data} = err.response;
        console.log(data.error);
    }
};
