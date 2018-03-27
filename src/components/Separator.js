import React from 'react';
import { View } from 'react-native';
import {separator} from "../style/";

export const Separator = (props) => {
    return (
        <View style={separator.container}>
            {props.children}
        </View>
    );
};