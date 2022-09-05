import { createReducer } from "@reduxjs/toolkit";
import { localstorageFetched } from "../actions";
import CryptoJS from 'crypto-js';

const initialState = {
    settings: {}
};

const settings = createReducer(initialState, builder => {
    builder
        .addCase(localstorageFetched, (state, action) => {
            const bytes = CryptoJS.AES.decrypt(action.payload.baseUrl, process.env.REACT_APP_SECRET_KEY_ENCRYPT);
            const originalText = bytes.toString(CryptoJS.enc.Utf8);
            action.payload.baseUrl = originalText;

            let arrayProviders = [];
            action.payload.searchProviders.forEach(({code, provider}) => {
                const bytesProvider = CryptoJS.AES.decrypt(provider, process.env.REACT_APP_SECRET_KEY_ENCRYPT);
                const originaProviderlText = bytesProvider.toString(CryptoJS.enc.Utf8);
                const bytesCodeProvider = CryptoJS.AES.decrypt(code, process.env.REACT_APP_SECRET_KEY_ENCRYPT);
                const originaProviderCodelText = bytesCodeProvider.toString(CryptoJS.enc.Utf8);
                arrayProviders.push({code: originaProviderCodelText, provider: originaProviderlText});
            });
            action.payload.searchProviders = arrayProviders;
            state.settings = action.payload;
        })
        .addDefaultCase(() => {});
});

export default settings;