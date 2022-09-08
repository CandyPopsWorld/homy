import { useEffect } from 'react';
import Header from '../header/Header';
import './App.scss';
import { localstorage, homyAllRequests, homyReacentRequests, _pathLocalstorage_homy, _pathLocalstorage_allRequests, _pathLocalstorage_recentRequests } from '../../utils/data/localstorage';
import { useDispatch, useSelector } from 'react-redux';
import { localstorageFetched, changeDisplaySettingsModal } from '../../redux/actions/settings';
import Settings from '../settings/Settings';
import { forceChangeDisplaySearchHints } from '../../redux/actions/requests';
import { _homySearchBlockInput_ClassName, _homySearchHintsItem_ClassName, _homySearchHints_ClassName, _homySettingsModal_ClassName } from '../../utils/data/classes';
function App(props) {

    const dispatch = useDispatch();
    const displayModal = useSelector(state => state.settings.displayModal);
    const displaySearchHints = useSelector(state => state.requests.displaySearchHints);

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
    };

    const initializationLocalStorage = async () => {
        await getLocalStorage();
        await dispatch(localstorageFetched(JSON.parse(localStorage.getItem(_pathLocalstorage_homy))));
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
        }}>
            <Header/>
            <Settings/>
        </div>
    );
}

export default App;