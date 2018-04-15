import axios from 'axios';
import firebase from 'firebase';
import {BUDGETBUD_FUNCTIONS_URL} from "../config/firebase_config";

import {
    RESET_DISPOSABLE_FORM,
    DISPOSABLE_AMOUNT_CHANGED,
    CALCULATE_DISPOSABLE_CATEGORY_DIFFERENCES,
    CALCULATE_CATEGORY_SUBTRACTIONS_FAIL,
    EDIT_DISPOSABLE,
    SET_TMP_DISPOSABLE,
    CALCULATE_DISPOSABLE_CATEGORY_DIFFERENCES_SUCCESS,
    EDIT_DISPOSABLE_SUCCESS,
} from './types';

export const resetDisposableForm = (callback) => async dispatch => {
    dispatch({
        type: RESET_DISPOSABLE_FORM
    });

    callback();
};

export const disposableChanged = text => {
    return {
        type: DISPOSABLE_AMOUNT_CHANGED,
        payload: text
    };
};

export const editDisposable = ({tmpDisposable, categoryDisposableItems, budgetID},
                           callback) => async dispatch => {

    dispatch({type: EDIT_DISPOSABLE});

    try {
        const categories = [];

        categoryDisposableItems.forEach(c => {
            categories.push({
                categoryID: c.categoryID,
                newAmount: c.afterAmount
            });
        });

        let token = await firebase.auth().currentUser.getIdToken();

        await axios.post(`${BUDGETBUD_FUNCTIONS_URL}/editDisposable`,
            {disposable: tmpDisposable, categories, budgetID}, {
                headers: {Authorization: 'Bearer ' + token}
            });

        dispatch({
            type: EDIT_DISPOSABLE_SUCCESS,
            payload: tmpDisposable
        });

    } catch (err) {
        let {data} = err.response;
        console.log(data.error);
    }
};

export const setTmpDisposable = () => {
    return {type: SET_TMP_DISPOSABLE}
}

export const calculateDisposableCategoryDifferences = (disposable, tmpDisposable, categories, callback) => async dispatch =>{
    dispatch({type: CALCULATE_DISPOSABLE_CATEGORY_DIFFERENCES});

    const disposableDifference = (tmpDisposable-disposable);

    try {
        let token = await firebase.auth().currentUser.getIdToken();

        let {data} = await axios.post(`${BUDGETBUD_FUNCTIONS_URL}/calculateDisposableCategoryDifferences`,
            {categories, disposableDifference}, {headers: {Authorization: 'Bearer ' + token}});

        dispatch({type: CALCULATE_DISPOSABLE_CATEGORY_DIFFERENCES_SUCCESS, payload: data});

        callback();
    } catch (err) {
        let {data} = err.response;
        dispatch({type: CALCULATE_CATEGORY_SUBTRACTIONS_FAIL, payload: data.error});
    }
};
