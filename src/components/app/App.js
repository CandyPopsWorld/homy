import { useEffect } from 'react';
import Header from '../header/Header';
import './App.scss';
import { localstorage, homyAllRequests, homyReacentRequests } from '../../utils/data/localstorage';
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
        if(!localStorage.getItem(process.env.REACT_APP_HOMY_LOCALSTORAGE)){
            await localStorage.setItem(process.env.REACT_APP_HOMY_LOCALSTORAGE, JSON.stringify(localstorage));
            await dispatch(localstorageFetched(JSON.parse(localStorage.getItem(process.env.REACT_APP_HOMY_LOCALSTORAGE))));
        }
        if(!localStorage.getItem(process.env.REACT_APP_HOMY_ALL_REQUESTS_LOCALSTORAGE)){
            await localStorage.setItem(process.env.REACT_APP_HOMY_ALL_REQUESTS_LOCALSTORAGE, JSON.stringify(homyAllRequests));
        }
        if(!localStorage.getItem(process.env.REACT_APP_HOMY_RECENT_REQUESTS_LOCALSTORAGE)){
            await localStorage.setItem(process.env.REACT_APP_HOMY_RECENT_REQUESTS_LOCALSTORAGE, JSON.stringify(homyReacentRequests));
        }
    };

    useEffect(() => {
        getLocalStorage();
        dispatch(localstorageFetched(JSON.parse(localStorage.getItem(process.env.REACT_APP_HOMY_LOCALSTORAGE))));
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