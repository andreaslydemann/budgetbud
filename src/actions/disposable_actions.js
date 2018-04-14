import axios from 'axios';
import firebase from 'firebase';
import {BUDGETBUD_FUNCTIONS_URL} from "../config/firebase_config";

import {
    RESET_DISPOSABLE_FORM,
    DISPOSABLE_AMOUNT_CHANGED,
    CREATE_DISPOSABLE,
    CREATE_DISPOSABLE_SUCCESS,
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

export const editDisposable = ({amount, categoryDisposableItems, budgetID},
                           callback) => async dispatch => {
    dispatch({type: CREATE_DISPOSABLE});

    try {
        const categories = [];

        categoryDisposableItems.forEach(c => {
            categories.push({
                categoryID: c.categoryID,
                newAmount: c.afterAmount,
                amountToSubtract: c.amountToSubtract
            });
        });

        let token = await firebase.auth().currentUser.getIdToken();

        await axios.post(`${BUDGETBUD_FUNCTIONS_URL}/createDisposable`,
            {amount, budgetID, categories}, {
                headers: {Authorization: 'Bearer ' + token}
            });

        dispatch({type: CREATE_DISPOSABLE_SUCCESS});

        callback();
    } catch (err) {
        let {data} = err.response;
        console.log(data.error);
    }
};
