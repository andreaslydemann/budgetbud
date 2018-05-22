import React from 'react';
import { View } from 'react-native';
import {container} from "../../style/index";

export const Separator = (props) => {
    return (
        <View style={container.separatorContainer}>
            {props.children}
        </View>
    );
};
