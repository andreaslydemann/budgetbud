import {
    INCOME_CHANGED,
    CATEGORY_CHANGED,
    CREATE_BUDGET,
    CREATE_BUDGET_FAIL, OPEN_DRAWER
} from './types';
import axios from 'axios';
import {AsyncStorage} from 'react-native';
import {firebaseFunctionsURL} from "../config/firebase_config";
import firebase from 'firebase';
const ROOT_URL = firebaseFunctionsURL;



export const incomeChanged = text => {
    return {
        type: INCOME_CHANGED,
        payload: text
    };
};

export const categoryChanged = text => {
    return {
        type: CATEGORY_CHANGED,
        payload: text
    };
};

export const createBudget = ({income, categoryName, categoryVal}, callBack) => async dispatch => {
    if (income.length === 0) {
        income = 0;
    } else if (categoryVal.length === 0) {
        category = 0;
    }

    dispatch({type: CREATE_BUDGET});

    try {
        await axios.post(`${ROOT_URL}/createBudget`, {income, categoryName, categoryValue: categoryVal});

    } catch (err) {
        let {data} = err.response;
        createBudgetFail(dispatch, data.error)
    }
};

const createBudgetFail = (dispatch, error) => {
    dispatch({type: CREATE_BUDGET_FAIL, payload: error});
};

export const openDrawer = (callback) => async dispatch => {
    dispatch({type: OPEN_DRAWER});
    callback();
};
