import { createReducer } from "@reduxjs/toolkit";
import { changeDisplaySearchHints, writeRequest, getRecentRequests } from "../actions/requests";

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
        .addCase(writeRequest, (state, action) => {
            if(localStorage.getItem(process.env.REACT_APP_HOMY_ALL_REQUESTS_LOCALSTORAGE)){
                const obj = JSON.parse(localStorage.getItem(process.env.REACT_APP_HOMY_ALL_REQUESTS_LOCALSTORAGE));
                obj.allRequests.unshift(action.payload);
                localStorage.setItem(process.env.REACT_APP_HOMY_ALL_REQUESTS_LOCALSTORAGE,JSON.stringify(obj));
            }

            if(localStorage.getItem(process.env.REACT_APP_HOMY_RECENT_REQUESTS_LOCALSTORAGE)){
                const obj = JSON.parse(localStorage.getItem(process.env.REACT_APP_HOMY_RECENT_REQUESTS_LOCALSTORAGE));
                obj.recentRequests.unshift(action.payload);
                if(obj.recentRequests.length > 3){
                    obj.recentRequests = [...obj.recentRequests.slice(0, 3)];
                }
                localStorage.setItem(process.env.REACT_APP_HOMY_RECENT_REQUESTS_LOCALSTORAGE, JSON.stringify(obj));
                state.recentRequests = obj.recentRequests;
            }
        })
        .addCase(getRecentRequests, state => {
            if(localStorage.getItem(process.env.REACT_APP_HOMY_RECENT_REQUESTS_LOCALSTORAGE)){
                const recentRequestsArray = JSON.parse(localStorage.getItem(process.env.REACT_APP_HOMY_RECENT_REQUESTS_LOCALSTORAGE)).recentRequests;
                state.recentRequests = recentRequestsArray;
            }
        })
        .addDefaultCase(() => {});
});

export default requests;