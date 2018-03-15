import {
    SCREEN_CHANGED
} from './types';

export const screenChanged = (route, callback) => async dispatch => {
    dispatch({
        type: SCREEN_CHANGED,
        payload: route
    });

    callback();
};
