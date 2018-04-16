import axios from "axios/index";
import firebase from "firebase";
import {BUDGETBUD_FUNCTIONS_URL} from "../config/firebase_config";
import {
    MAP_EXPENSES_TO_EXPENSE_OVERVIEW, MAP_EXPENSES_TO_EXPENSE_OVERVIEW_FAIL,
    MAP_EXPENSES_TO_EXPENSE_OVERVIEW_SUCCESS
} from "./types";

export const mapExpensesToExpenseOverview = () => async dispatch => {
    dispatch({type: MAP_EXPENSES_TO_EXPENSE_OVERVIEW});

    try {
        let token = await firebase.auth().currentUser.getIdToken();
        let userID = await firebase.auth().currentUser.uid;

        let {data} = await axios.get(`${BUDGETBUD_FUNCTIONS_URL}/getExpensesOfMonth?userID=${userID}`,
            {headers: {Authorization: 'Bearer ' + token}});

        const categories = await matchCategoryTypeNames(data);

        dispatch({
            type: MAP_EXPENSES_TO_EXPENSE_OVERVIEW_SUCCESS,
            payload: categories
        });
    }
    catch
        (err) {
        let {data} = err.response;
        dispatch({type: MAP_EXPENSES_TO_EXPENSE_OVERVIEW_FAIL, payload: data.error});
    }
};

const matchCategoryTypeNames = async (expenses) => {
    let token = await firebase.auth().currentUser.getIdToken();

    const categoryTypes = await axios.get(`${BUDGETBUD_FUNCTIONS_URL}/getCategoryTypes`,
        {headers: {Authorization: 'Bearer ' + token}});
    const categories = [];

    categoryTypes.data.forEach(categoryType => {
        const index = expenses.findIndex(x => x.categoryTypeID === categoryType.id);

        if (index !== -1)
            categories.push({
                name: categoryType.name,
                amount: categories[index].amount
            })
    });
    return categories;
};