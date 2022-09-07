import { useDispatch } from 'react-redux';
import recentIconSprite from '../../resources/image/icons/recent.png';
import { changeSearchTerm } from '../../redux/actions/search';
import { deleteRecentRequestItem, forceChangeDisplaySearchHints } from '../../redux/actions/requests';

function SearchHintItem({providers, term, fullTerm, providersNames, searchRef, uid}) {

    const dispatch = useDispatch();

    let strProvidersNames = '';
    providersNames.forEach(item => {
        if(providersNames.length === 1){
            strProvidersNames += item;
            return;
        }
        strProvidersNames += item + '/';
    });

    const clickByElementHint = async () => {
        await dispatch(changeSearchTerm(fullTerm));
        const imitationEvent = await new KeyboardEvent('keydown', {
            bubbles: true, cancelable: false, code: 'Enter'
        });
        await searchRef.current.dispatchEvent(imitationEvent);
    };

    const deleteSearchHintItem = async (e) => {
        e.stopPropagation();
        await dispatch(deleteRecentRequestItem(uid));
        await dispatch(forceChangeDisplaySearchHints(true));
    };

    return (
        <div className="homy_search_hints_item" onClick={clickByElementHint}>
            <div className="homy_search_hints_item_recent_icon">
                <img src={recentIconSprite} alt="" />
            </div>
            <div className="homy_search_hints_item_providers_code">
                {strProvidersNames.length < 15 ? strProvidersNames : strProvidersNames.substr(0, 15) + '...'}
                {providers.length < 15 ? `(${providers})` : '(' + providers.substr(0,15) + '...)'}
            </div>
            <div className="homy_search_hints_item_term">
                {term.length < 40 ? term : term.substr(0,40) + '...'}
            </div>
            <div className="homy_search_hints_item_delete" onClick={deleteSearchHintItem}>
                <span>х</span>
            </div>
        </div>
    );
}

export default SearchHintItem;