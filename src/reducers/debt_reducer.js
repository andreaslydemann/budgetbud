import {
    RESET_DEBT_FORM,
    DEBT_NAME_CHANGED,
    DEBT_AMOUNT_CHANGED,
    DEBT_EXPIRATION_DATE_CHANGED,
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
    amount: '',
    expirationDate: '',
    debts: [],
    selectedDebt: '',
    debtLoading: false,
    error: ''
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case RESET_DEBT_FORM:
            return {...INITIAL_STATE, debts: state.debts};
        case DEBT_NAME_CHANGED:
            return {...state, name: action.payload};
        case DEBT_AMOUNT_CHANGED:
            return {...state, amount: action.payload};
        case DEBT_EXPIRATION_DATE_CHANGED:
            return {...state, expirationDate: action.payload};
        case DEBT_SELECTED:
            return {
                ...state,
                name: action.payload.name,
                amount: action.payload.amount,
                expirationDate: action.payload.expirationDate,
                selectedDebt: {id: action.payload.debtID, key: action.payload.key}
            };
        case GET_DEBTS:
            return {...state, debtLoading: true, error: ''};
        case GET_DEBTS_SUCCESS:
            console.log("debt success")
            return {...state, debtLoading: false, debts: action.payload};
        case GET_DEBTS_FAIL:
            return {...state, debtLoading: false, error: action.payload};
        case CREATE_DEBT:
            return {...state, debtLoading: true, error: ''};
        case CREATE_DEBT_SUCCESS:
            return {...state, debtLoading: false};
        case EDIT_DEBT:
            return {...state, debtLoading: true, error: ''};
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
