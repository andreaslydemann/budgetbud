import axios from "axios/index";
import firebase from "firebase";
import {BUDGETBUD_FUNCTIONS_URL} from "../../config/firebase_config";
import {
    GET_EXPENSES_OF_MONTH,
    GET_EXPENSES_OF_MONTH_SUCCESS,
    GET_EXPENSES_OF_MONTH_FAIL
} from "../../strings/types";

export const getExpensesOfMonth = () => async dispatch => {
    dispatch({type: GET_EXPENSES_OF_MONTH});

    try {
        let token = await firebase.auth().currentUser.getIdToken();
        let userID = await firebase.auth().currentUser.uid;

        let {data} = await axios.get(`${BUDGETBUD_FUNCTIONS_URL}/getExpensesOfMonth?userID=${userID}`,
            {headers: {Authorization: 'Bearer ' + token}});

        let totalExpenses = 0;
        data.forEach(d => totalExpenses += d.amount);

        dispatch({
            type: GET_EXPENSES_OF_MONTH_SUCCESS,
            payload: {expenses: data, totalExpenses}
        });
    }
    catch (err) {
        let {data} = err.response;
        dispatch({type: GET_EXPENSES_OF_MONTH_FAIL, payload: data.error});
    }
};
