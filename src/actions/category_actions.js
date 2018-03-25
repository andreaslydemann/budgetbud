import axios from "axios/index";
import firebase from "firebase";
import {cloudFunctionsURL} from "../config/firebase_config";

import {
    GET_CATEGORIES,
    GET_CATEGORIES_SUCCESS,
    GET_CATEGORIES_FAIL
} from "./types";

export const getCategories = (budgetID) => async dispatch => {
    try {
        dispatch({type: GET_CATEGORIES});

        let token = await firebase.auth().currentUser.getIdToken();

        let response = await axios.get(`${cloudFunctionsURL}/getCategories?budgetID=${budgetID}`, {
            headers: {Authorization: 'Bearer ' + token}
        });

        dispatch({type: GET_CATEGORIES_SUCCESS, payload: response.data});
    } catch (err) {
        let {data} = err.response;
        //getCategoriesFail(dispatch, data.error);
    }
};
