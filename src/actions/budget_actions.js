import axios from 'axios';
import firebase from 'firebase';
import {
    INCOME_CHANGED,
    CATEGORY_CHANGED,
    CREATE_BUDGET,
    CREATE_BUDGET_FAIL,
    GET_BUDGET,
    GET_BUDGET_FAIL,
    GET_BUDGET_SUCCESS,
    CREATE_BUDGET_SUCCESS,
    DELETE_BUDGET,
    GET_INITIAL_BUDGET_STATE,
    EDIT_BUDGET,
    EDIT_BUDGET_SUCCESS,
    EDIT_BUDGET_FAIL,
    GET_BUDGET_ID_FAIL,
    GET_BUDGET_ID_SUCCESS
} from './types';

export const getBudgetID = (user, callback) => async dispatch => {
    try {
        let token = await user.getIdToken();
        console.log(token);

        const {data} = await axios.get(`${BUDGETBUD_FUNCTIONS_URL}/getBudgetID?userID=${user.uid}`,
            {headers: {Authorization: 'Bearer ' + token}});

        dispatch({type: GET_BUDGET_ID_SUCCESS, payload: data});

        callback();
    } catch (err) {
        if (err.response) {
            let {data} = err.response.data;
            dispatch({type: GET_BUDGET_ID_FAIL, payload: data.error});
        }
    }
};

export const createBudget = ({income, totalGoalsAmount, disposable}, callback) =>
    async dispatch => {

        dispatch({type: CREATE_BUDGET});

        try {
            let token = await firebase.auth().currentUser.getIdToken();
            let userID = await firebase.auth().currentUser.uid;

            await axios.post(`${BUDGETBUD_FUNCTIONS_URL}/createBudget`,
                {userID, income, totalGoalsAmount, disposable},
                {headers: {Authorization: 'Bearer ' + token}});

            dispatch({type: CREATE_BUDGET_SUCCESS, payload: {income, totalGoalsAmount, disposable}});

            callback();
        } catch (err) {
            let {data} = err.response;
            dispatch({type: CREATE_BUDGET_FAIL, payload: data.error});
        }
    };

export const getBudget = (budgetID) => async dispatch => {
    dispatch({type: GET_BUDGET});

    try {
        let token = await firebase.auth().currentUser.getIdToken();

        let {data} = await axios.get(`${BUDGETBUD_FUNCTIONS_URL}/getBudget?budgetID=${budgetID}`,
            {headers: {Authorization: 'Bearer ' + token}});

        dispatch({
            type: GET_BUDGET_SUCCESS,
            payload: data.budgetData
        });

    } catch (err) {
        let {data} = err.response;
        dispatch({type: GET_BUDGET_FAIL, payload: data.error});
    }
};

export const editBudget = ({budgetID, income, disposable, totalGoalsAmount}, callback) => async dispatch => {
    dispatch({type: EDIT_BUDGET});
    let token = await firebase.auth().currentUser.getIdToken();

    try {
        await axios.post(`${BUDGETBUD_FUNCTIONS_URL}/editBudget`,
            {budgetID, income, disposable, totalGoalsAmount},
            {headers: {Authorization: 'Bearer ' + token}});

        dispatch({
            type: EDIT_BUDGET_SUCCESS,
            income,
            disposable,
            totalGoalsAmount
        });

    } catch (err) {
        let {data} = err.response;
        dispatch({type: EDIT_BUDGET_FAIL, payload: data.error});
    }
};

export const deleteBudget = ({budgetID}, callback) => async dispatch => {
    try {
        dispatch({type: DELETE_BUDGET});
        let token = await firebase.auth().currentUser.getIdToken();

        await axios.post(`${BUDGETBUD_FUNCTIONS_URL}/deleteBudget`,
            {budgetID},
            {headers: {Authorization: 'Bearer ' + token}
        });

        dispatch({type: GET_INITIAL_BUDGET_STATE});
        callback();
    } catch (err) {
        let {data} = err.response;
        console.log(data.error);
    }
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
        payload: {
            name,
            amount
        }
    };
};
