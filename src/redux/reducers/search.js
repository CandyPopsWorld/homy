import { createReducer } from "@reduxjs/toolkit";
import { changeSearchTerm, clearSearchTerm, getSearchRef } from "../actions/search";

const initialState = {
    searchTerm: '',
    searchRef: null
};

const search = createReducer(initialState, builder => {
    builder
        .addCase(changeSearchTerm, (state, action) => {
            state.searchTerm = action.payload;
        })
        .addCase(clearSearchTerm, state => {
            state.searchTerm = '';
        })
        .addCase(getSearchRef, (state, action) => {
            state.searchRef = action.payload;
        })
        .addDefaultCase(() => {});
});

export default search;