import { createReducer } from "@reduxjs/toolkit";
import { getItemLocalStorage, setItemLocalStorage } from "../../utils/functions/localstorage";
import {_pathLocalstorage_allRequests, _pathLocalstorage_recentRequests } from "../../utils/data/localstorage";
import { changeDisplaySearchHints, writeRequest, getRecentRequests, deleteRecentRequestItem, forceChangeDisplaySearchHints } from "../actions/requests";

const initialState = {
    displaySearchHints: false,
    recentRequests: [],
    allRequests: []
};

const requests = createReducer(initialState, builder => {
    builder
        .addCase(changeDisplaySearchHints, state => {
            state.displaySearchHints = !state.displaySearchHints
        })
        .addCase(forceChangeDisplaySearchHints, (state, action) => {
            state.displaySearchHints = action.payload;
        })
        .addCase(writeRequest, (state, action) => {
            const allRequestsData = getItemLocalStorage(_pathLocalstorage_allRequests);
            allRequestsData.allRequests.unshift(action.payload);
            setItemLocalStorage(_pathLocalstorage_allRequests, allRequestsData);

            const recentRequestsData = getItemLocalStorage(_pathLocalstorage_recentRequests);
            recentRequestsData.recentRequests.unshift(action.payload);
            if(recentRequestsData.recentRequests.length > 3){
                recentRequestsData.recentRequests = [...recentRequestsData.recentRequests.slice(0, 3)];
            }
            state.recentRequests = recentRequestsData.recentRequests;
            setItemLocalStorage(_pathLocalstorage_recentRequests, recentRequestsData);
        })
        .addCase(getRecentRequests, state => {
            const recentRequestsArray = getItemLocalStorage(_pathLocalstorage_recentRequests).recentRequests;
            state.recentRequests = recentRequestsArray;
        })
        .addCase(deleteRecentRequestItem, (state, action) => {
            const allRequestsData =  getItemLocalStorage(_pathLocalstorage_allRequests);
            const index = allRequestsData.allRequests.findIndex(item => item.uid === action.payload);
            allRequestsData.allRequests = [...allRequestsData.allRequests.slice(0, index), ...allRequestsData.allRequests.slice(index + 1)];
            let arr = [];
            //eslint-disable-next-line
            allRequestsData.allRequests.some((item, i) => {
                if(i < 3){
                    arr.push(item);
                }
            });
            setItemLocalStorage(_pathLocalstorage_allRequests, allRequestsData);
            state.recentRequests = arr;
            
            const recentRequestsData = getItemLocalStorage(_pathLocalstorage_recentRequests);
            recentRequestsData.recentRequests = state.recentRequests;
            setItemLocalStorage(_pathLocalstorage_recentRequests, recentRequestsData);
        })
        .addDefaultCase(() => {});
});

export default requests;