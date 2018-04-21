import {
    RESET_DEBT_FORM,
    DEBT_NAME_CHANGED,
    DEBT_AMOUNT_CHANGED,
    DEBT_EXPIRATION_DATE_CHANGED,
    VALIDATE_DEBT_NAME_FAIL,
    VALIDATE_DEBT_AMOUNT_FAIL,
    DEBT_SELECTED,
    GET_DEBTS,
    GET_DEBTS_SUCCESS,
    GET_DEBTS_FAIL,
    CREATE_DEBT,
    CREATE_DEBT_SUCCESS,
    EDIT_DEBT,
    EDIT_DEBT_SUCCESS,
    DELETE_DEBT, CALCULATE_DEBT_CATEGORY_SUBTRACTIONS_SUCCESS, CALCULATE_DEBT_CATEGORY_SUBTRACTIONS,
    CALCULATE_DEBT_CATEGORY_SUBTRACTIONS_FAIL, CATEGORIES_SELECTED, VALIDATE_DEBT_CATEGORIES_FAIL, GET_INITIAL_STATE
} from '../actions/types';

const INITIAL_STATE = {
    name: '',
    totalAmount: '',
    amountPerMonth: '',
    expirationDate: '',
    debts: [],
    selectedDebt: '',
    categorySubtractions: [],
    debtLoading: false,
    debtError: '',
    debtsInitialized: false
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case GET_INITIAL_STATE:
            return INITIAL_STATE;
        case RESET_DEBT_FORM:
            return {...INITIAL_STATE, debts: state.debts};
        case DEBT_NAME_CHANGED:
            return {...state, name: action.payload, debtError: ''};
        case DEBT_AMOUNT_CHANGED:
            return {...state, totalAmount: action.payload, debtError: ''};
        case DEBT_EXPIRATION_DATE_CHANGED:
            return {...state, expirationDate: action.payload, debtError: ''};
        case VALIDATE_DEBT_NAME_FAIL:
            return {...state, debtError: 'Navn er ugyldigt.'};
        case VALIDATE_DEBT_AMOUNT_FAIL:
            return {...state, debtError: 'Beløb er ugyldigt.'};
        case VALIDATE_DEBT_CATEGORIES_FAIL:
            return {...state, debtError: 'Ingen kategorier valgt.'};
        case DEBT_SELECTED:
            return {
                ...state,
                name: action.payload.name,
                totalAmount: action.payload.totalAmount,
                amountPerMonth: action.payload.amountPerMonth,
                expirationDate: action.payload.expirationDate,
                selectedDebt: action.payload.debtID,
                debtError: ''
            };
        case GET_DEBTS:
            return {...state, debtLoading: true, debtError: ''};
        case GET_DEBTS_SUCCESS:
            return {
                ...state,
                debtLoading: false,
                debts: action.payload,
                debtsInitialized: true
            };
        case GET_DEBTS_FAIL:
            return {...state, debtLoading: false, debtError: action.payload};
        case CREATE_DEBT:
            return {...state, debtLoading: true, debtError: ''};
        case CREATE_DEBT_SUCCESS:
            return {...state, debtLoading: false};
        case EDIT_DEBT:
            return {...state, debtLoading: true, debtError: ''};
        case EDIT_DEBT_SUCCESS:
            return {...state, debtLoading: false};
        case DELETE_DEBT:
            return {
                ...state, debts: state.debts.filter(
                    (item) => item.id !== state.selectedDebt
                )
            };
        case CALCULATE_DEBT_CATEGORY_SUBTRACTIONS:
            return {...state, debtLoading: true};
        case CALCULATE_DEBT_CATEGORY_SUBTRACTIONS_SUCCESS:
            return {...state, debtLoading: false, categorySubtractions: action.payload};
        case CALCULATE_DEBT_CATEGORY_SUBTRACTIONS_FAIL:
            return {...state, debtLoading: false, debtError: action.payload};
        case CATEGORIES_SELECTED:
            return {...state, debtError: ''};
        default:
            return state;
    }
};
