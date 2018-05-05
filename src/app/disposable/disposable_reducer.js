import {
    GET_INITIAL_STATE,
    EDIT_DISPOSABLE,
    EDIT_DISPOSABLE_FAIL,
    EDIT_DISPOSABLE_SUCCESS,
    GET_BUDGET,
    DISPOSABLE_AMOUNT_CHANGED,
    SET_TMP_DISPOSABLE,
    CALCULATE_DISPOSABLE_CATEGORY_DIFFERENCES,
    CALCULATE_DISPOSABLE_CATEGORY_DIFFERENCES_SUCCESS,
    MAP_EXPENSES_SUCCESS,
    GET_BUDGET_SUCCESS,
    SETUP_EDIT_BUDGET_SUCCESS,
    EDIT_BUDGET_SUCCESS,
    CREATE_BUDGET_SUCCESS, RESET_DISPOSABLE_ERROR, CALCULATE_CATEGORY_SUBTRACTIONS_FAIL,
    CALCULATE_DISPOSABLE_CATEGORY_DIFFERENCES_FAIL,
} from '../../strings/types';

const INITIAL_STATE = {
    disposable: 0,
    disposableLoading: false,
    disposableError: '',
    disposableCalculationLoading: false,
    disposableCategorySubtractions: []
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case GET_INITIAL_STATE:
            return INITIAL_STATE;
        case RESET_DISPOSABLE_ERROR:
            return {...state, disposableError: ''};
        case CREATE_BUDGET_SUCCESS:
            return {...state, disposable: action.payload.disposable};
        case GET_BUDGET:
            return INITIAL_STATE;
        case EDIT_BUDGET_SUCCESS:
            return {...state, disposable: action.payload.disposable};
        case EDIT_DISPOSABLE:
            return {...state, disposableLoading: true};
        case EDIT_DISPOSABLE_SUCCESS:
            return {...state, disposable: action.payload, disposableLoading: false, disposableError: ''};
        case EDIT_DISPOSABLE_FAIL:
            return {...state, disposableLoading: false, disposableError: action.payload};
        case GET_BUDGET_SUCCESS:
            return {...state, disposable: action.payload.disposable};
        case SETUP_EDIT_BUDGET_SUCCESS:
            return {...state, tmpDisposable: state.disposable};
        case DISPOSABLE_AMOUNT_CHANGED:
            return {...state, tmpDisposable: action.payload};
        case SET_TMP_DISPOSABLE:
            return {...state, tmpDisposable: state.disposable};
        case CALCULATE_DISPOSABLE_CATEGORY_DIFFERENCES:
            return {...state, disposableCalculationLoading: true, disposableError: ''};
        case CALCULATE_DISPOSABLE_CATEGORY_DIFFERENCES_SUCCESS:
            return {
                ...state,
                disposableCalculationLoading: false,
                disposableError: '',
                disposableCategorySubtractions: action.payload
            };
        case CALCULATE_DISPOSABLE_CATEGORY_DIFFERENCES_FAIL:
            return {...state,
                disposableCalculationLoading: false,
                disposableError: action.payload
            };
        default:
            return state;
    }
};
