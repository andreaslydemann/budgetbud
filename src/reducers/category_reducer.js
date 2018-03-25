import {
    GET_CATEGORIES,
    GET_CATEGORIES_SUCCESS,
    GET_CATEGORIES_FAIL
} from '../actions/types';

const INITIAL_STATE = {
    categories: [],
    categoriesLoading: false,
    categoriesError: ''
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case GET_CATEGORIES:
            return {...state, categoriesLoading: true, categoriesError: ''};
        case GET_CATEGORIES_SUCCESS:
            return {...state, categoriesLoading: false, categories: action.payload};
        case GET_CATEGORIES_FAIL:
            return {...state, categoriesLoading: false, categoriesError: action.payload};
        default:
            return state;
    }
};
