import axios from 'axios';
import {cloudFunctionsURL} from "../config/firebase_config";
import {GET_BUDGET_ID_FAIL, GET_BUDGET_ID_SUCCESS} from "./types";

const ROOT_URL = cloudFunctionsURL;

export const getBudgetID = (user) => async dispatch => {
    try {
        let token = await user.getIdToken();
        console.log(token);

        const {data} = await axios.get(`${ROOT_URL}/getBudgetID?userID=${user.uid}`,
            {headers: {Authorization: 'Bearer ' + token}});

        console.log("Past axios");

        dispatch({type: GET_BUDGET_ID_SUCCESS, payload: data.id})
    } catch (err) {
        let {data} = err.response;
        getBudgetIDFail(dispatch, data.error)
    }
};

const getBudgetIDFail = (dispatch, error) => {
    dispatch({type: GET_BUDGET_ID_FAIL, payload: error});
};