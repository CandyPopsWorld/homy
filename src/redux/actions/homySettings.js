import { createAction } from "@reduxjs/toolkit";

export const homySettingsFetched = createAction('HOMY_SETTINGS_FETCHED');
export const changeViewMode = createAction('CHANGE_VIEW_MODE');
export const changeDisplaySettingsWrapper = createAction('CHANGE_DISPLAY_SETTINGS_WRAPPER');
export const forceChangeDisplaySettingsWrapper = createAction('FORCE_CHANGE_DISPLAY_SETTINGS_WRAPPER');
export const changeGeneralAndInterfaceSettings = createAction('CHANGE_GENERAL_AND_INTERFACE_SETTINGS');
export const changeActiveTheme = createAction('CHANGE_ACTIVE_SCHEME');
export const shortcutsChangeSettings = createAction('SHORTCUTS_CHANGE_SETTINGS');
export const getSearchRefSettings = createAction('GET_SEARCH_REF_SETTINGS');