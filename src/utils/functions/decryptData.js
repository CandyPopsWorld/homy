import CryptoJS from "crypto-js";
export const decryptData = (data) => {
    const bytes = CryptoJS.AES.decrypt(data, process.env.REACT_APP_SECRET_KEY_ENCRYPT);
    const originalText = bytes.toString(CryptoJS.enc.Utf8);
    return originalText;
};