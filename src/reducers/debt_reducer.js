import {
    GET_INITIAL_STATE
} from '../actions/types';

const INITIAL_STATE = {
    debtItems: [
        {name: "Gæld 1", value: '10'},
        {name: "Gæld 2", value: '20'},
        {name: "Gæld 3", value: '30'},
        {name: "Gæld 4", value: '40'},
        {name: "Gæld 5", value: '50'},
        {name: "Gæld 6", value: '60'},
        {name: "Gæld 7", value: '70'},
        {name: "Gæld 8", value: '80'},
        {name: "Gæld 9", value: '90'},
        {name: "Gæld 10", value: '100'},
        {name: "Gæld 11", value: '110'},
        {name: "Gæld 12", value: '120'}
    ],
    categoryItems: [
        {name: "Kategori 1", value: '10'},
        {name: "Kategori 2", value: '20'},
        {name: "Kategori 3", value: '30'},
        {name: "Kategori 4", value: '40'},
        {name: "Kategori 5", value: '50'},
        {name: "Kategori 6", value: '60'},
        {name: "Kategori 7", value: '70'}
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
