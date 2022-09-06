import { useEffect } from 'react';
import Header from '../header/Header';
import './App.scss';
import { localstorage, homyAllRequests, homyReacentRequests } from '../../utils/data/localstorage';
import { useDispatch } from 'react-redux';
import { localstorageFetched } from '../../redux/actions/settings';
import Settings from '../settings/Settings';
function App(props) {

    const dispatch = useDispatch();

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
        <div className='homy'>
            <Header/>
            <Settings/>
        </div>
    );
}

export default App;