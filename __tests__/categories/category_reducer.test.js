import categoryReducer from '../../src/app/categories/category_reducer';
import {
    GET_CATEGORIES_SUCCESS,
    GET_CATEGORIES_FAIL,
    CREATE_CATEGORIES,
    MAP_EXPENSES_SUCCESS,
    EDIT_CATEGORIES_SUCCESS,
} from '../../src/strings/types';

describe('category_reducer', () => {
    let initialState;
    beforeEach(() => {
        initialState = {
            categories: [],
            categoriesOfDebt: [],
            selectedCategories: [],
            categorySubtractions: [],
            categoriesLoading: false,
            subtractionsLoading: false,
            categoriesError: '',
            tmpCategories: [],
            totalGoalsAmount: 0,
            categoriesInitialized: false
        };
    });

    it('has default state', () => {
        expect(categoryReducer(undefined, {type: 'unexpected'})).toEqual(initialState);
    });

    it('can handle CREATE_CATEGORIES', () => {
        const createCategoriesAction = {
            type: CREATE_CATEGORIES
        };
        expect(categoryReducer({}, createCategoriesAction)).toEqual({
            categoriesLoading: true, categoriesError: ''
        })
    });

    it('can handle GET_CATEGORIES_SUCCESS', () => {
        const testCategories = [{name: 'test', amount: 10, categoryTypeID: '1234'}];
        const getCategoriesSuccessAction = {
            type: GET_CATEGORIES_SUCCESS,
            payload: testCategories
        };
        expect(categoryReducer({}, getCategoriesSuccessAction)).toEqual({
                categoriesLoading: false,
                categories: testCategories,
                categoriesInitialized: true
            }
        )
    });

    it('can handle EDIT_CATEGORIES_SUCCESS', () => {
        const testCategoryAccepted = {name: 'test1', amount: 10, categoryTypeID: '1234'};
        const testCategoryDenied = {name: 'test2', amount: 0, categoryTypeID: '4321'};
        const testCategories = [testCategoryAccepted, testCategoryDenied];
        const editCategoriesSuccessAction = {
            type: EDIT_CATEGORIES_SUCCESS,
            payload: testCategories
        };
        expect(categoryReducer({}, editCategoriesSuccessAction)).toEqual({
                categoriesLoading: false,
                categories: [testCategoryAccepted] //Only the categories with relevant values should be added
            }
        )
    });

    it('can handle MAP_EXPENSES_SUCCESS', () => {
        const testTmpCategories = [{name: 'test', amount: 10, categoryTypeID: '1234'}];
        const testTotalGoalsAmount = 25;
        const mapExpensesSuccessAction = {
            type: MAP_EXPENSES_SUCCESS,
            payload: {
                categories: testTmpCategories,
                totalGoalsAmount: testTotalGoalsAmount
            }
        };
        expect(categoryReducer({}, mapExpensesSuccessAction)).toEqual({
                categoriesLoading: false,
                tmpCategories: testTmpCategories,
                totalGoalsAmount: testTotalGoalsAmount
            }
        )
    });

    it('can handle GET_CATEGORIES_FAIL', () => {
        const testError = 'error';
        const getCategoriesFailAction = {
            type: GET_CATEGORIES_FAIL,
            payload: testError
        };
        expect(categoryReducer({}, getCategoriesFailAction)).toEqual(
            {categoriesLoading: false, categoriesError: testError}
        )
    });
});