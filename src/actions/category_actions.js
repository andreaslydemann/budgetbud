import axios from "axios/index";
import firebase from "firebase";
import {BUDGETBUD_FUNCTIONS_URL} from "../config/firebase_config";

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
    VALIDATE_DEBT_NAME_FAIL,
    VALIDATE_DEBT_AMOUNT_FAIL,
    VALIDATE_DEBT_CATEGORIES_FAIL,
    CREATE_CATEGORIES,
    CREATE_CATEGORIES_SUCCESS,
    CREATE_CATEGORIES_FAIL,
    GET_MAPPED_CATEGORIES,
    GET_MAPPED_CATEGORIES_SUCCESS,
    GET_MAPPED_CATEGORIES_FAIL, MAP_EXPENSES_SUCCESS, MAP_EXPENSES_FAIL, MAP_EXPENSES,
} from "./types";

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

        const categories = [];
        let token = await firebase.auth().currentUser.getIdToken();
        let {data} = await axios.get(`${BUDGETBUD_FUNCTIONS_URL}/getCategories?budgetID=${budgetID}`, {
            headers: {Authorization: 'Bearer ' + token}
        });

        const categoryTypes = await axios.get(`${BUDGETBUD_FUNCTIONS_URL}/getCategoryTypes`,
            {headers: {Authorization: 'Bearer ' + token}});

        data.forEach(category => {
            const index = categoryTypes.data.findIndex(x => x.id === category.categoryData.categoryTypeID);

            categories.push({
                name: categoryTypes.data[index].name,
                amount: category.categoryData.amount,
                categoryTypeID: categoryTypes.data[index].id
            });
        });

        dispatch({type: GET_CATEGORIES_SUCCESS, payload: categories});
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

        let {data} = await axios.get(`${BUDGETBUD_FUNCTIONS_URL}/getCategoriesOfDebt?debtID=${debtID}`, {
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
    (name, amount, expirationDate, categories, callback, debtID) => async dispatch => {
        if (name.length === 0) {
            dispatch({type: VALIDATE_DEBT_NAME_FAIL});
            return;
        } else if (amount.length === 0 || amount <= 0) {
            dispatch({type: VALIDATE_DEBT_AMOUNT_FAIL});
            return;
        } else if (categories.length === 0) {
            dispatch({type: VALIDATE_DEBT_CATEGORIES_FAIL});
            return;
        }

        dispatch({type: CALCULATE_CATEGORY_SUBTRACTIONS});

        try {
            let token = await firebase.auth().currentUser.getIdToken();
            let requestBody;

            if (debtID)
                requestBody = {totalAmount: amount, expirationDate, categories, debtID};
            else
                requestBody = {totalAmount: amount, expirationDate, categories};

            let {data} = await axios.post(`${BUDGETBUD_FUNCTIONS_URL}/calculateCategorySubtractions`,
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

export const mapExpensesToBudget = () => async dispatch => {
    dispatch({type: MAP_EXPENSES});

    try {
        let token = await firebase.auth().currentUser.getIdToken();
        let userID = await firebase.auth().currentUser.uid;

        let {data} = await axios.get(`${BUDGETBUD_FUNCTIONS_URL}/getExpensesOfMonth?userID=${userID}`,
            {headers: {Authorization: 'Bearer ' + token}});

        const categories = await getAllCategoryTypes(data);

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

export const getMappedCategories = (categories) => async dispatch => {
    dispatch({type: GET_MAPPED_CATEGORIES});

    try {
        const newCategories = await getAllCategoryTypes(categories);

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

const getAllCategoryTypes = async (currentCategories) => {
    let amount = 0;
    let token = await firebase.auth().currentUser.getIdToken();

    const categoryTypes = await axios.get(`${BUDGETBUD_FUNCTIONS_URL}/getCategoryTypes`,
        {headers: {Authorization: 'Bearer ' + token}});
    const categories = [];

    categoryTypes.data.forEach(categoryType => {
        const index = currentCategories.findIndex(x => x.categoryTypeID === categoryType.id);

        if (index !== -1)
            amount = currentCategories[index].amount;
        else
            amount = 0;

        categories.push({
            name: categoryType.name,
            amount
        })

    });
    return categories;
};
