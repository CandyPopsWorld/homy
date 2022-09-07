import CryptoJS from "crypto-js"
export const encryprData = (data) => {
    return CryptoJS.AES.encrypt(data, process.env.REACT_APP_SECRET_KEY_ENCRYPT).toString()
}