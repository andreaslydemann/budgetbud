import {
    RESET_DEBT_FORM,
    DEBT_SELECTED,
    GET_DEBTS,
    GET_DEBTS_SUCCESS,
    GET_DEBTS_FAIL,
    DELETE_DEBT,
    GET_CATEGORIES,
    GET_CATEGORIES_SUCCESS,
    GET_CATEGORIES_FAIL
} from '../actions/types';

const INITIAL_STATE = {
    error: '',
    debtItems: [],
    categoryItems: [],
    loading: false,
    selectedDebt: {}
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case RESET_DEBT_FORM:
            return {...state, ...INITIAL_STATE.categoryItems};
        case DEBT_SELECTED:
            return {...state, selectedDebt: action.payload};
        case GET_DEBTS:
            return {...state, loading: true, error: ''};
        case GET_DEBTS_SUCCESS:
            return {...state, loading: false, debtItems: action.payload};
        case GET_DEBTS_FAIL:
            return {...state, loading: false, error: action.payload};
        case DELETE_DEBT:
            return {...state, debtItems: state.debtItems.filter((item, key) => key !== state.selectedDebt.key)};
        case GET_CATEGORIES:
            return {...state, loading: true, error: ''};
        case GET_CATEGORIES_SUCCESS:
            return {...state, loading: false, categoryItems: action.payload};
        case GET_CATEGORIES_FAIL:
            return {...state, loading: false, error: action.payload};
        default:
            return state;
    }
};
