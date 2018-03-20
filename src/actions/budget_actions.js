import {
    INCOME_CHANGED,
    CATEGORY_CHANGED,
    CREATE_BUDGET,
    CREATE_BUDGET_FAIL,
    GET_BUDGET,
    GET_BUDGET_FAIL,
    GET_BUDGET_SUCCESS,
    CREATE_BUDGET_SUCCESS
} from './types';
import axios from 'axios';
import {firebaseFunctionsURL} from "../config/firebase_config";
import firebase from 'firebase';

const ROOT_URL = firebaseFunctionsURL;

export const getBudget = (callBack) => async dispatch => {
    dispatch({type: GET_BUDGET});

    let token = await firebase.auth().currentUser.getIdToken();
    let userID = await firebase.auth().currentUser.uid;

    try {
        let budgetResponse = await axios.get(`${ROOT_URL}/getBudget?budgetID=${userID}`,
            {headers: {Authorization: 'Bearer ' + token}});

        if (budgetResponse === null) {
            callBack();
        }

        let budgetID = budgetResponse.id;

        let categoryResponse = await axios.get(`${ROOT_URL}/getCategories?budgetID=${budgetID}`,
            {headers: {Authorization: 'Bearer ' + token}});

        let budgetIncome = budgetResponse.data.budget.income;
        let categories = categoryResponse.data.categories;

        dispatch({type: GET_BUDGET_SUCCESS, income: budgetIncome, categories: categories, budgetID: budgetID});

    } catch (err) {
        let {data} = err.response;
        getBudgetFail(dispatch, data.error)
    }
};

const getBudgetFail = (dispatch, error) => {
    dispatch({type: GET_BUDGET_FAIL, payload: error});
};

export const createBudget = ({income, categories}, callBack) => async dispatch => {
    if (income.length === 0) {
        income = 0;
    }

    dispatch({type: CREATE_BUDGET});

    let token = await firebase.auth().currentUser.getIdToken();

    try {
        let userID = await firebase.auth().currentUser.uid;

        await axios.post(`${ROOT_URL}/createBudget`, {income, categories, userID},
            {headers: {Authorization: 'Bearer ' + token}});

        dispatch({type: CREATE_BUDGET_SUCCESS, income, categories});

    } catch (err) {
        let {data} = err.response;
        createBudgetFail(dispatch, data.error)
    }

    callBack();
};

const createBudgetFail = (dispatch, error) => {
    dispatch({type: CREATE_BUDGET_FAIL, payload: error});
};

export const editBudget = ({income, categoryName, categoryAmount}, callBack) => async dispatch => {
    if (income.length === 0) {
        income = 0;
    } else if (categoryAmount.length === 0) {
        categoryAmount = 0;
    }

    dispatch({type: CREATE_BUDGET});

    try {
        await axios.post(`${ROOT_URL}/editBudget`, {income, categoryName, categoryAmount});

    } catch (err) {
        let {data} = err.response;
        editBudgetFail(dispatch, data.error)
    }
};

const editBudgetFail = (dispatch, error) => {
    dispatch({type: CREATE_BUDGET_FAIL, payload: error});
};

export const incomeChanged = text => {
    return {
        type: INCOME_CHANGED,
        payload: text
    };
};

export const categoryChanged = (name, amount) => {
    return {
        type: CATEGORY_CHANGED,
        name: name,
        amount: amount
    };
};
