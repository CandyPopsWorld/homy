import { createReducer } from "@reduxjs/toolkit";
import { _pathLocalstorage_homySettings } from "../../utils/data/localstorage";
import { classicView, minView, workView } from "../../utils/data/settings";
import { getItemLocalStorage, setItemLocalStorage } from "../../utils/functions/localstorage";
import { changeViewMode, forceChangeDisplaySettingsWrapper, homySettingsFetched } from "../actions/homySettings";

const initialState = {
    homySettings: {
        view: {},
        colors: {}
    },
    displaySettingsWrapper: false
};

const homySettings = createReducer(initialState, builder => {
    builder
        .addCase(homySettingsFetched, (state, action) => {
            state.homySettings = action.payload;
        })
        .addCase(changeViewMode, (state, action) => {
            switch(action.payload){
                case 'classicView':
                    state.homySettings.view = classicView;
                    break;
                case 'workView':
                    state.homySettings.view = workView;
                    break; 
                case 'minView':
                    state.homySettings.view = minView;
                    break; 
                default:
                    break;
            };
            const homySettingsData = getItemLocalStorage(_pathLocalstorage_homySettings);
            homySettingsData.view = state.homySettings.view;
            setItemLocalStorage(_pathLocalstorage_homySettings, homySettingsData);
        })
        .addCase(forceChangeDisplaySettingsWrapper, (state, action) => {
            state.displaySettingsWrapper = action.payload;
        })
        .addDefaultCase(() => {});
});

export default homySettings;