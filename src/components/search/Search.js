import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './Search.scss';
import { changeSearchTerm, clearSearchTerm } from '../../redux/actions';
import { validateTerm } from '../../utils/functions/validateTerm';
function Search(props) {

    const dispatch = useDispatch();

    const searchRef = useRef(null);

    const _baseUrl = useSelector(state => state.settings.settings.baseUrl);
    const searchProviders = useSelector(state => state.settings.settings.searchProviders);

    const [searchTerm, setSearchTerm] = useState('');

    const onChangeSearchTerm = (e) => {
        let value = e.target.value;
        setSearchTerm(value);
        dispatch(changeSearchTerm(value));
    };

    const onSubmitInput = (e) => {
        if(e.code !== 'Enter' || searchTerm === ''){
            return;
        }
        createLink(validateTerm(searchTerm, searchProviders));
        clearSearch();
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
            searchRef.current.focus();
        }
    }, [])

    return (
        <div className="homy_search_block">
            <input 
            className="homy_search_block_input" 
            type="text" 
            placeholder='Введите запрос...'
            value={searchTerm}
            onChange={onChangeSearchTerm}
            onKeyDown={onSubmitInput}
            ref={searchRef}/>
        </div>
    );
}

export default Search;