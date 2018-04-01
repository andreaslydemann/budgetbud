import axios from "axios/index";
import firebase from "firebase";
import {cloudFunctionsURL} from "../config/firebase_config";

import {
    GET_CATEGORIES,
    GET_CATEGORIES_SUCCESS,
    GET_CATEGORIES_FAIL,
    GET_CATEGORIES_OF_DEBT,
    GET_CATEGORIES_OF_DEBT_SUCCESS,
    CATEGORIES_OF_DEBT_SELECTED,
    CALCULATE_CATEGORY_SUBTRACTIONS,
    CALCULATE_CATEGORY_SUBTRACTIONS_SUCCESS
} from "./types";

const ROOT_URL = cloudFunctionsURL;

export const getCategories = (budgetID) => async dispatch => {
    try {
        dispatch({type: GET_CATEGORIES});

        let token = await firebase.auth().currentUser.getIdToken();

        let {data} = await axios.get(`${cloudFunctionsURL}/getCategories?budgetID=${budgetID}`, {
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

        let {data} = await axios.get(`${cloudFunctionsURL}/getCategoriesOfDebt?debtID=${debtID}`, {
            headers: {Authorization: 'Bearer ' + token}
        });

        const categoriesOfDebt = data;
        const categoriesOfDebtIDs = [];

        categoriesOfDebt.forEach(c => {
            categoriesOfDebtIDs.push(c.categoryID);
        });

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
    (amount, expirationDate, selectedCategories, callback) => async dispatch => {
        try {
            dispatch({type: CALCULATE_CATEGORY_SUBTRACTIONS});

            let token = await firebase.auth().currentUser.getIdToken();

            let {data} = await axios.post(`${ROOT_URL}/calculateCategorySubtractions`,
                {amount, expirationDate, categories: selectedCategories}, {
                    headers: {Authorization: 'Bearer ' + token}
                });

            dispatch({type: CALCULATE_CATEGORY_SUBTRACTIONS_SUCCESS, payload: data});
            callback();
        } catch (err) {
            let {data} = err.response;
            //getCategoriesFail(dispatch, data.error);
        }
    };

export const categoriesOfDebtSelected = list => {
    return {
        type: CATEGORIES_OF_DEBT_SELECTED,
        payload: list
    };
};
