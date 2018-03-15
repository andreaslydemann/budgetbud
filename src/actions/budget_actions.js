import {
    INCOME_CHANGED,
    CATEGORY_CHANGED,
    CREATE_BUDGET,
    CREATE_BUDGET_FAIL,
    OPEN_DRAWER,
    GET_INITIAL_STATE
} from './types';
import axios from 'axios';
import {firebaseFunctionsURL} from "../config/firebase_config";
import firebase from "../reducers/index";
import {AsyncStorage} from 'react-native';

const ROOT_URL = firebaseFunctionsURL;

export const getInitialBudget = text => {
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

export const categoryChanged = (name, value) => {
    return {
        type: CATEGORY_CHANGED,
        name: name,
        payload: value
    };
};

export const createBudget = ({income, category}, callBack) => async dispatch => {
    if (income.length === 0) {
        income = 0;
    } else if (category.value.length === 0) {
        category.value = 0;
    }

    dispatch({type: CREATE_BUDGET});
    let token = await AsyncStorage.getItem('jwt');

    try {
        let uid = await firebase.auth().currentUser.uid;
        await axios.post(`${ROOT_URL}/createBudget`, {income, category, cprNumber: uid},
            {headers: { Authorization: 'Bearer ' + token }});

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
