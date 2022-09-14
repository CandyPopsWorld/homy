import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './Search.scss';
import { changeDisplaySearchHints, writeRequest } from '../../redux/actions/requests';
import { changeSearchTerm, clearSearchTerm, getSearchRef } from '../../redux/actions/search';
import { validateTerm } from '../../utils/functions/validateTerm';
import SearchHints from '../searchHints/SearchHints';
import { transformNumber } from '../../utils/functions/transformNumber';
import { uid } from 'uid';
import moment from 'moment/moment';
function Search(props) {

    const dispatch = useDispatch();

    const searchRef = useRef(null);

    const _baseUrl = useSelector(state => state.settings.settings.baseUrl);
    const searchProviders = useSelector(state => state.settings.settings.searchProviders);
    const searchTerm = useSelector(state => state.search.searchTerm);

    const {searchInputColor, searchInputBorderColor} = useSelector(state => {
        if(state.homySettings.homySettings){
            return state.homySettings.homySettings.colors;
        }
    });

    //eslint-disable-next-line
    const [searchTermg, setSearchTerm] = useState('');

    const onChangeSearchTerm = (e) => {
        let value = e.target.value;
        setSearchTerm(value);
        dispatch(changeSearchTerm(value));
    };

    const onSubmitInput = async (e) => {
        if(e.code !== 'Enter' || searchTerm === ''){
            return;
        }
        const searchArr = await validateTerm(searchTerm, searchProviders);
        await writeRequsetsData(searchArr);
        await createLink(searchArr);
        await clearSearch();
    };

    const writeRequsetsData = async (arr) => {
        let globalCode = '';
        let providersNames = [];
        await arr.forEach(item => {
            globalCode += item.code;
            providersNames.push(item.providerName);
        });
        const requestObj = {
            providers: globalCode, 
            term: arr[0].term,
            fullTerm: arr[0].fullTerm,
            providersNames: providersNames,
            time: {
                year: transformNumber(moment().year()),
                month: transformNumber(Number(moment().month() + 1)),
                day: transformNumber(moment().date()),
                hour: transformNumber(moment().hours()),
                minutes: transformNumber(moment().minutes()),
                seconds: transformNumber(moment().seconds()),
                week: transformNumber(moment().week())
            },
            uid: uid(1000)
        };
        dispatch(writeRequest(requestObj));
    };

    const clearSearch = () => {
        setSearchTerm('');
        dispatch(clearSearchTerm());
    };

    const createLink = (terms) => {
        terms.forEach(({term, url}) => {
            const a = document.createElement('a');
            const _target = terms.length > 1 ? '_blank' : '';
            a.setAttribute('href', `${terms.length > 1 ? url : url === '' ? _baseUrl : url}${term}`);
            a.setAttribute('target', _target);
            a.click();
            a.remove();
        })
    };

    useEffect(() => {
        if(searchRef){
            dispatch(getSearchRef(searchRef));
            // searchRef.current.focus();
        }
        // eslint-disable-next-line
    }, [])

    return (
        <div className="homy_search_block">
            <input 
            className="homy_search_block_input"
            style={{color: searchInputColor, borderColor: searchInputBorderColor}} 
            type="text" 
            placeholder='Введите запрос...'
            value={searchTerm}
            onChange={onChangeSearchTerm}
            onKeyDown={onSubmitInput}
            ref={searchRef}
            onFocus={() => {
                dispatch(changeDisplaySearchHints());
            }}/>
            <SearchHints searchRef={searchRef}/>
        </div>
    );
}

export default Search;