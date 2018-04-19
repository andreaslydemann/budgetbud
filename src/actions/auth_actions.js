import axios from 'axios';
import firebase from 'firebase';
import {BUDGETBUD_FUNCTIONS_URL} from "../config/firebase_config";

import {
    GET_INITIAL_AUTH_STATE,
    RESET_AUTH_ERROR,
    RESET_ACTIVATION_CODE,
    CPR_NUMBER_CHANGED,
    PHONE_NUMBER_CHANGED,
    CODE_CHANGED,
    REPEATED_CODE_CHANGED,
    VALIDATE_CPR_NUMBER_FAIL,
    VALIDATE_PHONE_NUMBER_FAIL,
    VALIDATE_ACTIVATION_CODE_FAIL,
    VALIDATE_CODE_FAIL,
    SIGN_IN,
    SIGN_IN_FAIL,
    SIGN_UP,
    SIGN_UP_FAIL,
    DELETE_USER, GET_INITIAL_STATE,
    CHANGE_CODE,
    CHANGE_CODE_SUCCESS,
    CHANGE_CODE_FAIL,
    VALIDATE_CODE_MATCH_FAIL,
    CHANGE_PHONE_NUMBER,
    CHANGE_PHONE_NUMBER_SUCCESS,
    CHANGE_PHONE_NUMBER_FAIL,
    GET_PHONE_NUMBER,
    GET_PHONE_NUMBER_SUCCESS,
    GET_PHONE_NUMBER_FAIL,
    REQUEST_ACTIVATION_CODE,
    REQUEST_ACTIVATION_CODE_SUCCESS,
    REQUEST_ACTIVATION_CODE_FAIL,
    VERIFY_ACTIVATION_CODE,
    VERIFY_ACTIVATION_CODE_SUCCESS,
    VERIFY_ACTIVATION_CODE_FAIL,
    ACTIVATION_CODE_CHANGED
} from './types';

export const resetAuthState = (callback) => async dispatch => {
    dispatch({type: GET_INITIAL_AUTH_STATE});

    if (callback)
        callback();
};

export const resetAuthError = () => {
    return {
        type: RESET_AUTH_ERROR
    };
};

