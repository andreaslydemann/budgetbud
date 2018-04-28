import debtReducer from '../../src/app/debts/debt_reducer';
import {
    GET_INITIAL_STATE,
    RESET_DEBT_FORM,
    RESET_DEBT_ERROR,
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
    EDIT_DEBT_FAIL,
    DELETE_DEBT,
    DELETE_DEBT_FAIL,
    CALCULATE_DEBT_CATEGORY_SUBTRACTIONS_SUCCESS,
    CALCULATE_DEBT_CATEGORY_SUBTRACTIONS,
    CALCULATE_DEBT_CATEGORY_SUBTRACTIONS_FAIL,
    VALIDATE_DEBT_CATEGORIES_FAIL,
    CREATE_DEBT_FAIL
} from '../../src/strings/types';
import * as datetime from "lodash/date";

describe('debt_reducer', () => {
    let initialState;
    beforeEach(() => {
        initialState = {
            name: '',
            totalAmount: '',
            amountPerMonth: '',
            expirationDate: '',
            debts: [],
            selectedDebt: '',
            categorySubtractions: [],
            debtLoading: false,
            debtError: '',
            debtsInitialized: false
        };
    });

    it('has default state', () => {
        expect(debtReducer(undefined, {type: 'unexpected'})).toEqual(initialState);
    });

    it('can handle GET_DEBTS_SUCCESS', () => {
        const debts = [{name: 'test', amount: 25}];
        const getDebtSuccessAction = {
            type: GET_DEBTS_SUCCESS,
            payload: debts

        };
        expect(debtReducer({}, getDebtSuccessAction)).toEqual({
            debtLoading: false,
            debts,
            debtsInitialized: true
        })
    });

    it('can handle DEBT_SELECTED', () => {
        const name = 'test';
        const totalAmount = 500;
        const amountPerMonth = 20;
        const expirationDate = datetime.now();
        const debtID = '1234';

        const debtSelectedAction = {
            type: DEBT_SELECTED,
            payload: {
                name,
                totalAmount,
                amountPerMonth,
                expirationDate,
                debtID
            }
        };
        expect(debtReducer({}, debtSelectedAction)).toEqual({
                name,
                totalAmount,
                amountPerMonth,
                expirationDate,
                selectedDebt: debtID,
                debtError: ''
            }
        )
    });

    it('can handle DELETE_DEBT', () => {
        const debtToDelete = {id: '1234'};
        const debtToKeep = {id: '4321'};
        let newState = initialState;
        newState.debts = [debtToDelete, debtToKeep];
        newState.selectedDebt = debtToDelete.id;
        const deleteDebtAction = {
            type: DELETE_DEBT
        };
        newState = debtReducer(newState, deleteDebtAction);
        expect(newState.debts).toEqual([debtToKeep])
    });

    it('can handle DEBT_AMOUNT_CHANGED', () => {
        const totalAmount = 1234;
        const debtAmountChangedAction = {
            type: DEBT_AMOUNT_CHANGED,
            payload: totalAmount
        };
        expect(debtReducer({}, debtAmountChangedAction)).toEqual({
                totalAmount
            }
        )
    });
});