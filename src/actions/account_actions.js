import axios from 'axios';
import firebase from 'firebase';
import {
    budgetBudFunctionsURL,
    eBankingFunctionsURL
} from "../config/firebase_config";

import {
    GET_ACCOUNTS,
    GET_ACCOUNTS_SUCCESS,
    GET_ACCOUNTS_FAIL,
    LINK_ACCOUNTS,
    LINK_ACCOUNTS_SUCCESS,
    LINK_ACCOUNTS_FAIL,
    ACCOUNTS_SELECTED
} from './types';

export const getAccounts = () => async dispatch => {
    dispatch({type: GET_ACCOUNTS});

    try {
        const userID = firebase.auth().currentUser.uid;

        const {data} = await axios.get(`${eBankingFunctionsURL}/getAccounts?userID=${userID}`);

        dispatch({type: GET_ACCOUNTS_SUCCESS, payload: data});
    } catch (err) {
        let {data} = err.response;
        dispatch({type: GET_ACCOUNTS_FAIL, payload: data});
    }
};

export const linkAccounts = (selectedAccounts) => async dispatch => {
    dispatch({type: LINK_ACCOUNTS});

    try {
        let token = await firebase.auth().currentUser.getIdToken();
        let userID = await firebase.auth().currentUser.uid;

        await axios.post(`${budgetBudFunctionsURL}/linkAccounts`,
            {eBankingAccIDs: selectedAccounts, userID},
            {headers: {Authorization: 'Bearer ' + token}});

        dispatch({type: LINK_ACCOUNTS_SUCCESS});
    } catch (err) {
        let {data} = err.response;
        dispatch({type: LINK_ACCOUNTS_FAIL, payload: data});
    }
};


export const accountsSelected = list => {
    return {
        type: ACCOUNTS_SELECTED,
        payload: list
    };
};
