import { useEffect } from 'react';
import Header from '../header/Header';
import './App.scss';
import { localstorage, homyAllRequests, homyReacentRequests, _pathLocalstorage_homy, _pathLocalstorage_allRequests, _pathLocalstorage_recentRequests, _pathLocalstorage_mainBookmarks, homyMainBookmarks } from '../../utils/data/localstorage';
import { useDispatch, useSelector } from 'react-redux';
import { localstorageFetched, changeDisplaySettingsModal } from '../../redux/actions/settings';
import Settings from '../settings/Settings';
import { forceChangeDisplaySearchHints } from '../../redux/actions/requests';
import { _homyModalMainBookmarksCREATE_ClassName, _homyModalMainBookmarksNAME_ClassName, _homyModalMainBookmarksURL_ClassName, _homyModalMainBookmarks_ClassName, _homySearchBlockInput_ClassName, _homySearchHintsItem_ClassName, _homySearchHints_ClassName, _homySettingsModal_ClassName } from '../../utils/data/classes';
import MainBookmarks from '../mainBookmarks/MainBookmarks';
import { forceChangeDisplayMainBookmarksModal, forceChangeDisplayUpdateMainBookmarkModal, mainBookmarksFetched } from '../../redux/actions/mainBookmarks';

function App(props) {

    const dispatch = useDispatch();
    const displayModal = useSelector(state => state.settings.displayModal);
    const displaySearchHints = useSelector(state => state.requests.displaySearchHints);
    const displayCreateModalMainBookmarks = useSelector(state => state.mainBookmarks.displayCreateModalMainBookmarks);
    const displayUpdateModalMainBookmarks = useSelector(state => state.mainBookmarks.displayUpdateModalMainBookmarks);

    const getLocalStorage = async () => {
        if(!localStorage.getItem(_pathLocalstorage_homy)){
            await localStorage.setItem(_pathLocalstorage_homy, JSON.stringify(localstorage));
            await dispatch(localstorageFetched(JSON.parse(localStorage.getItem(_pathLocalstorage_homy))));
        }
        if(!localStorage.getItem(_pathLocalstorage_allRequests)){
            await localStorage.setItem(_pathLocalstorage_allRequests, JSON.stringify(homyAllRequests));
        }
        if(!localStorage.getItem(_pathLocalstorage_recentRequests)){
            await localStorage.setItem(_pathLocalstorage_recentRequests, JSON.stringify(homyReacentRequests));
        }
        if(!localStorage.getItem(_pathLocalstorage_mainBookmarks)){
            await localStorage.setItem(_pathLocalstorage_mainBookmarks, JSON.stringify(homyMainBookmarks));
        }
    };

    const initializationLocalStorage = async () => {
        await getLocalStorage();
        await dispatch(localstorageFetched(JSON.parse(localStorage.getItem(_pathLocalstorage_homy))));
        await dispatch(mainBookmarksFetched());
    };

    useEffect(() => {
        initializationLocalStorage();
        // eslint-disable-next-line
    }, [])

    return (
        <div className='homy' onClick={(e) => {
            if(!e.target.classList.contains(_homySettingsModal_ClassName) && displayModal){
                dispatch(changeDisplaySettingsModal());
            }
            if(!e.target.classList.contains(_homySearchBlockInput_ClassName, _homySearchHints_ClassName, _homySearchHintsItem_ClassName) && displaySearchHints){
                dispatch(forceChangeDisplaySearchHints(false));
            }
            if((e.target.classList.contains(_homyModalMainBookmarks_ClassName) || e.target.classList.contains(_homyModalMainBookmarksURL_ClassName) || e.target.classList.contains(_homyModalMainBookmarksCREATE_ClassName) || e.target.classList.contains(_homyModalMainBookmarksNAME_ClassName)) && (displayCreateModalMainBookmarks || displayUpdateModalMainBookmarks)){
                return;
            } else if(displayCreateModalMainBookmarks) {
                dispatch(forceChangeDisplayMainBookmarksModal(false));
            } else if(displayUpdateModalMainBookmarks){
                dispatch(forceChangeDisplayUpdateMainBookmarkModal(false));
            }
        }}>
            <Header/>
            <MainBookmarks/>
            <Settings/>
        </div>
    );
}

export default App;