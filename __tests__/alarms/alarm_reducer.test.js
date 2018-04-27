import alarmReducer from '../../src/app/alarms/alarm_reducer';
import {
    GET_BUDGET_ALARMS_SUCCESS,
    GET_CATEGORY_ALARMS_FAIL,
    TOGGLE_CATEGORY_ALARM,
    WEEKLY_STATUS_TOGGLED
} from '../../src/strings/types';

describe('alarm_reducer', () => {
    let initialState;
    const testError = 'testError';
    beforeEach(() => {
        initialState = {
            categoryAlarms: [],
            budgetExceeded: false,
            weeklyStatus: false,
            alarmsLoading: false,
            toggleLoading: false,
            alarmsError: '',
            budgetAlarmsInitialized: false,
            categoryAlarmsInitialized: false
        };
    });

    it('has default state', () => {
        expect(alarmReducer(undefined, {type: 'unexpected'})).toEqual(initialState);
    });

    it('can handle WEEKLY_STATUS_TOGGLED', () => {
        const toggleAction = {
            type: WEEKLY_STATUS_TOGGLED,
            payload: true
        };
        expect(alarmReducer({}, toggleAction)).toEqual({
            weeklyStatus: true
        })
    });

    it('can handle GET_BUDGET_ALARMS_SUCCESS', () => {
        const getBudgetAlarmsSuccessAction = {
            type: GET_BUDGET_ALARMS_SUCCESS,
            payload: {
                budgetExceeded: true,
                weeklyStatus: false
            }
        };
        expect(alarmReducer({}, getBudgetAlarmsSuccessAction)).toEqual({
                budgetExceeded: true,
                weeklyStatus: false,
                alarmsLoading: false,
                budgetAlarmsInitialized: true
            }
        )
    });

    it('can handle TOGGLE_CATEGORY_ALARM', () => {
        const testCategory = 'testCategory';
        const toggleCategoryAlarmAction = {
            type: TOGGLE_CATEGORY_ALARM,
            payload: testCategory
        };
        let newState = alarmReducer(initialState, toggleCategoryAlarmAction);
        expect(newState.categoryAlarms).toEqual([testCategory])

        newState = initialState;
        newState.categoryAlarms = [testCategory];
        newState = alarmReducer(newState, toggleCategoryAlarmAction);
        expect(newState.categoryAlarms).toEqual([])
    });

    it('can handle GET_CATEGORY_ALARMS_FAIL', () => {
        const getCategoryAlarmsFailAction = {
            type: GET_CATEGORY_ALARMS_FAIL,
            payload: testError
        };
        expect(alarmReducer({}, getCategoryAlarmsFailAction)).toEqual(
            {alarmsLoading: false, alarmsError: testError}
        )
    })
});