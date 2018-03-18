import {firebaseFunctionsURL} from "../config/firebase_config";

import {
    GET_INITIAL_STATE
} from './types';

const ROOT_URL = firebaseFunctionsURL;

export const resetDisposableForm = (callback) => async dispatch => {
    dispatch({
        type: GET_INITIAL_STATE
    });

    callback();
};
