import { createReducer } from "@reduxjs/toolkit";
import { _pathLocalstorage_mainBookmarks } from "../../utils/data/localstorage";
import { getItemLocalStorage, setItemLocalStorage } from "../../utils/functions/localstorage";
import { changeDisplayMainBookmarksModal, createMainBookmark, deleteMainBookmark, forceChangeDisplayMainBookmarksModal, forceChangeDisplayUpdateMainBookmarkModal, mainBookmarksFetched, updateMainBookmark, writeLocalUpdateBookmark } from "../actions/mainBookmarks";

const initialState = {
    displayCreateModalMainBookmarks: false,
    displayUpdateModalMainBookmarks: false,
    localUpdateBookmark: null,
    mainBookmarks: []
};

const mainBookmarks = createReducer(initialState, builder => {
    builder
        .addCase(mainBookmarksFetched, (state) => {
            const mainBookmarksData = getItemLocalStorage(_pathLocalstorage_mainBookmarks);
            state.mainBookmarks = mainBookmarksData.mainBookmarks;
        })
        .addCase(changeDisplayMainBookmarksModal, (state) => {
            state.displayCreateModalMainBookmarks = !state.displayCreateModalMainBookmarks;
        })
        .addCase(forceChangeDisplayMainBookmarksModal, (state, action) => {
            state.displayCreateModalMainBookmarks = action.payload;
        })
        .addCase(createMainBookmark, (state, action) => {
            const mainBookmarksData = getItemLocalStorage(_pathLocalstorage_mainBookmarks);
            let bool = false;
            for(let i = 0; i < mainBookmarksData.mainBookmarks.length; i++){
                if(mainBookmarksData.mainBookmarks[i].url === action.payload.url){
                    bool = true;
                    break;
                }
            }
            if(bool === false){
                mainBookmarksData.mainBookmarks.unshift(action.payload);
                state.mainBookmarks = mainBookmarksData.mainBookmarks;
                setItemLocalStorage(_pathLocalstorage_mainBookmarks, mainBookmarksData);
            }
        })
        .addCase(deleteMainBookmark, (state, action) => {
            const mainBookmarksData = getItemLocalStorage(_pathLocalstorage_mainBookmarks);
            mainBookmarksData.mainBookmarks = [...mainBookmarksData.mainBookmarks.slice(0, action.payload), ...mainBookmarksData.mainBookmarks.slice(action.payload + 1)];
            state.mainBookmarks = mainBookmarksData.mainBookmarks;
            setItemLocalStorage(_pathLocalstorage_mainBookmarks, mainBookmarksData);
        })
        .addCase(forceChangeDisplayUpdateMainBookmarkModal, (state, action) => {
            state.displayUpdateModalMainBookmarks = action.payload;
        })
        .addCase(writeLocalUpdateBookmark, (state, action) => {
            state.localUpdateBookmark = action.payload;
        })
        .addCase(updateMainBookmark, (state, action) => {
            const mainBookmarksData = getItemLocalStorage(_pathLocalstorage_mainBookmarks);
            mainBookmarksData.mainBookmarks[action.payload.index] = {url: action.payload.url, name: action.payload.name};
            state.mainBookmarks = mainBookmarksData.mainBookmarks;
            setItemLocalStorage(_pathLocalstorage_mainBookmarks, mainBookmarksData);
        })
        .addDefaultCase(() => {});
});

export default mainBookmarks;