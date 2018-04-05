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
    ACCOUNTS_SELECTED,
    GET_LINKED_ACCOUNTS_SUCCESS,
    GET_LINKED_ACCOUNTS_FAIL
} from './types';

export const getAccounts = () => async dispatch => {
    dispatch({type: GET_ACCOUNTS});

    try {
        let token = await firebase.auth().currentUser.getIdToken();
        let userID = await firebase.auth().currentUser.uid;

        let getAccountsResponse =
            await axios.get(`${eBankingFunctionsURL}/getAccounts?userID=${userID}`);

        const eBankingAccounts = getAccountsResponse.data;

        let getLinkedAccountsResponse =
            await axios.get(`${budgetBudFunctionsURL}/getLinkedAccounts?userID=${userID}`,
                {headers: {Authorization: 'Bearer ' + token}});

        const linkedAccounts = getLinkedAccountsResponse.data;

        dispatch({
            type: GET_ACCOUNTS_SUCCESS,
            payload: {eBankingAccounts, linkedAccounts}
        });
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

export const getlinkedAccounts = () => async dispatch => {
    dispatch({type: GET_LINKED_ACCOUNTS});

    try {
        let token = await firebase.auth().currentUser.getIdToken();
        let userID = await firebase.auth().currentUser.uid;

        let {data} =
            await axios.get(`${budgetBudFunctionsURL}/getLinkedAccounts?userID=${userID}`,
                {headers: {Authorization: 'Bearer ' + token}});

        dispatch({type: GET_LINKED_ACCOUNTS_SUCCESS, payload: data});
    } catch (err) {
        let {data} = err.response;
        dispatch({type: GET_LINKED_ACCOUNTS_FAIL, payload: data});
    }
};
