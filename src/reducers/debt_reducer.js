import {
    GET_INITIAL_STATE
} from '../actions/types';

const INITIAL_STATE = {
    debtList: [
        {name: "Gæld 1", value: '10'},
        {name: "Gæld 2", value: '20'},
        {name: "Gæld 3", value: '30'},
        {name: "Gæld 4", value: '40'}
    ]
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case GET_INITIAL_STATE:
            return INITIAL_STATE;
        default:
            return state;
    }
};
