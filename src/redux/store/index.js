import { configureStore } from "@reduxjs/toolkit";
import search from "../reducers/search";
import settings from "../reducers/settings";
import requests from "../reducers/requests";
import mainBookmarks from "../reducers/mainBookmarks";
import { stringMiddleware } from "../middlewares";

const store = configureStore({
    reducer: {search, settings, requests, mainBookmarks},
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(stringMiddleware),
    devTools: process.env.NODE_ENV !== 'production'
});

export default store;