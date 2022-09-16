import { createAction } from "@reduxjs/toolkit";

export const localstorageFetched = createAction('LOCAL_STORAGE_FETCHED');
export const changeDisplaySettingsModal = createAction('CHANGE_DISPLAY_SETTINGS_MODAL');
export const addUserProvider = createAction('ADD_USER_PROVIDER');
export const deleteUserProvider = createAction('DELETE_USER_PROVIDER');
export const updateUserProvider = createAction('UPDATE_USER_PROVIDER');