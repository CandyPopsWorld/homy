import { createAction } from "@reduxjs/toolkit";

export const changeDisplayMainBookmarksModal = createAction('CHANGE_DISPLAY_MAIN_BOOKMARKS_MODAL');
export const forceChangeDisplayMainBookmarksModal = createAction('FORCE_CHANGE_DISPLAY_MAIN_BOOKMARKS_MODAL');
export const createMainBookmark = createAction('CREATE_MAIN_BOOKMARK');
export const mainBookmarksFetched = createAction('MAIN_BOOKMARKS_FETCHED');
export const deleteMainBookmark = createAction('DELETE_MAIN_BOOKMARK');
export const forceChangeDisplayUpdateMainBookmarkModal = createAction('FORCE_CHANGE_DISPLAY_UPDATE_MAIN_BOOKMARK_MODAL');
export const writeLocalUpdateBookmark = createAction('WRITE_LOCAL_UPDATE_BOOKMARK');
export const updateMainBookmark = createAction('UPDATE_MAIN_BOOKMARK');
export const reorderMainBookmarks = createAction('REORDER_MAIN_BOOKMARKS');