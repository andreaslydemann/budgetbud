import {
    GET_INITIAL_STATE,
    RESET_ACCOUNTS_ERROR,
    GET_ACCOUNTS,
    GET_ACCOUNTS_SUCCESS,
    GET_ACCOUNTS_FAIL,
    LINK_ACCOUNTS,
    LINK_ACCOUNTS_SUCCESS,
    LINK_ACCOUNTS_FAIL,
    ACCOUNTS_SELECTED,
    GET_LINKED_ACCOUNTS_FAIL,
    GET_LINKED_ACCOUNTS_SUCCESS,
    GET_LINKED_ACCOUNTS
} from '../../strings/types';

const INITIAL_STATE = {
    accounts: [],
    linkedAccounts: [],
    accountsLoading: false,
    linkLoading: false,
    accountsError: '',
    accountsInitialized: false,
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case GET_INITIAL_STATE:
            return INITIAL_STATE;
        case RESET_ACCOUNTS_ERROR:
            return {...state, accountsError: ''};
        case GET_ACCOUNTS:
            return {...state, accountsLoading: true};
        case GET_ACCOUNTS_SUCCESS:
            return {
                ...state, accountsLoading: false,
                accounts: action.payload.eBankingAccounts,
                linkedAccounts: action.payload.linkedAccounts,
                accountsInitialized: true
            };
        case GET_ACCOUNTS_FAIL:
            return {...state, accountsLoading: false, accountsError: action.payload};
        case LINK_ACCOUNTS:
            return {...state, linkLoading: true};
        case LINK_ACCOUNTS_SUCCESS:
            return {...state, linkLoading: false};
        case LINK_ACCOUNTS_FAIL:
            return {...state, linkLoading: false, accountsError: action.payload};
        case ACCOUNTS_SELECTED:
            return {...state, linkedAccounts: action.payload};
        case GET_LINKED_ACCOUNTS:
            return {...state, accountsLoading: true};
        case GET_LINKED_ACCOUNTS_SUCCESS:
            return {
                ...state,
                accountsLoading: false,
                linkedAccounts: action.payload
            };
        case GET_LINKED_ACCOUNTS_FAIL:
            return {...state, accountsLoading: false, accountsError: action.payload};
        default:
            return state;
    }
};
