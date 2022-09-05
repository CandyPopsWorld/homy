import { createReducer } from "@reduxjs/toolkit";
import { localstorageFetched } from "../actions";

const initialState = {
    settings: {}
};

const settings = createReducer(initialState, builder => {
    builder
        .addCase(localstorageFetched, (state, action) => {
            state.settings = action.payload;
        })
        .addDefaultCase(() => {});
});

export default settings;