import {
    INDKOMST_CHANGED,
    KATEGORI_CHANGED
} from './types';

export const indkomstChanged = (text) => {
    return {
        type: INDKOMST_CHANGED,
        payload: text
    };
};

export const kategoriChanged = (text) => {
    return {
        type: KATEGORI_CHANGED,
        payload: text
    };
};