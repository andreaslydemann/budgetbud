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
    DELETE_DEBT
} from '../actions/types';

const INITIAL_STATE = {
    name: '',
    totalAmount: '',
    amountPerMonth: '',
    expirationDate: '',
    debts: [],
    selectedDebt: '',
    debtLoading: false,
    debtError: ''
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
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
        case DEBT_SELECTED:
            return {
                ...state,
                name: action.payload.name,
                totalAmount: action.payload.totalAmount,
                amountPerMonth: action.payload.amountPerMonth,
                expirationDate: action.payload.expirationDate,
                selectedDebt: {id: action.payload.debtID, key: action.payload.key},
                debtError: ''
            };
        case GET_DEBTS:
            return {...state, debtLoading: true, debtError: ''};
        case GET_DEBTS_SUCCESS:
            return {...state, debtLoading: false, debts: action.payload};
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
                    (item, key) => key !== state.selectedDebt.key
                )
            };
        default:
            return state;
    }
};
