import { Toast } from 'bootstrap';

export function errorMessageToast(errorMessage) {
    const errorMessageToast = document.getElementById('errorMessageToast');
    const errorMessageElem = document.getElementById('errorMessage');

    errorMessageElem.innerText = errorMessage;
    const toast = new Toast(errorMessageToast);
    toast.show();
}

const methods = {
    successMessageToast(successMessage) {
        const successMessageToast = document.getElementById('successMessageToast')
        const successMessageElem = document.getElementById('successMessage');

        successMessageElem.innerText = successMessage;
        const toast = new Toast(successMessageToast);
        toast.show();
    },
    errorMessageToast(errorMessage) {
        const errorMessageToast = document.getElementById('errorMessageToast');
        const errorMessageElem = document.getElementById('errorMessage');

        errorMessageElem.innerText = errorMessage;
        const toast = new Toast(errorMessageToast);
        toast.show();
    },
    warningMessageToast(warningMessage) {
        const warningMessageToast = document.getElementById('warningMessageToast');
        const warningMessageElem = document.getElementById('warningMessage');

        warningMessageElem.innerText = warningMessage;
        const toast = new Toast(warningMessageToast);
        toast.show();
    },
}


export default {
    install(Vue) {
        Vue.config.globalProperties.$successAlert = methods.successMessageToast;
        Vue.config.globalProperties.$errorAlert = methods.errorMessageToast;
        Vue.config.globalProperties.$warningAlert = methods.warningMessageToast;
    },
};
