import axios from 'axios';
import firebase from 'firebase';
import {BUDGETBUD_FUNCTIONS_URL} from "../config/firebase_config";

import {
    RESET_DEBT_FORM,
    DEBT_NAME_CHANGED,
    DEBT_AMOUNT_CHANGED,
    DEBT_EXPIRATION_DATE_CHANGED,
    GET_DEBTS,
    GET_DEBTS_SUCCESS,
    GET_DEBTS_FAIL,
    CREATE_DEBT,
    CREATE_DEBT_SUCCESS,
    EDIT_DEBT,
    EDIT_DEBT_SUCCESS,
    DEBT_SELECTED,
    DELETE_DEBT,
    CALCULATE_DEBT_CATEGORY_SUBTRACTIONS,
    CALCULATE_DEBT_CATEGORY_SUBTRACTIONS_SUCCESS,
    CALCULATE_DEBT_CATEGORY_SUBTRACTIONS_FAIL,
    VALIDATE_DEBT_NAME_FAIL,
    VALIDATE_DEBT_AMOUNT_FAIL,
    VALIDATE_DEBT_CATEGORIES_FAIL,
} from './types';

export const resetDebtForm = (callback) => async dispatch => {
    dispatch({
        type: RESET_DEBT_FORM
    });

    callback();
};

export const nameChanged = text => {
    return {
        type: DEBT_NAME_CHANGED,
        payload: text
    };
};

export const amountChanged = text => {
    return {
        type: DEBT_AMOUNT_CHANGED,
        payload: text
    };
};

export const expirationDateChanged = text => {
    return {
        type: DEBT_EXPIRATION_DATE_CHANGED,
        payload: text
    };
};

export const debtSelected = (debt) => {
    return {
        type: DEBT_SELECTED,
        payload: debt
    };
};

export const getDebts = (budgetID) => async dispatch => {
    try {
        dispatch({type: GET_DEBTS});
        let token = await firebase.auth().currentUser.getIdToken();

        let {data} = await axios.get(`${BUDGETBUD_FUNCTIONS_URL}/getDebts?budgetID=${budgetID}`, {
            headers: {Authorization: 'Bearer ' + token}
        });

        dispatch({type: GET_DEBTS_SUCCESS, payload: data});
    } catch (err) {
        let {data} = err.response;
        getDebtsFail(dispatch, data.error);
    }
};

const getDebtsFail = (dispatch, error) => {
    dispatch({type: GET_DEBTS_FAIL, payload: error});
};

export const createDebt =
    ({name, totalAmount, expirationDate, categoryDebtItems, budgetID}) => async dispatch => {
        dispatch({type: CREATE_DEBT});

        try {
            const categories = [];

            categoryDebtItems.forEach(c => {
                categories.push({
                    categoryID: c.categoryID,
                    newAmount: c.afterAmount,
                    amountDiff: c.amountDiff
                });
            });

            let token = await firebase.auth().currentUser.getIdToken();

            await axios.post(`${BUDGETBUD_FUNCTIONS_URL}/createDebt`,
                {name, totalAmount, expirationDate, budgetID, categories}, {
                    headers: {Authorization: 'Bearer ' + token}
                });

            dispatch({type: CREATE_DEBT_SUCCESS});
        } catch (err) {
            let {data} = err.response;
            console.log(data.debtError);
        }
    };

export const editDebt =
    ({name, totalAmount, expirationDate, categoryDebtItems, selectedDebt, budgetID}) =>
        async dispatch => {
            dispatch({type: EDIT_DEBT});

            try {
                const categories = [];

                categoryDebtItems.forEach(c => {
                    categories.push({
                        categoryID: c.categoryID,
                        newAmount: c.afterAmount,
                        amountDiff: c.amountDiff
                    });
                });

                let token = await firebase.auth().currentUser.getIdToken();

                await axios.post(`${BUDGETBUD_FUNCTIONS_URL}/editDebt`,
                    {
                        name,
                        totalAmount,
                        expirationDate,
                        debtID: selectedDebt,
                        budgetID,
                        categories
                    },
                    {headers: {Authorization: 'Bearer ' + token}});

                dispatch({type: EDIT_DEBT_SUCCESS});
            } catch (err) {
                let {data} = err.response;
                console.log(data.debtError);
            }
        };

export const deleteDebt = (debtID) => async dispatch => {
    dispatch({type: DELETE_DEBT});

    try {
        let token = await firebase.auth().currentUser.getIdToken();

        await axios.post(`${BUDGETBUD_FUNCTIONS_URL}/deleteDebt`, {debtID: debtID}, {
            headers: {Authorization: 'Bearer ' + token}
        });
    } catch (err) {
        let {data} = err.response;
        console.log(data.debtError);
    }
};

export const calculateDebtCategorySubtractions =
    (name, amount, expirationDate, categories, callback, debtID) => async dispatch => {
        if (name.length === 0) {
            dispatch({type: VALIDATE_DEBT_NAME_FAIL});
            return;
        } else if (amount.length === 0 || amount <= 0) {
            dispatch({type: VALIDATE_DEBT_AMOUNT_FAIL});
            return;
        } else if (categories.length === 0) {
            dispatch({type: VALIDATE_DEBT_CATEGORIES_FAIL});
            return;
        }

        dispatch({type: CALCULATE_DEBT_CATEGORY_SUBTRACTIONS});

        try {
            let token = await firebase.auth().currentUser.getIdToken();
            let requestBody;

            if (debtID)
                requestBody = {totalAmount: amount, expirationDate, categories, debtID};
            else
                requestBody = {totalAmount: amount, expirationDate, categories};

            let {data} = await axios.post(`${BUDGETBUD_FUNCTIONS_URL}/calculateDebtCategorySubtractions`,
                requestBody, {headers: {Authorization: 'Bearer ' + token}});

            dispatch({type: CALCULATE_DEBT_CATEGORY_SUBTRACTIONS_SUCCESS, payload: data});

            callback();
        } catch (err) {
            let {data} = err.response;
            dispatch({type: CALCULATE_DEBT_CATEGORY_SUBTRACTIONS_FAIL, payload: data.error});
        }
    };
