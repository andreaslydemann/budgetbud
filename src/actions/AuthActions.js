import {firebaseFunctionsURL} from "../config/firebase_config";
import firebase from 'firebase';
import axios from 'axios';

import {
    CPR_NUMBER_CHANGED,
    PHONE_NUMBER_CHANGED,
    CODE_CHANGED,
    SIGN_UP,
    SIGN_UP_FAIL,
    SIGN_IN,
    SIGN_IN_FAIL
} from './types';

const ROOT_URL = firebaseFunctionsURL;

export const cprNumberChanged = (text) => {
    return {
        type: CPR_NUMBER_CHANGED,
        payload: text
    };
};

export const phoneNumberChanged = (text) => {
    return {
        type: PHONE_NUMBER_CHANGED,
        payload: text
    };
};

export const codeChanged = (text) => {
    return {
        type: CODE_CHANGED,
        payload: text
    };
};

export const signUp = ({cprNumber, phoneNumber}) => {
    return async (dispatch) => {
        dispatch({type: SIGN_UP});

        try {
            await axios.post(`${ROOT_URL}/createUser`, {cprNumber: cprNumber});
            await axios.post(`${ROOT_URL}/requestCodeTest`, {cprNumber: cprNumber, phoneNumber: phoneNumber});
        } catch (err) {
            let {data} = err.response;
            signUpFail(dispatch, data.error);
        }
    };
};

export const signIn = ({cprNumber, code}) => {
    return async (dispatch) => {
        dispatch({type: SIGN_IN});

        try {
            let {data} = await axios.post(`${ROOT_URL}/verifyCode`, {
                cprNumber: cprNumber, code: code
            });

            firebase.auth().signInWithCustomToken(data.token);
        } catch (err) {
            let {data} = err.response;
            signInFail(dispatch, data.error);
        }
    };
};

const signUpFail = (dispatch, error) => {
    dispatch({type: SIGN_UP_FAIL, payload: error});
};

const signInFail = (dispatch, error) => {
    dispatch({type: SIGN_IN_FAIL, payload: error});
};

const signUpSuccess = (dispatch, user) => {
    /*dispatch({
        type: LOGIN_USER_SUCCESS,
        payload: user
    });

    Actions.main();*/
};

const signInSuccess = (dispatch, user) => {
    /*dispatch({
        type: LOGIN_USER_SUCCESS,
        payload: user
    });

    Actions.main();*/
};
