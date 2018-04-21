import {
    GET_INITIAL_STATE,
    RESET_DEBT_FORM,
    RESET_DEBT_ERROR,
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
    EDIT_DEBT_FAIL,
    DELETE_DEBT,
    DELETE_DEBT_FAIL,
    CALCULATE_DEBT_CATEGORY_SUBTRACTIONS_SUCCESS,
    CALCULATE_DEBT_CATEGORY_SUBTRACTIONS,
    CALCULATE_DEBT_CATEGORY_SUBTRACTIONS_FAIL,
    VALIDATE_DEBT_CATEGORIES_FAIL,
    CREATE_DEBT_FAIL
} from '../actions/types';
import I18n from "../strings/i18n";

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
        case RESET_DEBT_ERROR:
            return {...state, debtError: ''};
        case DEBT_NAME_CHANGED:
            return {...state, name: action.payload};
        case DEBT_AMOUNT_CHANGED:
            return {...state, totalAmount: action.payload};
        case DEBT_EXPIRATION_DATE_CHANGED:
            return {...state, expirationDate: action.payload};
        case VALIDATE_DEBT_NAME_FAIL:
            return {...state, debtError: I18n.t('debtNameError')};
        case VALIDATE_DEBT_AMOUNT_FAIL:
            return {...state, debtError: I18n.t('debtAmountError')};
        case VALIDATE_DEBT_CATEGORIES_FAIL:
            return {...state, debtError: I18n.t('debtCategoriesError')};
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
        case CREATE_DEBT_FAIL:
            return {...state, debtLoading: false, debtError: action.payload};
        case EDIT_DEBT:
            return {...state, debtLoading: true, debtError: ''};
        case EDIT_DEBT_SUCCESS:
            return {...state, debtLoading: false};
        case EDIT_DEBT_FAIL:
            return {...state, debtLoading: false, debtError: action.payload};
        case DELETE_DEBT:
            return {
                ...state, debts: state.debts.filter(
                    (item) => item.id !== state.selectedDebt
                )
            };
        case DELETE_DEBT_FAIL:
            return {...state, debtError: action.payload};
        case CALCULATE_DEBT_CATEGORY_SUBTRACTIONS:
            return {...state, debtLoading: true};
        case CALCULATE_DEBT_CATEGORY_SUBTRACTIONS_SUCCESS:
            return {...state, debtLoading: false, categorySubtractions: action.payload};
        case CALCULATE_DEBT_CATEGORY_SUBTRACTIONS_FAIL:
            return {...state, debtLoading: false, debtError: action.payload};
        default:
            return state;
    }
};
