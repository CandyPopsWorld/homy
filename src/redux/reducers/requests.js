import { createReducer } from "@reduxjs/toolkit";
import { getItemLocalStorage, setItemLocalStorage } from "../../utils/functions/localstorage";
import {_pathLocalstorage_allRequests, _pathLocalstorage_recentRequests } from "../../utils/data/localstorage";
import { changeDisplaySearchHints, writeRequest, getRecentRequests, deleteRecentRequestItem, forceChangeDisplaySearchHints, getAllRequestsWithOffset, deleteAllRequestItem, clearHistoryWithDate, countHistoryRequestsWithDate } from "../actions/requests";

const initialState = {
    displaySearchHints: false,
    recentRequests: [],
    allRequests: [],
    minOffsetAllRequests: 0,
    maxOffsetAllRequests: 150,
    countRequestsWithDate: 0,
    loadingCountRequestsWithDate: 'loading',
    arrClearHistory: []
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
        .addCase(getAllRequestsWithOffset, state => {
            const allRequestsData =  getItemLocalStorage(_pathLocalstorage_allRequests);
            allRequestsData.allRequests.forEach((item, i) => {
                if(i >= state.minOffsetAllRequests && i <= state.maxOffsetAllRequests){
                    state.allRequests.push(item);
                }
            });
            state.minOffsetAllRequests = state.minOffsetAllRequests + 150;
            state.maxOffsetAllRequests = state.maxOffsetAllRequests + 150;
        })
        .addCase(deleteAllRequestItem, (state, action) => {
            const allRequestsData =  getItemLocalStorage(_pathLocalstorage_allRequests);
            const index = allRequestsData.allRequests.findIndex(item => item.uid === action.payload);
            allRequestsData.allRequests = [...allRequestsData.allRequests.slice(0, index), ...allRequestsData.allRequests.slice(index + 1)];
            state.allRequests = allRequestsData.allRequests;

            const recentRequestsData = getItemLocalStorage(_pathLocalstorage_recentRequests);
            const indexRecent = recentRequestsData.recentRequests.findIndex(item => item.uid === action.payload);
            if(indexRecent !== -1){
                recentRequestsData.recentRequests = [...recentRequestsData.recentRequests.slice(0, index), ...recentRequestsData.recentRequests.slice(index + 1)];
                state.recentRequests = recentRequestsData.recentRequests;
                setItemLocalStorage(_pathLocalstorage_recentRequests, recentRequestsData);
            }

            state.recentRequests = [];
            for(let i = 0; i < 3; i++){
                if(allRequestsData.allRequests[i]){
                    state.recentRequests.push(allRequestsData.allRequests[i]);
                }
            }
            recentRequestsData.recentRequests = state.recentRequests;
            setItemLocalStorage(_pathLocalstorage_recentRequests, recentRequestsData);

            setItemLocalStorage(_pathLocalstorage_allRequests, allRequestsData);
        })
        .addCase(clearHistoryWithDate, (state, action) => {
            if(state.arrClearHistory.length === 0){
                return;
            }

            if(state.arrClearHistory.length > 0 && state.arrClearHistory !== 'allTime'){
                const allRequestsData =  getItemLocalStorage(_pathLocalstorage_allRequests);
                const recentRequestsData = getItemLocalStorage(_pathLocalstorage_recentRequests);
                state.arrClearHistory.forEach(uid => {
                    const indexAll = allRequestsData.allRequests.findIndex(item => item.uid === uid);
                    if(indexAll !== -1){
                        allRequestsData.allRequests.splice(indexAll, 1);
                    }

                    const indexRecent = recentRequestsData.recentRequests.findIndex(item => item.uid === uid);
                    if(indexRecent !== -1){
                        recentRequestsData.recentRequests.splice(indexRecent, 1);
                    }
                })
                state.recentRequests = [];
                for(let i = 0; i < 3; i++){
                    if(allRequestsData.allRequests[i]){
                        state.recentRequests.push(allRequestsData.allRequests[i]);
                    }
                }
                state.allRequests = allRequestsData.allRequests;
                recentRequestsData.recentRequests = state.recentRequests;
                state.countRequestsWithDate = 0;
                state.loadingCountRequestsWithDate = 'loading';
                state.arrClearHistory = [];
                setItemLocalStorage(_pathLocalstorage_allRequests, allRequestsData);
                setItemLocalStorage(_pathLocalstorage_recentRequests, recentRequestsData);
            }

            if(state.arrClearHistory === 'allTime'){
                const allRequestsData =  getItemLocalStorage(_pathLocalstorage_allRequests);
                allRequestsData.allRequests = [];
                state.allRequests = allRequestsData.allRequests;
                setItemLocalStorage(_pathLocalstorage_allRequests, allRequestsData);
                const recentRequestsData = getItemLocalStorage(_pathLocalstorage_recentRequests);
                recentRequestsData.recentRequests = [];
                state.recentRequests = [];
                setItemLocalStorage(_pathLocalstorage_recentRequests, recentRequestsData);
            }
        })
        .addCase(countHistoryRequestsWithDate, (state, action) => {
            const {currentDate, value} = action.payload;
            const allRequestsData =  getItemLocalStorage(_pathLocalstorage_allRequests);
            let localCount = 0;
            let localArr = [];
            state.loadingCountRequestsWithDate = 'loading';
            switch(value){
                case 'lastHour':
                    allRequestsData.allRequests.forEach(({time:{day, hour, minutes, month, seconds, year}, uid}) => {
                        if(day === currentDate.day && month === currentDate.month && year === currentDate.year && hour === currentDate.hour){
                            localCount += 1;
                            localArr.push(uid);
                        }
                    })
                    break;
                case 'lastDay':
                    allRequestsData.allRequests.forEach(({time:{day, hour, minutes, month, seconds, year}, uid}) => {
                        if(day === currentDate.day && month === currentDate.month && year === currentDate.year){
                            localCount += 1;
                            localArr.push(uid);
                        }
                    })
                    break;
                case 'lastWeek':
                    allRequestsData.allRequests.forEach(({time:{day, hour, minutes, month, seconds, year, week}, uid}) => {
                        if(month === currentDate.month && year === currentDate.year && week === currentDate.week){
                            localCount += 1;
                            localArr.push(uid);
                        }
                    })
                    break;
                case 'lastMonth':
                    allRequestsData.allRequests.forEach(({time:{day, hour, minutes, month, seconds, year}, uid}) => {
                        if(month === currentDate.month && year === currentDate.year){
                            localCount += 1;
                            localArr.push(uid);
                        }
                    })
                    break;
                case 'allTime':
                    localCount = allRequestsData.allRequests.length;
                    localArr = 'allTime';
                    break;
                default:
                    break;
            }
            state.countRequestsWithDate = localCount;
            state.arrClearHistory = localArr;
            state.loadingCountRequestsWithDate = 'idle';
        })
        .addDefaultCase(() => {});
});

export default requests;