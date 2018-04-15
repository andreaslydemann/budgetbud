import axios from 'axios';
import {Notifications, Permissions} from "expo";
import {BUDGETBUD_FUNCTIONS_URL} from "../config/firebase_config";

// From expo-docs: https://docs.expo.io/versions/v25.0.0/guides/push-notifications.html#content
export default registerForPushNotificationsAsync = async (user) => {
    const {status: existingStatus} = await Permissions.getAsync(
        Permissions.NOTIFICATIONS
    );

    let finalStatus = existingStatus;

    if (existingStatus !== 'granted') {
        const {status} = await Permissions.askAsync(Permissions.NOTIFICATIONS);
        finalStatus = status;
    } else {
        return;
    }

    if (finalStatus !== 'granted') {
        return;
    }

    /*let pushToken = await Notifications.getExpoPushTokenAsync();
    let idToken = await user.getIdToken();

    await axios.post(`${BUDGETBUD_FUNCTIONS_URL}/addPushToken`,
        {pushToken, cprNumber: user.uid}, {headers: {Authorization: 'Bearer ' + idToken}});*/
};
