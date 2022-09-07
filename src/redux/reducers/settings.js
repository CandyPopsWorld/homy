import { createReducer } from "@reduxjs/toolkit";
import { localstorageFetched, changeDisplaySettingsModal } from "../actions/settings";
import { decryptData } from "../../utils/functions/decryptData";

const initialState = {
    settings: {},
    displayModal: false
};

const settings = createReducer(initialState, builder => {
    builder
        .addCase(localstorageFetched, (state, action) => {
            action.payload.baseUrl = decryptData(action.payload.baseUrl);
            action.payload.baseCode = decryptData(action.payload.baseCode);
            action.payload.baseProviderName = decryptData(action.payload.baseProviderName);
            let arrayProviders = [];
            action.payload.searchProviders.forEach(({code, provider, providerName}) => {
                arrayProviders.push({code: decryptData(code), provider: decryptData(provider), providerName: decryptData(providerName)});
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