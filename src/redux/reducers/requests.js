import { createReducer } from "@reduxjs/toolkit";
import { getItemLocalStorage, setItemLocalStorage } from "../../utils/functions/localstorage";
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
            const allRequestsData = getItemLocalStorage(process.env.REACT_APP_HOMY_ALL_REQUESTS_LOCALSTORAGE);
            allRequestsData.allRequests.unshift(action.payload);
            setItemLocalStorage(process.env.REACT_APP_HOMY_ALL_REQUESTS_LOCALSTORAGE, allRequestsData);

            const recentRequestsData = getItemLocalStorage(process.env.REACT_APP_HOMY_RECENT_REQUESTS_LOCALSTORAGE);
            recentRequestsData.recentRequests.unshift(action.payload);
            if(recentRequestsData.recentRequests.length > 3){
                recentRequestsData.recentRequests = [...recentRequestsData.recentRequests.slice(0, 3)];
            }
            state.recentRequests = recentRequestsData.recentRequests;
            setItemLocalStorage(process.env.REACT_APP_HOMY_RECENT_REQUESTS_LOCALSTORAGE, recentRequestsData);
        })
        .addCase(getRecentRequests, state => {
            const recentRequestsArray = getItemLocalStorage(process.env.REACT_APP_HOMY_RECENT_REQUESTS_LOCALSTORAGE).recentRequests;
            state.recentRequests = recentRequestsArray;
        })
        .addCase(deleteRecentRequestItem, (state, action) => {
            const allRequestsData =  getItemLocalStorage(process.env.REACT_APP_HOMY_ALL_REQUESTS_LOCALSTORAGE);
            const index = allRequestsData.allRequests.findIndex(item => item.uid === action.payload);
            allRequestsData.allRequests = [...allRequestsData.allRequests.slice(0, index), ...allRequestsData.allRequests.slice(index + 1)];
            let arr = [];
            //eslint-disable-next-line
            allRequestsData.allRequests.some((item, i) => {
                if(i < 3){
                    arr.push(item);
                }
            });
            setItemLocalStorage(process.env.REACT_APP_HOMY_ALL_REQUESTS_LOCALSTORAGE, allRequestsData);
            state.recentRequests = arr;
            
            const recentRequestsData = getItemLocalStorage(process.env.REACT_APP_HOMY_RECENT_REQUESTS_LOCALSTORAGE);
            recentRequestsData.recentRequests = state.recentRequests;
            setItemLocalStorage(process.env.REACT_APP_HOMY_RECENT_REQUESTS_LOCALSTORAGE, recentRequestsData);
        })
        .addDefaultCase(() => {});
});

export default requests;