import React from 'react';
import {fromJS} from "../../node_modules/immutable/dist/immutable";

export const setupNewCategoriesList = (tmpCategories, name, newAmount) => {
    let list = fromJS(tmpCategories);
    const indexOfListToUpdate = list.findIndex(listItem => {
        return listItem.get('name') === name;
    });
    // Calculate new total expenses
    // Edit list for the new categories-state
    list = list.setIn([indexOfListToUpdate, 'amount'], newAmount);
    return list.toJS();
};