import { createAction } from "@reduxjs/toolkit";

export const changeDisplaySearchHints = createAction('CHANGE_DISPLAY_SEARCH_HINTS');
export const forceChangeDisplaySearchHints = createAction('FORCE_CHANGE_DISPLAY_SEARCH_HINTS');
export const writeRequest = createAction('WRITE_REQUEST');
export const getRecentRequests = createAction('GET_RECENT_REQUESTS');
export const deleteRecentRequestItem = createAction('DELETE_RECENT_REQUEST_ITEM');
export const getAllRequestsWithOffset = createAction('GET_ALL_REQUESTS_WITH_OFFSET');
export const deleteAllRequestItem = createAction('DELETE_ALL_REQUEST_ITEM');