export const resetActivationCode = callback => async dispatch => {
    dispatch({type: RESET_ACTIVATION_CODE});
    callback();
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

export const repeatedCodeChanged = text => {
    return {
        type: REPEATED_CODE_CHANGED,
        payload: text
    };
};

export const activationCodeChanged = text => {
    return {
        type: ACTIVATION_CODE_CHANGED,
        payload: text
    };
};

export const signUp = ({cprNumber, phoneNumber}, callback) => async dispatch => {
    if (cprNumber.length !== 10) {
        dispatch({type: VALIDATE_CPR_NUMBER_FAIL});
        return;
    } else if (phoneNumber.length !== 8) {
        dispatch({type: VALIDATE_PHONE_NUMBER_FAIL});
        return;
    }

    dispatch({type: SIGN_UP});

    try {
        await axios.post(`${BUDGETBUD_FUNCTIONS_URL}/createUser`, {cprNumber});
        await axios.post(`${BUDGETBUD_FUNCTIONS_URL}/requestCode`, {cprNumber, phoneNumber});

        dispatch({type: GET_INITIAL_AUTH_STATE});
        callback();
    } catch (err) {
        let {data} = err.response;
        signUpFail(dispatch, data.error);
    }
};

const signUpFail = (dispatch, error) => {
    dispatch({type: SIGN_UP_FAIL, payload: error});
};

export const signIn = ({cprNumber, code}) => async dispatch => {
    if (cprNumber.length !== 10) {
        dispatch({type: VALIDATE_CPR_NUMBER_FAIL});
        return;
    } else if (code.length !== 4) {
        dispatch({type: VALIDATE_CODE_FAIL});
        return;
    }

    dispatch({type: SIGN_IN});

    try {
        let {data} = await axios.post(`${BUDGETBUD_FUNCTIONS_URL}/verifyCode`, {
            cprNumber, code
        });

        await firebase.auth().signInWithCustomToken(data.token);
        dispatch({type: GET_INITIAL_AUTH_STATE});
    } catch (err) {
        let {data} = err.response;
        dispatch({type: SIGN_IN_FAIL, payload: data.error});
    }
};

export const signOut = () => async dispatch => {
    try {
        await firebase.auth().signOut();

        dispatch({type: GET_INITIAL_STATE});
    } catch (err) {
        let {data} = err.response;
        console.log(data.error);
    }
};

export const deleteUser = (callback) => async dispatch => {
    try {
        dispatch({type: DELETE_USER});
        let token = await firebase.auth().currentUser.getIdToken();
        let uid = await firebase.auth().currentUser.uid;

        await axios.post(`${BUDGETBUD_FUNCTIONS_URL}/deleteUser`, {cprNumber: uid}, {
            headers: {Authorization: 'Bearer ' + token}
        });

        dispatch({type: GET_INITIAL_STATE});
        callback();
    } catch (err) {
        let {data} = err.response;
        console.log(data.error);
    }
};

export const requestActivationCode = (cprNumber, callback) => async dispatch => {
    if (cprNumber.length !== 10) {
        dispatch({type: VALIDATE_CPR_NUMBER_FAIL});
        return;
    }

    dispatch({type: REQUEST_ACTIVATION_CODE});

    try {
        await axios.post(`${BUDGETBUD_FUNCTIONS_URL}/requestActivationCode`, {cprNumber});

        dispatch({type: REQUEST_ACTIVATION_CODE_SUCCESS});
        callback();
    } catch (err) {
        let {data} = err.response;
        dispatch({type: REQUEST_ACTIVATION_CODE_FAIL, payload: data.error});
    }
};

export const verifyActivationCode = (activationCode, cprNumber, callback) => async dispatch => {
    if (activationCode.length !== 4) {
        dispatch({type: VALIDATE_ACTIVATION_CODE_FAIL});
        return;
    }

    dispatch({type: VERIFY_ACTIVATION_CODE});

    try {
        await axios.post(`${BUDGETBUD_FUNCTIONS_URL}/verifyActivationCode`, {activationCode, cprNumber});

        dispatch({type: VERIFY_ACTIVATION_CODE_SUCCESS});
        callback();
    } catch (err) {
        let {data} = err.response;
        dispatch({type: VERIFY_ACTIVATION_CODE_FAIL, payload: data.error});
    }
};

export const getPhoneNumber = () => async dispatch => {
    dispatch({type: GET_PHONE_NUMBER});

    try {
        let token = await firebase.auth().currentUser.getIdToken();
        let cprNumber = await firebase.auth().currentUser.uid;

        let {data} = await axios.get(`${BUDGETBUD_FUNCTIONS_URL}/getPhoneNumber?cprNumber=${cprNumber}`,
            {headers: {Authorization: 'Bearer ' + token}});

        dispatch({type: GET_PHONE_NUMBER_SUCCESS, payload: data.phoneNumber});
    } catch (err) {
        let {data} = err.response;
        dispatch({type: GET_PHONE_NUMBER_FAIL, payload: data.error});
    }
};

export const changePhoneNumber = (phoneNumber, callback) => async dispatch => {
    if (phoneNumber.length !== 8) {
        dispatch({type: VALIDATE_PHONE_NUMBER_FAIL});
        return;
    }

    dispatch({type: CHANGE_PHONE_NUMBER});

    try {
        let token = await firebase.auth().currentUser.getIdToken();
        let cprNumber = await firebase.auth().currentUser.uid;

        await axios.post(`${BUDGETBUD_FUNCTIONS_URL}/changePhoneNumber`,
            {phoneNumber, cprNumber},
            {headers: {Authorization: 'Bearer ' + token}});

        dispatch({type: CHANGE_PHONE_NUMBER_SUCCESS});

        callback();
    } catch (err) {
        let {data} = err.response;
        dispatch({type: CHANGE_PHONE_NUMBER_FAIL, payload: data.error});
    }
};

export const changeCode = (code, repeatedCode, callback) => async dispatch => {
    if (code.length !== 4 || repeatedCode.length !== 4) {
        dispatch({type: VALIDATE_CODE_FAIL});
        return;
    } else if (code !== repeatedCode) {
        dispatch({type: VALIDATE_CODE_MATCH_FAIL});
        return;
    }

    dispatch({type: CHANGE_CODE});

    try {
        let token = await firebase.auth().currentUser.getIdToken();
        let cprNumber = await firebase.auth().currentUser.uid;

        await axios.post(`${BUDGETBUD_FUNCTIONS_URL}/changeCode`,
            {code, cprNumber},
            {headers: {Authorization: 'Bearer ' + token}});


        dispatch({type: CHANGE_CODE_SUCCESS});
        callback();
    } catch (err) {
        let {data} = err.response;
        dispatch({type: CHANGE_CODE_FAIL, payload: data.error});
    }
};

export const changeForgottenCode = (code, repeatedCode, cprNumber, callback) => async dispatch => {
    if (code.length !== 4 || repeatedCode.length !== 4) {
        dispatch({type: VALIDATE_CODE_FAIL});
        return;
    } else if (code !== repeatedCode) {
        dispatch({type: VALIDATE_CODE_MATCH_FAIL});
        return;
    }

    dispatch({type: CHANGE_CODE});

    try {
        await axios.post(`${BUDGETBUD_FUNCTIONS_URL}/changeForgottenCode`, {code, cprNumber});

        dispatch({type: CHANGE_CODE_SUCCESS});
        callback();
    } catch (err) {
        let {data} = err.response;
        dispatch({type: CHANGE_CODE_FAIL, payload: data.error});
    }
};
