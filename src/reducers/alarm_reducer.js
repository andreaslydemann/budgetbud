import {
    CATEGORY_ALARM_ENABLED
} from '../actions/types';

const INITIAL_STATE = {
    enabledCategoryAlarms: [],
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case CATEGORY_ALARM_ENABLED:
            const enabledCategoryAlarms = state.enabledCategoryAlarms;
            if (enabledCategoryAlarms.includes(action.payload)) {
                enabledCategoryAlarms.splice(enabledCategoryAlarms.indexOf(action.payload), 1)
            } else {
                enabledCategoryAlarms.push(action.payload);
            }
            return {...state, enabledCategoryAlarms};
        default:
            return state;
    }
};
