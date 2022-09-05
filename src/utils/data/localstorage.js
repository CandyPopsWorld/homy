import CryptoJS from 'crypto-js';
import { searchProviders } from './commands';

export const localstorage = {
    baseUrl: CryptoJS.AES.encrypt(process.env.REACT_APP_BASE_URL, process.env.REACT_APP_SECRET_KEY_ENCRYPT).toString(),
    searchProviders
};