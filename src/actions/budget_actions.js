import axios from 'axios';
import firebase from 'firebase';
import {budgetBudFunctionsURL, eBankingFunctionsURL} from "../config/firebase_config";
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
    GET_BUDGET_ID_SUCCESS,
    MAP_EXPENSES,
    MAP_EXPENSES_SUCCESS,
    MAP_EXPENSES_FAIL,
    GET_LINKED_ACCOUNTS,
    GET_LINKED_ACCOUNTS_SUCCESS,
    GET_LINKED_ACCOUNTS_FAIL
} from './types';

const BUDGETBUD_FUNCTIONS_URL = budgetBudFunctionsURL;
const EBANKING_FUNCTIONS_URL = eBankingFunctionsURL;

export const getBudgetID = (user, callback) => async dispatch => {
    try {
        let token = await user.getIdToken();

        const {data} = await axios.get(`${BUDGETBUD_FUNCTIONS_URL}/getBudgetID?userID=${user.uid}`,
            {headers: {Authorization: 'Bearer ' + token}});

        dispatch({type: GET_BUDGET_ID_SUCCESS, payload: data});

        callback();
    } catch (err) {
        let {data} = err.response;
        dispatch({type: GET_BUDGET_ID_FAIL, payload: data.error});
    }
};

export const createBudget = ({income, categories, totalExpenses, disposable}, callback) =>
    async dispatch => {
        if (income.length === 0)
            income = 0;

        dispatch({type: CREATE_BUDGET});

        try {
            let token = await firebase.auth().currentUser.getIdToken();
            let userID = await firebase.auth().currentUser.uid;

            await axios.post(`${BUDGETBUD_FUNCTIONS_URL}/createBudget`,
                {userID, income, categories, totalExpenses, disposable},
                {headers: {Authorization: 'Bearer ' + token}});

            dispatch({type: CREATE_BUDGET_SUCCESS, payload: {income, categories, totalExpenses, disposable}});

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

export const editBudget = ({budgetID, income, categories}, callback) => async dispatch => {
    dispatch({type: EDIT_BUDGET});
    let token = await firebase.auth().currentUser.getIdToken();

    try {
        await axios.post(`${BUDGETBUD_FUNCTIONS_URL}/editBudget`,
            {budgetID, income, categories},
            {headers: {Authorization: 'Bearer ' + token}});

        dispatch({
            type: EDIT_BUDGET_SUCCESS,
            income,
            categories
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

        await axios.post(`${BUDGETBUD_FUNCTIONS_URL}/deleteBudget`, {budgetID}, {
            headers: {Authorization: 'Bearer ' + token}
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

export const getLinkedAccounts = () => async dispatch => {
    dispatch({type: GET_LINKED_ACCOUNTS});

    try {
        let token = await firebase.auth().currentUser.getIdToken();
        let userID = await firebase.auth().currentUser.uid;

        let {data} = await axios.get(`${BUDGETBUD_FUNCTIONS_URL}/getLinkedAccounts?userID=${userID}`,
            {headers: {Authorization: 'Bearer ' + token}});

        dispatch({
            type: GET_LINKED_ACCOUNTS_SUCCESS,
            payload: data
        });
    } catch (err) {
        let {data} = err.response;
        dispatch({type: GET_LINKED_ACCOUNTS_FAIL, payload: data.error});
    }
};

export const mapExpensesToBudget = (accounts) => async dispatch => {
    dispatch({type: MAP_EXPENSES});

    try {
        let token = await firebase.auth().currentUser.getIdToken();

        const unsortedExpenses = [];
        const categories = [];
        let amount = 0;
        let getExpensesPromises = [];
        const expenses = [];

        accounts.forEach(account => {
                const promise = axios.get(`${EBANKING_FUNCTIONS_URL}/getExpenses?accountID=${account}`)
                    .then(accountExpenses => {
                        unsortedExpenses.push(accountExpenses.data)
                    });
                getExpensesPromises.push(promise);
            }
        );

        await Promise.all(getExpensesPromises);
        unsortedExpenses.forEach(accountArray => {
            accountArray.forEach(expenseObj => {
                let index = expenses.indexOf(expenseObj.categoryID);

                if (index !== -1) {
                    expenses[index].amount += expenseObj.amount;
                } else {
                    expenses.push({
                        categoryTypeID: expenseObj.categoryTypeID,
                        amount: expenseObj.amount
                    });
                }
            });
        });

        let categoryTypes = await axios.get(`${BUDGETBUD_FUNCTIONS_URL}/getCategoryTypes`,
            {headers: {Authorization: 'Bearer ' + token}});

        expenses.forEach(expense => {
            categoryTypes.data.filter(obj => {
                if (obj.id === expense.categoryTypesID) {
                    amount = expense.amount
                } else {
                    amount = 0
                }
                categories.push({
                    name: obj.name,
                    amount
                });
            });
        });

        dispatch({
            type: MAP_EXPENSES_SUCCESS,
            payload: categories
        });
    }
    catch
        (err) {
        let {data} = err.response;
        dispatch({type: MAP_EXPENSES_FAIL, payload: data.error});
    }
};
