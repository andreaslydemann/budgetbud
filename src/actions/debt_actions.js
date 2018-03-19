import {AsyncStorage} from 'react-native';
import axios from 'axios';
import {firebaseFunctionsURL} from "../config/firebase_config";

import {
    GET_INITIAL_STATE,
    GET_DEBTS,
    GET_DEBTS_SUCCESS,
    GET_DEBTS_FAIL,
    DEBT_SELECTED
} from './types';

const ROOT_URL = firebaseFunctionsURL;

export const resetDebtForm = (callback) => async dispatch => {
    dispatch({
        type: GET_INITIAL_STATE
    });

    callback();
};

export const debtSelected = key => {
    return {
        type: DEBT_SELECTED,
        payload: key
    };
};

export const getDebts = (budgetID) => async dispatch => {
    dispatch({type: GET_DEBTS});

    try {
        let token = await AsyncStorage.getItem('jwt');

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
