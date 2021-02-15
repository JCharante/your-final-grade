// import something here

// "async" is optional
import qrcode from 'qrcodejs2';

export default async ({ Vue }) => {
    Vue.prototype.$qrcode = qrcode;
};
