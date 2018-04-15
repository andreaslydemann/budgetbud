import {
    UPDATE_DISPOSABLE,
    EDIT_DISPOSABLE,
    EDIT_DISPOSABLE_FAIL,
    EDIT_DISPOSABLE_SUCCESS,
    GET_BUDGET,
    GET_DISPOSABLE_SUCCESS,
    DISPOSABLE_AMOUNT_CHANGED,
    SET_TMP_DISPOSABLE,
    CALCULATE_DISPOSABLE_CATEGORY_DIFFERENCES,
    CALCULATE_DISPOSABLE_CATEGORY_DIFFERENCES_SUCCESS
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
        case GET_DISPOSABLE_SUCCESS:
            return {...state, disposable: action.payload};
        case UPDATE_DISPOSABLE:
            let newDisposable = state.disposable + action.payload;
            return {...state, disposable: newDisposable};
        case DISPOSABLE_AMOUNT_CHANGED:
            return {...state, tmpDisposable: action.payload};
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
