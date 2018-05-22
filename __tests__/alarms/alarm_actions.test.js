import {
    RESET_ALARMS_ERROR
} from '../../src/strings/types';

const alarmActions = require('../../src/app/alarms/alarm_actions');

describe('reset', () => {
    it('should create an action to reset alarm error', () => {
        const expectedAction = {
            type: RESET_ALARMS_ERROR
        };
        expect(alarmActions.resetAlarmsError()).toEqual(expectedAction);
    });
});