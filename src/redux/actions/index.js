import { createAction } from "@reduxjs/toolkit";

export const changeSearchTerm = createAction('SEARCH_TERM_CHANGE');
export const clearSearchTerm = createAction('SEARCH_TERM_CLEAR');

export const localstorageFetched = createAction('LOCAL_STORAGE_FETCHED');