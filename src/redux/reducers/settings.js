import { createReducer } from "@reduxjs/toolkit";
import { localstorageFetched, changeDisplaySettingsModal } from "../actions/settings";
import CryptoJS from 'crypto-js';

const initialState = {
    settings: {},
    displayModal: false
};

const settings = createReducer(initialState, builder => {
    builder
        .addCase(localstorageFetched, (state, action) => {
            const bytes = CryptoJS.AES.decrypt(action.payload.baseUrl, process.env.REACT_APP_SECRET_KEY_ENCRYPT);
            const originalText = bytes.toString(CryptoJS.enc.Utf8);
            action.payload.baseUrl = originalText;

            const bytesBase = CryptoJS.AES.decrypt(action.payload.baseCode, process.env.REACT_APP_SECRET_KEY_ENCRYPT);
            const originaBaselText = bytesBase.toString(CryptoJS.enc.Utf8);
            action.payload.baseCode = originaBaselText;

            const bytesBaseName = CryptoJS.AES.decrypt(action.payload.baseProviderName, process.env.REACT_APP_SECRET_KEY_ENCRYPT);
            const originaBaseNameText = bytesBaseName.toString(CryptoJS.enc.Utf8);
            action.payload.baseProviderName = originaBaseNameText;

            let arrayProviders = [];
            action.payload.searchProviders.forEach(({code, provider, providerName}) => {
                const bytesProvider = CryptoJS.AES.decrypt(provider, process.env.REACT_APP_SECRET_KEY_ENCRYPT);
                const originaProviderlText = bytesProvider.toString(CryptoJS.enc.Utf8);
                const bytesCodeProvider = CryptoJS.AES.decrypt(code, process.env.REACT_APP_SECRET_KEY_ENCRYPT);
                const originaProviderCodelText = bytesCodeProvider.toString(CryptoJS.enc.Utf8);
                const bytesNameProvider = CryptoJS.AES.decrypt(providerName, process.env.REACT_APP_SECRET_KEY_ENCRYPT);
                const originalNameProviderText = bytesNameProvider.toString(CryptoJS.enc.Utf8);
                arrayProviders.push({code: originaProviderCodelText, provider: originaProviderlText, providerName: originalNameProviderText});
            });
            action.payload.searchProviders = arrayProviders;
            state.settings = action.payload;
        })
        .addCase(changeDisplaySettingsModal, state => {
            state.displayModal = !state.displayModal
        })
        .addDefaultCase(() => {});
});

export default settings;