import {
    RESET_DEBT_FORM,
    DEBT_NAME_CHANGED,
    DEBT_AMOUNT_CHANGED,
    DEBT_EXPIRATION_DATE_CHANGED,
    DEBT_CATEGORIES_SELECTED,
    DEBT_SELECTED,
    GET_DEBTS,
    GET_DEBTS_SUCCESS,
    GET_DEBTS_FAIL,
    DELETE_DEBT
} from '../actions/types';

const INITIAL_STATE = {
    name: '',
    amount: '',
    expirationDate: '',
    selectedCategories: [],
    debts: [],
    selectedDebt: {},
    loading: false,
    error: ''
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case RESET_DEBT_FORM:
            return {...state, ...INITIAL_STATE.categoryItems};
        case DEBT_NAME_CHANGED:
            return {...state, name: action.payload};
        case DEBT_AMOUNT_CHANGED:
            return {...state, amount: action.payload};
        case DEBT_EXPIRATION_DATE_CHANGED:
            return {...state, expirationDate: action.payload};
        case DEBT_CATEGORIES_SELECTED:
            return {...state, selectedCategories: action.payload};
        case DEBT_SELECTED:
            return {...state, selectedDebt: action.payload};
        case GET_DEBTS:
            return {...state, loading: true, error: ''};
        case GET_DEBTS_SUCCESS:
            return {...state, loading: false, debts: action.payload};
        case GET_DEBTS_FAIL:
            return {...state, loading: false, error: action.payload};
        case DELETE_DEBT:
            return {...state, debts: state.debts.filter((item, key) => key !== state.selectedDebt.key)};
        default:
            return state;
    }
};
