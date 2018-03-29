import {
    GET_CATEGORIES,
    GET_CATEGORIES_SUCCESS,
    GET_CATEGORIES_FAIL,
    GET_CATEGORIES_OF_DEBT,
    GET_CATEGORIES_OF_DEBT_SUCCESS,
    GET_CATEGORIES_OF_DEBT_FAIL,
    DEBT_CATEGORIES_SELECTED,
    RESET_DEBT_FORM,
    CALCULATE_CATEGORY_SUBTRACTIONS,
    CALCULATE_CATEGORY_SUBTRACTIONS_SUCCESS
} from '../actions/types';

const INITIAL_STATE = {
    categories: [],
    categoriesOfDebt: [],
    categorySubtractions: [],
    categoriesLoading: false,
    subtractionsLoading: false,
    categoriesError: ''
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case RESET_DEBT_FORM:
            return {...state, categoriesOfDebt: INITIAL_STATE.categoriesOfDebt};
        case GET_CATEGORIES:
            return {...state, categoriesLoading: true, categoriesError: ''};
        case GET_CATEGORIES_SUCCESS:
            return {...state, categoriesLoading: false, categories: action.payload};
        case GET_CATEGORIES_FAIL:
            return {...state, categoriesLoading: false, categoriesError: action.payload};
        case GET_CATEGORIES_OF_DEBT:
            return {...state, categoriesLoading: true, categoriesError: ''};
        case GET_CATEGORIES_OF_DEBT_SUCCESS:
            return {...state, categoriesLoading: false, categoriesOfDebt: action.payload};
        case GET_CATEGORIES_OF_DEBT_FAIL:
            return {...state, categoriesLoading: false, categoriesError: action.payload};
        case DEBT_CATEGORIES_SELECTED:
            return {...state, categoriesOfDebt: action.payload};
        case CALCULATE_CATEGORY_SUBTRACTIONS:
            return {...state, subtractionsLoading: true};
        case CALCULATE_CATEGORY_SUBTRACTIONS_SUCCESS:
            return {...state, subtractionsLoading: false, categorySubtractions: action.payload};
        default:
            return state;
    }
};
