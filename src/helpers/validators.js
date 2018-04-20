import React from 'react';
import {Icon} from 'native-base';

export const renderInputIcon = (inputValue, correctLength) => {
    if (0 < inputValue.length && inputValue.length < correctLength)
        return (<Icon name='close-circle' style={{color: '#db000e'}}/>);
    else if (inputValue.length === correctLength)
        return (<Icon name='checkmark-circle' style={{color: '#00d219'}}/>);
};

export const checkInputAmount = amount => {
    if (amount.length === 0)
        return true;

    let amountWithPeriod = amount.replace(/,/g, '.');
    return !isNaN(parseFloat(amountWithPeriod)) && isFinite(amountWithPeriod);
};