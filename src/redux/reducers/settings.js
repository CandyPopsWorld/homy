import { createReducer } from "@reduxjs/toolkit";
import { localstorageFetched, changeDisplaySettingsModal, addUserProvider } from "../actions/settings";
import { decryptData } from "../../utils/functions/decryptData";
import { getItemLocalStorage, setItemLocalStorage } from "../../utils/functions/localstorage";
import { _pathLocalstorage_homy } from "../../utils/data/localstorage";

const initialState = {
    settings: {},
    displayModal: false,
};

const settings = createReducer(initialState, builder => {
    builder
        .addCase(localstorageFetched, (state, action) => {
            action.payload.baseUrl = decryptData(action.payload.baseUrl);
            action.payload.baseCode = decryptData(action.payload.baseCode);
            action.payload.baseProviderName = decryptData(action.payload.baseProviderName);
            let arrayProviders = [];
            action.payload.searchProviders.forEach(({code, provider, providerName, role}) => {
                arrayProviders.push({code: decryptData(code), provider: decryptData(provider), providerName: decryptData(providerName), role: decryptData(role)});
            });
            action.payload.searchProviders = arrayProviders;
            state.settings = action.payload;
            console.log(state.settings);
        })
        .addCase(changeDisplaySettingsModal, state => {
            state.displayModal = !state.displayModal
        })
        .addCase(addUserProvider, (state, action) => {
            const homyData = getItemLocalStorage(_pathLocalstorage_homy);
            homyData.searchProviders.push(action.payload);
            let arrayProviders = [];
            homyData.searchProviders.forEach(({code, provider, providerName, role}) => {
                arrayProviders.push({code: decryptData(code), provider: decryptData(provider), providerName: decryptData(providerName), role: decryptData(role)});
            });
            state.settings.searchProviders = arrayProviders;
            setItemLocalStorage(_pathLocalstorage_homy, homyData);
            console.log(state.settings.searchProviders);
        })
        .addDefaultCase(() => {});
});

export default settings;