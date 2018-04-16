import {
    INCOME_CHANGED,
    EDIT_DISPOSABLE,
    EDIT_DISPOSABLE_FAIL,
    EDIT_DISPOSABLE_SUCCESS,
    GET_BUDGET,
    GET_DISPOSABLE_SUCCESS,
    DISPOSABLE_AMOUNT_CHANGED,
    SET_TMP_DISPOSABLE,
    CALCULATE_DISPOSABLE_CATEGORY_DIFFERENCES,
    CALCULATE_DISPOSABLE_CATEGORY_DIFFERENCES_SUCCESS, MAP_EXPENSES_SUCCESS, GET_BUDGET_SUCCESS, CATEGORY_CHANGED,
    GET_MAPPED_CATEGORIES_SUCCESS
} from '../actions/types';

const INITIAL_STATE = {
    disposable: 0,
    disposableLoading: false,
    disposableError: '',
    disposableCalculationLoading: false,
    disposableCategorySubtractions: []
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case GET_BUDGET:
            return INITIAL_STATE;
        case EDIT_DISPOSABLE:
            return {...state, disposableLoading: true};
        case EDIT_DISPOSABLE_SUCCESS:
            return {...state, disposable: action.payload, disposableLoading: false, disposableError: ''};
        case EDIT_DISPOSABLE_FAIL:
            return {...state, disposableLoading: false, disposableError: action.payload};
        case GET_BUDGET_SUCCESS:
            return {...state, disposable: action.payload.disposable};
        case INCOME_CHANGED:
            let newIncomeDisposable = state.disposable + action.payload.incomeDiff;
            return {...state, disposable: newIncomeDisposable};
        case CATEGORY_CHANGED:
            let newCategoryDisposable = state.disposable + action.payload.categoryDiff;
            return {...state, disposable: newCategoryDisposable};
        case MAP_EXPENSES_SUCCESS:
            const totalWithdrawal = action.payload.totalGoalsAmount*(-1);
            return {...state, disposable: totalWithdrawal};
        case DISPOSABLE_AMOUNT_CHANGED:
            return {...state, tmpDisposable: action.payload};
        case GET_MAPPED_CATEGORIES_SUCCESS:
            let newMappedDisposable = state.disposable + action.payload.totalWithdrawal;
            return {...state, disposable: newMappedDisposable};
        case SET_TMP_DISPOSABLE:
            return {...state, tmpDisposable: state.disposable};
        case CALCULATE_DISPOSABLE_CATEGORY_DIFFERENCES:
            return {...state, disposableCalculationLoading: true, disposableError: ''};
        case CALCULATE_DISPOSABLE_CATEGORY_DIFFERENCES_SUCCESS:
            return {...state,
                disposableCalculationLoading: false,
                disposableError: '',
                disposableCategorySubtractions: action.payload
            };
        default:
            return state;
    }
};
