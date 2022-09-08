import CryptoJS from 'crypto-js';
import { searchProviders } from './commands';

export const localstorage = {
    baseUrl: CryptoJS.AES.encrypt(process.env.REACT_APP_BASE_URL, process.env.REACT_APP_SECRET_KEY_ENCRYPT).toString(),
    baseCode: CryptoJS.AES.encrypt(process.env.REACT_APP_BASE_CODE, process.env.REACT_APP_SECRET_KEY_ENCRYPT).toString(),
    baseProviderName: CryptoJS.AES.encrypt(process.env.REACT_APP_BASE_PROVIDER_NAME, process.env.REACT_APP_SECRET_KEY_ENCRYPT).toString(),
    searchProviders
};

export const homyAllRequests = {
    allRequests: []
};

export const homyReacentRequests = {
    recentRequests: []
};

export const _pathLocalstorage_homy = process.env.REACT_APP_HOMY_LOCALSTORAGE;
export const _pathLocalstorage_allRequests = process.env.REACT_APP_HOMY_ALL_REQUESTS_LOCALSTORAGE;
export const _pathLocalstorage_recentRequests = process.env.REACT_APP_HOMY_RECENT_REQUESTS_LOCALSTORAGE;