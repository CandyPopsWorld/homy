import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SearchHintItem from '../searchHintItem/SearchHintItem';
import './SearchHints.scss';
import { getRecentRequests } from '../../redux/actions/requests';
import { _pathLocalstorage_allRequests, _pathLocalstorage_recentRequests } from '../../utils/data/localstorage';
function SearchHints({searchRef}) {

    const dispatch = useDispatch();
    const displaySearchHints = useSelector(state => state.requests.displaySearchHints);
    const recentRequests = useSelector(state => state.requests.recentRequests);

    useEffect(() => {
        if(localStorage.getItem(_pathLocalstorage_allRequests) && localStorage.getItem(_pathLocalstorage_recentRequests)){
            dispatch(getRecentRequests());
        }
        // eslint-disable-next-line
    }, []);

    let elements_hints = recentRequests.map(({providers, term, fullTerm, providersNames, uid}, i) => {
        return <SearchHintItem key={i} providers={providers} term={term} fullTerm={fullTerm} providersNames={providersNames} searchRef={searchRef} uid={uid}/>
    });

    return (
        <div className='homy_search_hints' style={displaySearchHints && recentRequests.length > 0 ? {display: 'block'} : {display: 'none'}}>
            {elements_hints}
        </div>
    );
}

export default SearchHints;