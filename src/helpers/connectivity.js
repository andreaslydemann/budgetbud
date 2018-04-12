import {NetInfo} from "react-native";

export const addConnectionChangeEventListener = (handler) => {
    NetInfo.addEventListener(
        'connectionChange',
        handler
    );
};

export const removeConnectionChangeEventListener = (handler) => {
    NetInfo.removeEventListener(
        'connectionChange',
        handler
    );
};
