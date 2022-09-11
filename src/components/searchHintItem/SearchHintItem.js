import { useDispatch, useSelector } from 'react-redux';
import { changeSearchTerm } from '../../redux/actions/search';
import { deleteRecentRequestItem, forceChangeDisplaySearchHints } from '../../redux/actions/requests';
import { useState } from 'react';

function SearchHintItem({providers, term, fullTerm, providersNames, searchRef, uid}) {

    const dispatch = useDispatch();
    const {searchHintsModalBg,searchHintsIconsColor,searchHintsItemHoverColor, searchHintsIconsTextColor, searchHintsItemProvidersColor, searchHintsItemTermColor} = useSelector(state => {
        if(state.homySettings.homySettings){
            return state.homySettings.homySettings.colors;
        }
    });
    const [style, setStyle] = useState({'backgroundColor': searchHintsModalBg});

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
        <div className="homy_search_hints_item" onClick={clickByElementHint} 
        style={style}
        onMouseEnter={() => setStyle({backgroundColor: searchHintsItemHoverColor})}
        onMouseLeave={() => setStyle({backgroundColor: searchHintsModalBg})}>
            <div className="homy_search_hints_item_recent_icon">
                <i className="fa-sharp fa-solid fa-arrow-rotate-right" style={{color: searchHintsIconsColor}}></i>
            </div>
            <div className="homy_search_hints_item_providers_code" style={{color: searchHintsItemProvidersColor}}>
                {strProvidersNames.length < 15 ? strProvidersNames : strProvidersNames.substr(0, 15) + '...'}
                {providers.length < 15 ? `(${providers})` : '(' + providers.substr(0,15) + '...)'}
            </div>
            <div className="homy_search_hints_item_term" style={{color: searchHintsItemTermColor}}>
                {term.length < 40 ? term : term.substr(0,40) + '...'}
            </div>
            <div className="homy_search_hints_item_delete" onClick={deleteSearchHintItem} style={{backgroundColor: searchHintsIconsColor}}>
                <span style={{color: searchHintsIconsTextColor}}>х</span>
            </div>
        </div>
    );
}

export default SearchHintItem;