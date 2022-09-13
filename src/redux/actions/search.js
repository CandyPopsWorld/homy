import { createAction } from "@reduxjs/toolkit";

export const changeSearchTerm = createAction('SEARCH_TERM_CHANGE');
export const clearSearchTerm = createAction('SEARCH_TERM_CLEAR');
export const getSearchRef = createAction('GET_SEARCH_REF');