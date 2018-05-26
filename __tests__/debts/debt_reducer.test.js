import debtReducer from '../../src/app/debts/debt_reducer';
import {DEBT_AMOUNT_CHANGED, DEBT_SELECTED, DELETE_DEBT, GET_DEBTS_SUCCESS} from '../../src/strings/types';
import * as datetime from "lodash/date";
import {INITIAL_DEBT_STATE} from "../test_helper/initial_state";

describe('debt_reducer', () => {
    let initialState;
    beforeEach(() => {
        initialState = INITIAL_DEBT_STATE;
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