import {cloudFunctionsURL} from "../config/firebase_config";

import {
    GET_BUDGET
} from './types';

const ROOT_URL = cloudFunctionsURL;

export const resetDisposableForm = (callback) => async dispatch => {
    dispatch({
        type: GET_BUDGET
    });

    callback();
};
