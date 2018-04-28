import axios from "axios/index";
import firebase from "firebase";
import {BUDGETBUD_FUNCTIONS_URL} from "../../config/firebase_config";

import {
    GET_CATEGORIES,
    GET_CATEGORIES_SUCCESS,
    GET_CATEGORIES_FAIL,
    GET_CATEGORIES_OF_DEBT,
    GET_CATEGORIES_OF_DEBT_SUCCESS,
    GET_CATEGORIES_OF_DEBT_FAIL,
    CATEGORIES_SELECTED,
    CREATE_CATEGORIES,
    CREATE_CATEGORIES_SUCCESS,
    CREATE_CATEGORIES_FAIL,
    SETUP_EDIT_BUDGET,
    SETUP_EDIT_BUDGET_SUCCESS,
    SETUP_EDIT_BUDGET_FAIL,
    MAP_EXPENSES,
    MAP_EXPENSES_SUCCESS,
    MAP_EXPENSES_FAIL,
    EDIT_CATEGORIES,
    EDIT_CATEGORIES_SUCCESS,
    EDIT_CATEGORIES_FAIL,
    RESET_CATEGORIES_ERROR
} from "../../strings/types";

export const createCategories = (budgetID, tmpCategories) =>
    async dispatch => {
        dispatch({type: CREATE_CATEGORIES});

        try {
            const token = await firebase.auth().currentUser.getIdToken();
            const categories = tmpCategories;

            await axios.post(`${BUDGETBUD_FUNCTIONS_URL}/createCategories`,
                {budgetID, categories},
                {headers: {Authorization: 'Bearer ' + token}});

            dispatch({type: CREATE_CATEGORIES_SUCCESS, payload: categories});
        } catch (err) {
            const {data} = err.response;
            dispatch({type: CREATE_CATEGORIES_FAIL, payload: data.error});
        }
    };

export const getCategories = (budgetID) => async dispatch => {
    try {
        dispatch({type: GET_CATEGORIES});

        const categories = [];
        const token = await firebase.auth().currentUser.getIdToken();

        const promises = [];

        const categoriesPromise = axios.get(`${BUDGETBUD_FUNCTIONS_URL}/getCategories?budgetID=${budgetID}`, {
            headers: {Authorization: 'Bearer ' + token}
        });

        promises.push(categoriesPromise);

        const categoryTypesPromise = axios.get(`${BUDGETBUD_FUNCTIONS_URL}/getCategoryTypes`,
            {headers: {Authorization: 'Bearer ' + token}});

        promises.push(categoryTypesPromise);

        const values = await Promise.all(promises);

        values[0].data.forEach(category => {
            const index = values[1].data.findIndex(x => x.id === category.categoryData.categoryTypeID);

            categories.push({
                categoryID: category.id,
                name: values[1].data[index].name,
                amount: category.categoryData.amount,
                categoryTypeID: values[1].data[index].id
            });
        });

        dispatch({type: GET_CATEGORIES_SUCCESS, payload: categories});
    } catch (err) {
        const {data} = err.response;
        dispatch({type: GET_CATEGORIES_FAIL, payload: data.error});
    }
};

export const editCategories = (budgetID, tmpCategories) => async dispatch => {
    dispatch({type: EDIT_CATEGORIES});

    try {
        const token = await firebase.auth().currentUser.getIdToken();
        const categories = tmpCategories;

        await axios.post(`${BUDGETBUD_FUNCTIONS_URL}/editCategories`,
            {budgetID, categories},
            {headers: {Authorization: 'Bearer ' + token}});

        dispatch({type: EDIT_CATEGORIES_SUCCESS, payload: categories});
    } catch (err) {
        let {data} = err.response;
        dispatch({type: EDIT_CATEGORIES_FAIL, payload: data.error});
    }
};

export const getCategoriesOfDebt = (debtID) => async dispatch => {
    try {
        dispatch({type: GET_CATEGORIES_OF_DEBT});

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
        dispatch({type: GET_CATEGORIES_OF_DEBT_FAIL, payload: data.error});
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
    let categories;

    try {
        let token = await firebase.auth().currentUser.getIdToken();
        let userID = await firebase.auth().currentUser.uid;

        let {data} = await axios.get(`${BUDGETBUD_FUNCTIONS_URL}/getAverageExpenses?userID=${userID}`,
            {headers: {Authorization: 'Bearer ' + token}});

        categories = await getAllCategoryTypes(data);

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
    return categories;
};

export const setupEditBudget = (categories) => async dispatch => {
    dispatch({type: SETUP_EDIT_BUDGET});
    let mappedCategories;

    try {
        mappedCategories = await getAllCategoryTypes(categories);

        dispatch({
            type: SETUP_EDIT_BUDGET_SUCCESS
        });
    }
    catch
        (err) {
        let {data} = err.response;
        dispatch({type: SETUP_EDIT_BUDGET_FAIL, payload: data.error});
    }
    return mappedCategories;
};

export const resetCategoriesError = () => {
    return {
        type: RESET_CATEGORIES_ERROR
    };
};

const getAllCategoryTypes = async (currentCategories) => {
    let amount = 0;
    let categoryID = '';
    let token = await firebase.auth().currentUser.getIdToken();

    const categoryTypes = await axios.get(`${BUDGETBUD_FUNCTIONS_URL}/getCategoryTypes`,
        {headers: {Authorization: 'Bearer ' + token}});
    const categories = [];

    categoryTypes.data.forEach(categoryType => {
        const index = currentCategories.findIndex(x => x.categoryTypeID === categoryType.id);

        if (index !== -1) {
            amount = currentCategories[index].amount;
            categoryID = currentCategories[index].categoryID;
        } else {
            amount = 0;
            categoryID = '';
        }

        categories.push({
            name: categoryType.name,
            categoryTypeID: categoryType.id,
            amount,
            categoryID
        })
    });
    return categories;
};
