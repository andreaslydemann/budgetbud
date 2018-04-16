import {
    RESET_DEBT_FORM,
    GET_CATEGORIES,
    GET_CATEGORIES_SUCCESS,
    GET_CATEGORIES_FAIL,
    GET_CATEGORIES_OF_DEBT,
    GET_CATEGORIES_OF_DEBT_SUCCESS,
    GET_CATEGORIES_OF_DEBT_FAIL,
    CATEGORIES_SELECTED,
    CREATE_CATEGORIES,
    CREATE_CATEGORIES_SUCCESS,
    CREATE_CATEGORIES_FAIL,
    GET_MAPPED_CATEGORIES,
    GET_MAPPED_CATEGORIES_SUCCESS,
    GET_MAPPED_CATEGORIES_FAIL,
    MAP_EXPENSES,
    MAP_EXPENSES_SUCCESS,
    MAP_EXPENSES_FAIL,
    CATEGORY_CHANGED,
    GET_BUDGET_SUCCESS
} from '../actions/types';
import {fromJS} from "immutable";

const INITIAL_STATE = {
    categories: [],
    categoriesOfDebt: [],
    selectedCategories: [],
    categorySubtractions: [],
    categoriesLoading: false,
    subtractionsLoading: false,
    categoriesError: '',
    tmpCategories: [],
    totalGoalsAmount: 0
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case RESET_DEBT_FORM:
            return {
                ...state,
                categoriesOfDebt: [],
                selectedCategories: []
            };
        case MAP_EXPENSES:
            return {...state, categoriesLoading: true};
        case MAP_EXPENSES_SUCCESS:
            return {...state, categoriesLoading: false,
                tmpCategories: action.payload.categories,
                totalGoalsAmount: action.payload.totalGoalsAmount
            };
        case MAP_EXPENSES_FAIL:
            return {...state, categoriesLoading: false, categoriesError: action.payload};
        case CREATE_CATEGORIES:
            return {...state, categoriesLoading: true, categoriesError: ''};
        case CREATE_CATEGORIES_SUCCESS:
            return {...state, categoriesLoading: false, categories: action.payload};
        case CREATE_CATEGORIES_FAIL:
            return {...state, categoriesLoading: false, categoriesError: action.payload};
        case GET_CATEGORIES:
            return {...state, categoriesLoading: true, categoriesError: ''};
        case CATEGORY_CHANGED:
            // Create list of new categories
            let list = fromJS(state.tmpCategories);
            const indexOfListToUpdate = list.findIndex(listItem => {
                return listItem.get('name') === action.payload.name;
            });
            // Calculate new total expenses
            let newTotalGoalsAmount = state.totalGoalsAmount - action.payload.categoryDiff;
            // Edit list for the new categories-state
            list = list.setIn([indexOfListToUpdate, 'amount'], action.payload.newAmount);
            return {...state, tmpCategories: list.toJS(), totalGoalsAmount: newTotalGoalsAmount};
        case GET_CATEGORIES_SUCCESS:
            return {...state, categoriesLoading: false, categories: action.payload};
        case GET_CATEGORIES_FAIL:
            return {...state, categoriesLoading: false, categoriesError: action.payload};
        case GET_BUDGET_SUCCESS:
            return {...state, totalGoalsAmount: action.payload.totalGoalsAmount};
        case GET_CATEGORIES_OF_DEBT:
            return {...state, categoriesLoading: true, categoriesError: ''};
        case GET_CATEGORIES_OF_DEBT_SUCCESS:
            return {
                ...state, categoriesLoading: false,
                categoriesOfDebt: action.payload.categoriesOfDebt,
                selectedCategories: action.payload.categoriesOfDebtIDs
            };
        case GET_CATEGORIES_OF_DEBT_FAIL:
            return {...state, categoriesLoading: false, categoriesError: action.payload};
        case GET_MAPPED_CATEGORIES:
            return {...state, categoriesLoading: true, categoriesError: ''};
        case GET_MAPPED_CATEGORIES_SUCCESS:
            return {...state, tmpCategories: action.payload.newCategories};
        case GET_MAPPED_CATEGORIES_FAIL:
            return {...state, categoriesLoading: false, categoriesError: action.payload};
        case CATEGORIES_SELECTED:
            return {...state, selectedCategories: action.payload, categoriesError: ''};
        default:
            return state;
    }
};
