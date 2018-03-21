import {
    RESET_DEBT_FORM,
    DEBT_SELECTED,
    GET_DEBTS,
    GET_DEBTS_SUCCESS,
    GET_DEBTS_FAIL,
    DELETE_DEBT
} from '../actions/types';

const INITIAL_STATE = {
    error: '',
    debtItems: [],
    categoryItems: [
        {name: "Kategori 1", value: '10'},
        {name: "Kategori 2", value: '20'},
        {name: "Kategori 3", value: '30'},
        {name: "Kategori 4", value: '40'},
        {name: "Kategori 5", value: '50'},
        {name: "Kategori 6", value: '60'},
        {name: "Kategori 7", value: '70'}
    ],
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
        default:
            return state;
    }
};
