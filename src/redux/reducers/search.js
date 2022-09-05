import { createReducer } from "@reduxjs/toolkit";
import { changeSearchTerm, clearSearchTerm } from "../actions";

const initialState = {
    searchTerm: ''
};

const search = createReducer(initialState, builder => {
    builder
        .addCase(changeSearchTerm, (state, action) => {
            state.searchTerm = action.payload;
        })
        .addCase(clearSearchTerm, state => {
            state.searchTerm = ''
        })
        .addDefaultCase(() => {});
});

export default search;