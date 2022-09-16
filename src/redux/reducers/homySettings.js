import { createReducer } from "@reduxjs/toolkit";
import { _pathLocalstorage_homySettings } from "../../utils/data/localstorage";
import { classicView, minView, workView } from "../../utils/data/settings";
import { getItemLocalStorage, setItemLocalStorage } from "../../utils/functions/localstorage";
import { changeActiveTheme, changeGeneralAndInterfaceSettings, changeViewMode, forceChangeDisplaySettingsWrapper, getSearchRefSettings, homySettingsFetched, shortcutsChangeSettings } from "../actions/homySettings";

const initialState = {
    homySettings: {
        view: {},
        colors: {},
        settings: {
            general: {},
            interface: {}
        }
    },
    displaySettingsWrapper: false,
    searchRef: null
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
        .addCase(changeGeneralAndInterfaceSettings, (state, action) => {
            switch(action.payload){
                case 'display_recent_requests':
                    state.homySettings.settings.general.showRecentRequests = !state.homySettings.settings.general.showRecentRequests;
                    break;
                case 'auto_focus_start':
                    state.homySettings.settings.general.autoFocusSearch = !state.homySettings.settings.general.autoFocusSearch;
                    break;
                case 'display_settings_btn':
                    state.homySettings.settings.interface.showBtnAllSettings = !state.homySettings.settings.interface.showBtnAllSettings;
                    break;
                case 'display_main_bookmarks':
                    state.homySettings.settings.interface.showMainBookmarks = !state.homySettings.settings.interface.showMainBookmarks;
                    break;
                default:
                    break;
            }
            const homySettingsData = getItemLocalStorage(_pathLocalstorage_homySettings);
            homySettingsData.settings = state.homySettings.settings;
            setItemLocalStorage(_pathLocalstorage_homySettings, homySettingsData);
        })
        .addCase(changeActiveTheme, (state, action) => {
            state.homySettings.settings.interface.activeScheme = action.payload.theme;
            state.homySettings.colors = action.payload.object;
            const homySettingsData = getItemLocalStorage(_pathLocalstorage_homySettings);
            homySettingsData.settings.interface.activeScheme = state.homySettings.settings.interface.activeScheme;
            homySettingsData.colors = state.homySettings.colors;
            setItemLocalStorage(_pathLocalstorage_homySettings, homySettingsData);
        })
        .addCase(shortcutsChangeSettings, (state, action) => {
            const homySettingsData = getItemLocalStorage(_pathLocalstorage_homySettings);
            switch(action.payload){
                case 17:
                    state.displaySettingsWrapper = true;
                    break;
                case 18:
                    state.searchRef.current.focus();
                    break;
                case 9:
                    state.homySettings.settings.interface.showMainBookmarks = !state.homySettings.settings.interface.showMainBookmarks;
                    homySettingsData.settings.interface.showMainBookmarks = state.homySettings.settings.interface.showMainBookmarks;
                    break;
                case 27:
                    state.homySettings.settings.interface.showBtnAllSettings = !state.homySettings.settings.interface.showBtnAllSettings;
                    homySettingsData.settings.interface.showBtnAllSettings = state.homySettings.settings.interface.showBtnAllSettings;
                    break;
                default: break;
            }
            setItemLocalStorage(_pathLocalstorage_homySettings, homySettingsData);
        })
        .addCase(getSearchRefSettings, (state, action) => {
            state.searchRef = action.payload;
        })
        .addDefaultCase(() => {});
});

export default homySettings;