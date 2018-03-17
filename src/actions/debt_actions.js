import {AsyncStorage} from 'react-native';
import axios from 'axios';
import firebase from 'firebase';
import {firebaseFunctionsURL} from "../config/firebase_config";

import {
    DELETE_USER,
    GET_INITIAL_STATE
} from './types';

const ROOT_URL = firebaseFunctionsURL;

export const resetDebtForm = (callback) => async dispatch => {
    dispatch({
        type: GET_INITIAL_STATE
    });

    callback();
};

export const getDebt = () => async dispatch => {
    try {
        let token = await AsyncStorage.getItem('jwt');
        let uid = await firebase.auth().currentUser.uid;

        let response = await axios.get(`${ROOT_URL}/getDebt`, {cprNumber: uid}, {
            headers: {Authorization: 'Bearer ' + token}
        });

        dispatch({type: GET_INITIAL_STATE});
        callback();
    } catch (err) {
        let {data} = err.response;
        console.log(data.error);
    }
};
