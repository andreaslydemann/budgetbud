import {
    GET_ACCOUNTS,
    GET_ACCOUNTS_SUCCESS,
    GET_ACCOUNTS_FAIL,
    LINK_ACCOUNTS,
    LINK_ACCOUNTS_SUCCESS,
    LINK_ACCOUNTS_FAIL,
    ACCOUNTS_SELECTED
} from '../actions/types';

const INITIAL_STATE = {
    accounts: [],
    selectedAccounts: [],
    accountsLoading: false,
    linkLoading: false,
    error: ''
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case GET_ACCOUNTS:
            return {...state, accountsLoading: true};
        case GET_ACCOUNTS_SUCCESS:
            return {
                ...state, accountsLoading: false,
                accounts: action.payload.eBankingAccounts,
                selectedAccounts: action.payload.linkedAccounts
            };
        case GET_ACCOUNTS_FAIL:
            return {...state, accountsLoading: false, error: action.payload};
        case LINK_ACCOUNTS:
            return {...state, linkLoading: true};
        case LINK_ACCOUNTS_SUCCESS:
            return {...state, linkLoading: false};
        case LINK_ACCOUNTS_FAIL:
            return {...state, linkLoading: false, error: action.payload};
        case ACCOUNTS_SELECTED:
            return {...state, selectedAccounts: action.payload};
        default:
            return state;
    }
};
