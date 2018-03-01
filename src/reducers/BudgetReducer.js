import {
    BUDGET_CREATE
} from "../actions/types";

const INITIAL_STATE = {
    indkomst: '',
    kategori: ''
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case BUDGET_CREATE:
            return INITIAL_STATE;
        default:
            return state;
    }
}