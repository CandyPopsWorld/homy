import { createAction } from "@reduxjs/toolkit";

export const homySettingsFetched = createAction('HOMY_SETTINGS_FETCHED');
export const changeViewMode = createAction('CHANGE_VIEW_MODE');
export const changeDisplaySettingsWrapper = createAction('CHANGE_DISPLAY_SETTINGS_WRAPPER');
export const forceChangeDisplaySettingsWrapper = createAction('FORCE_CHANGE_DISPLAY_SETTINGS_WRAPPER');