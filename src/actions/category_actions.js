import axios from "axios/index";
import firebase from "firebase";
import {budgetBudFunctionsURL} from "../config/firebase_config";

import {
    GET_CATEGORIES,
    GET_CATEGORIES_SUCCESS,
    GET_CATEGORIES_FAIL,
    GET_CATEGORIES_OF_DEBT,
    GET_CATEGORIES_OF_DEBT_SUCCESS,
    CATEGORIES_SELECTED,
    CALCULATE_CATEGORY_SUBTRACTIONS,
    CALCULATE_CATEGORY_SUBTRACTIONS_SUCCESS,
    CALCULATE_CATEGORY_SUBTRACTIONS_FAIL,
    CREATE_CATEGORIES,
    CREATE_CATEGORIES_SUCCESS,
    CREATE_CATEGORIES_FAIL,
    GET_MAPPED_CATEGORIES,
    GET_MAPPED_CATEGORIES_SUCCESS,
    GET_MAPPED_CATEGORIES_FAIL, SIGN_IN_FAIL
} from "./types";
import {BUDGETBUD_FUNCTIONS_URL} from "./consts";

export const createCategories = ({budgetID, categories}, callback) =>
    async dispatch => {

        dispatch({type: CREATE_CATEGORIES});

        try {
            let token = await firebase.auth().currentUser.getIdToken();

            await axios.post(`${BUDGETBUD_FUNCTIONS_URL}/createCategories`,
                {budgetID, categories},
                {headers: {Authorization: 'Bearer ' + token}});

            dispatch({type: CREATE_CATEGORIES_SUCCESS, payload: {categories}});
            callback();
        } catch (err) {
            let {data} = err.response;
            dispatch({type: CREATE_CATEGORIES_FAIL, payload: data.error});
        }
    };

export const getCategories = (budgetID) => async dispatch => {
    try {
        dispatch({type: GET_CATEGORIES});

        let token = await firebase.auth().currentUser.getIdToken();
        let {data} = await axios.get(`${budgetBudFunctionsURL}/getCategories?budgetID=${budgetID}`, {
            headers: {Authorization: 'Bearer ' + token}
        });

        dispatch({type: GET_CATEGORIES_SUCCESS, payload: data});
    } catch (err) {
        let {data} = err.response;
        //getCategoriesFail(dispatch, data.error);
    }
};

export const getCategoriesOfDebt = (debtID) => async dispatch => {
    try {
        dispatch({type: GET_CATEGORIES_OF_DEBT});

        // check for categories != null, else get categories first
        let token = await firebase.auth().currentUser.getIdToken();

        let {data} = await axios.get(`${budgetBudFunctionsURL}/getCategoriesOfDebt?debtID=${debtID}`, {
            headers: {Authorization: 'Bearer ' + token}
        });

        const categoriesOfDebt = data;
        const categoriesOfDebtIDs = [];

        categoriesOfDebt.forEach(c => categoriesOfDebtIDs.push(c.categoryID));

        dispatch({
            type: GET_CATEGORIES_OF_DEBT_SUCCESS,
            payload: {categoriesOfDebt, categoriesOfDebtIDs}
        });
    } catch (err) {
        let {data} = err.response;
        //getCategoriesFail(dispatch, data.error);
    }
};

export const calculateCategorySubtractions =
    (amount, expirationDate, categories, callback, debtID) => async dispatch => {
        dispatch({type: CALCULATE_CATEGORY_SUBTRACTIONS});

        try {
            let token = await firebase.auth().currentUser.getIdToken();
            let requestBody;

            if (debtID)
                requestBody = {totalAmount: amount, expirationDate, categories, debtID};
            else
                requestBody = {totalAmount: amount, expirationDate, categories};

            let {data} = await axios.post(`${budgetBudFunctionsURL}/calculateCategorySubtractions`,
                requestBody, {headers: {Authorization: 'Bearer ' + token}});

            dispatch({type: CALCULATE_CATEGORY_SUBTRACTIONS_SUCCESS, payload: data});

            callback();
        } catch (err) {
            let {data} = err.response;
            dispatch({type: CALCULATE_CATEGORY_SUBTRACTIONS_FAIL, payload: data.error});
        }
    };

export const categoriesSelected = (selectedCategories) => {
    return {
        type: CATEGORIES_SELECTED,
        payload: selectedCategories
    };
};

export const getMappedCategories = (categories) => async dispatch => {
    dispatch({type: GET_MAPPED_CATEGORIES});

    try {
        let amount = 0;
        let token = await firebase.auth().currentUser.getIdToken();
        const newCategories = categories;

        let categoryTypes = await axios.get(`${BUDGETBUD_FUNCTIONS_URL}/getCategoryTypes`,
            {headers: {Authorization: 'Bearer ' + token}});

        categoryTypes.data.filter(obj => {
            if (obj.id === newCategories.categoryTypeID || newCategories.amount > 0)
                amount = newCategories.amount;
            else
                amount = 0;

            newCategories.push({
                name: obj.name,
                amount
            });
        });

        dispatch({
            type: GET_MAPPED_CATEGORIES_SUCCESS,
            payload: newCategories
        });
    }
    catch
        (err) {
        let {data} = err.response;
        dispatch({type: GET_MAPPED_CATEGORIES_FAIL, payload: data.error});
    }
};
