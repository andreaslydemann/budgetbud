import {
    INCOME_CHANGED,
    CATEGORY_CHANGED,
    CREATE_BUDGET,
    CREATE_BUDGET_FAIL, OPEN_DRAWER, GET_INITIAL_STATE, SHOW_DIALOG
} from './types';
import axios from 'axios';
import {firebaseFunctionsURL} from "../config/firebase_config";

const ROOT_URL = firebaseFunctionsURL;

export const getInitialState = text => {
    return {
        type: GET_INITIAL_STATE,
        payload: text
    };
};

export const incomeChanged = text => {
    return {
        type: INCOME_CHANGED,
        payload: text
    };
};

export const categoryChanged = text => {
    console.log("Changing")
    return {
        type: CATEGORY_CHANGED,
        payload: text
    };
};

export const createBudget = ({income, categoryName, categoryValue}, callBack) => async dispatch => {
    if (income.length === 0) {
        income = 0;
    } else if (categoryValue.length === 0) {
        categoryValue = 0;
    }

    dispatch({type: CREATE_BUDGET});

    try {
        await axios.post(`${ROOT_URL}/createBudget`, {income, categoryName, categoryValue});

    } catch (err) {
        let {data} = err.response;
        createBudgetFail(dispatch, data.error)
    }
};

export const editBudget = ({income, categoryName, categoryValue}, callBack) => async dispatch => {
    if (income.length === 0) {
        income = 0;
    } else if (categoryValue.length === 0) {
        categoryValue = 0;
    }

    dispatch({type: CREATE_BUDGET});

    try {
        await axios.post(`${ROOT_URL}/editBudget`, {income, categoryName, categoryValue});

    } catch (err) {
        let {data} = err.response;
        editBudgetFail(dispatch, data.error)
    }
};

const createBudgetFail = (dispatch, error) => {
    dispatch({type: CREATE_BUDGET_FAIL, payload: error});
};

const editBudgetFail = (dispatch, error) => {
    dispatch({type: CREATE_BUDGET_FAIL, payload: error});
};

export const openDrawer = (callback) => async dispatch => {
    dispatch({type: OPEN_DRAWER});
    callback();
};
