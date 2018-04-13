import {Toast} from "native-base";

export default showToast = (errorMsg) => Toast.show({
    text: errorMsg,
    position: 'bottom',
    buttonText: 'Okay',
    duration: 3000,
    type: 'warning'
});
