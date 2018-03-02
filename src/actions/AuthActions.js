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

const ROOT_URL = 'https://us-central1-budgetbud-4950d.cloudfunctions.net';

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

export const signUp = ({phoneNumber}) => {
    return async (dispatch) => {
        dispatch({type: SIGN_UP});

        try {
            await axios.post(`${ROOT_URL}/createUser`, {phoneNumber: phoneNumber});
            await axios.post(`${ROOT_URL}/requestOneTimePassword`, {phoneNumber: phoneNumber});
        } catch (err) {
            signUpFail(dispatch);
        }
    };
};

export const signIn = ({cprNumber, code}) => {
    return async (dispatch) => {
        dispatch({type: SIGN_IN});

        try {
            let {data} = await axios.post(`${ROOT_URL}/verifyOneTimePassword`, {
                cprNumber: cprNumber, code: code
            });

            firebase.auth().signInWithCustomToken(data.token);
        } catch (err) {
            signInFail(dispatch);
        }
    };
};

const signUpFail = (dispatch) => {
    dispatch({type: SIGN_UP_FAIL});
};

const signInFail = (dispatch) => {
    dispatch({type: SIGN_IN_FAIL});
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
