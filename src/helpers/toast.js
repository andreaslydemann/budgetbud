import {Toast} from "native-base";
import {container, color} from "../style";
import I18n from "../strings/i18n";

export default showToast = (errorMsg) => Toast.show({
    text: errorMsg,
    duration: 3000,
    position: 'bottom',
    buttonText: I18n.t('toastCloseButton'),
    style: [container.toastContainer, color.warning]
});
