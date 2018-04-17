import axios from "axios/index";
import firebase from "firebase";
import {BUDGETBUD_FUNCTIONS_URL} from "../config/firebase_config";

import {
    GET_CATEGORIES,
    GET_CATEGORIES_SUCCESS,
    GET_CATEGORIES_OF_DEBT,
    GET_CATEGORIES_OF_DEBT_SUCCESS,
    CATEGORIES_SELECTED,
    CREATE_CATEGORIES,
    CREATE_CATEGORIES_SUCCESS,
    CREATE_CATEGORIES_FAIL,
    GET_MAPPED_CATEGORIES,
    GET_MAPPED_CATEGORIES_SUCCESS,
    GET_MAPPED_CATEGORIES_FAIL,
    INCOME_CHANGED,
    CATEGORY_CHANGED,
    MAP_EXPENSES,
    MAP_EXPENSES_SUCCESS,
    MAP_EXPENSES_FAIL
} from "./types";

export const createCategories = ({budgetID, categories}, callback) =>
    async dispatch => {

        dispatch({type: CREATE_CATEGORIES});

        try {
            let token = await firebase.auth().currentUser.getIdToken();
            console.log(budgetID)
            console.log(categories)

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

export const categoryChanged = (name, oldAmount, newAmount) =>  {
    const categoryDiff = oldAmount-newAmount;

    return {
        type: CATEGORY_CHANGED,
        payload: {
            name,
            newAmount,
            categoryDiff
        }
    };
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
                categoryID: category.id,
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

        let {data} = await axios.get(`${BUDGETBUD_FUNCTIONS_URL}/getAverageExpenses?userID=${userID}`,
            {headers: {Authorization: 'Bearer ' + token}});

        const categories = await getAllCategoryTypes(data);

        let totalGoalsAmount = 0;
        categories.forEach(category => {
            totalGoalsAmount += category.amount
        });

        dispatch({
            type: MAP_EXPENSES_SUCCESS,
            payload: {categories, totalGoalsAmount}
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

        let totalWithdrawal = 0;
        categories.forEach(category => {
            totalWithdrawal += category.amount
        });
        totalWithdrawal = totalWithdrawal*(-1);

        dispatch({
            type: GET_MAPPED_CATEGORIES_SUCCESS,
            payload: {newCategories, totalWithdrawal}
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