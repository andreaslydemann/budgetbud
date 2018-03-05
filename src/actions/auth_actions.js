import {AsyncStorage} from 'react-native';
import {firebaseFunctionsURL} from "../config/firebase_config";
import firebase from 'firebase';
import axios from 'axios';

import {
    AUTH_SCREEN_SWITCHED,
    CPR_NUMBER_CHANGED,
    PHONE_NUMBER_CHANGED,
    CODE_CHANGED,
    SIGN_UP,
    SIGN_UP_FAIL,
    SIGN_IN,
    SIGN_IN_FAIL
} from './types';

const ROOT_URL = firebaseFunctionsURL;

export const authScreenSwitched = () => {
    return {type: AUTH_SCREEN_SWITCHED};
};

export const cprNumberChanged = text => {
    return {
        type: CPR_NUMBER_CHANGED,
        payload: text
    };
};

export const phoneNumberChanged = text => {
    return {
        type: PHONE_NUMBER_CHANGED,
        payload: text
    };
};

export const codeChanged = text => {
    return {
        type: CODE_CHANGED,
        payload: text
    };
};

export const signUp = ({cprNumber, phoneNumber}, callback) => async dispatch => {
    dispatch({type: SIGN_UP});

    try {
        await axios.post(`${ROOT_URL}/createUser`, {cprNumber: cprNumber});
        await axios.post(`${ROOT_URL}/requestCodeTest`, {cprNumber: cprNumber, phoneNumber: phoneNumber});

        dispatch({type: AUTH_SCREEN_SWITCHED});
        callback();
    } catch (err) {
        let {data} = err.response;
        signUpFail(dispatch, data.error);
    }
};

const signUpFail = (dispatch, error) => {
    dispatch({type: SIGN_UP_FAIL, payload: error});
};

export const signIn = ({cprNumber, code}, callback) => async dispatch => {
    dispatch({type: SIGN_IN});

    try {
        let {data} = await axios.post(`${ROOT_URL}/verifyCode`, {
            cprNumber: cprNumber, code: code
        });

        await firebase.auth().signInWithCustomToken(data.token);
        await AsyncStorage.setItem('sign_in_token', data.token);

        dispatch({type: AUTH_SCREEN_SWITCHED});
        callback();
    } catch (err) {
        let {data} = err.response;
        signInFail(dispatch, data.error);
    }
};

const signInFail = (dispatch, error) => {
    dispatch({type: SIGN_IN_FAIL, payload: error});
};
