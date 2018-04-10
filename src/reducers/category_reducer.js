import {
    RESET_DEBT_FORM,
    GET_CATEGORIES,
    GET_CATEGORIES_SUCCESS,
    GET_CATEGORIES_FAIL,
    GET_CATEGORIES_OF_DEBT,
    GET_CATEGORIES_OF_DEBT_SUCCESS,
    GET_CATEGORIES_OF_DEBT_FAIL,
    CATEGORIES_SELECTED,
    CALCULATE_CATEGORY_SUBTRACTIONS,
    CALCULATE_CATEGORY_SUBTRACTIONS_SUCCESS,
    CALCULATE_CATEGORY_SUBTRACTIONS_FAIL,
    CREATE_CATEGORIES,
    CREATE_CATEGORIES_SUCCESS,
    CREATE_CATEGORIES_FAIL,
    GET_MAPPED_CATEGORIES,
    GET_MAPPED_CATEGORIES_SUCCESS,
    GET_MAPPED_CATEGORIES_FAIL,
    MAP_EXPENSES,
    MAP_EXPENSES_SUCCESS,
    MAP_EXPENSES_FAIL
} from '../actions/types';

const INITIAL_STATE = {
    categories: [],
    categoriesOfDebt: [],
    selectedCategories: [],
    categorySubtractions: [],
    categoriesLoading: false,
    subtractionsLoading: false,
    categoriesError: '',
    tmpCategories: []
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case RESET_DEBT_FORM:
            return {
                ...state,
                categoriesOfDebt: INITIAL_STATE.categoriesOfDebt,
                selectedCategories: INITIAL_STATE.selectedCategories
            };
        case MAP_EXPENSES:
            return {...state, categoriesLoading: true};
        case MAP_EXPENSES_SUCCESS:
            return {...state, categoriesLoading: false, tmpCategories: action.payload};
        case MAP_EXPENSES_FAIL:
            return {...state, categoriesLoading: false, categoriesError: action.payload};
        case CREATE_CATEGORIES:
            return {...state, categoriesLoading: true, categoriesError: ''};
        case CREATE_CATEGORIES_SUCCESS:
            return {...state, categoriesLoading: false, categories: action.payload};
        case CREATE_CATEGORIES_FAIL:
            return {...state, categoriesLoading: false, categoriesError: action.payload};
        case GET_CATEGORIES:
            return {...state, categoriesLoading: true, categoriesError: ''};
        case GET_CATEGORIES_SUCCESS:
            return {...state, categoriesLoading: false, categories: action.payload};
        case GET_CATEGORIES_FAIL:
            return {...state, categoriesLoading: false, categoriesError: action.payload};
        case GET_CATEGORIES_OF_DEBT:
            return {...state, categoriesLoading: true, categoriesError: ''};
        case GET_CATEGORIES_OF_DEBT_SUCCESS:
            return {
                ...state, categoriesLoading: false,
                categoriesOfDebt: action.payload.categoriesOfDebt,
                selectedCategories: action.payload.categoriesOfDebtIDs
            };
        case GET_CATEGORIES_OF_DEBT_FAIL:
            return {...state, categoriesLoading: false, categoriesError: action.payload};
        case GET_MAPPED_CATEGORIES:
            return {...state, categoriesLoading: true, categoriesError: ''};
        case GET_MAPPED_CATEGORIES_SUCCESS:
            return {...state, tmpCategories: action.payload};
        case GET_MAPPED_CATEGORIES_FAIL:
            return {...state, categoriesLoading: false, categoriesError: action.payload};
        case CATEGORIES_SELECTED:
            return {...state, selectedCategories: action.payload};
        case CALCULATE_CATEGORY_SUBTRACTIONS:
            return {...state, subtractionsLoading: true};
        case CALCULATE_CATEGORY_SUBTRACTIONS_SUCCESS:
            return {...state, subtractionsLoading: false, categorySubtractions: action.payload};
        case CALCULATE_CATEGORY_SUBTRACTIONS_FAIL:
            return {...state, subtractionsLoading: false, categoriesError: action.payload};
        default:
            return state;
    }
};
