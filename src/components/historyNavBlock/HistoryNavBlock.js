import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearHistoryWithDate, countHistoryRequestsWithDate, deleteAllRequestItem, getAllRequestsWithOffset } from '../../redux/actions/requests';
import { changeSearchTerm } from '../../redux/actions/search';
import moment from 'moment';
import {transformNumber} from '../../utils/functions/transformNumber';

const HistoryNavBlock = () => {

    const dispatch = useDispatch();
    const allRequests = useSelector(state => state.requests.allRequests);
    const searchRef = useSelector(state => state.search.searchRef);
    const countRequestsWithDate = useSelector(state => state.requests.countRequestsWithDate);
    const loadingCountRequestsWithDate = useSelector(state => state.requests.loadingCountRequestsWithDate);

    const [displayClearHistoryModal, setDisplayClearHistoryModal] = useState(false);

    const historyOptions = [
        {title: 'За последний час', value: 'lastHour', id: 1},
        {title: 'За прошедший день', value: 'lastDay', id: 2},
        {title: 'За прошлую неделю', value: 'lastWeek', id: 3},
        {title: 'За последний месяц', value: 'lastMonth', id: 4},
        {title: 'За всё время', value: 'allTime', id: 5},
    ];

    const getHistory = async () => {
        await dispatch(getAllRequestsWithOffset());
    };

    const clickByElementHistory = async (fullTerm) => {
        await dispatch(changeSearchTerm(fullTerm));
        const imitationEvent = await new KeyboardEvent('keydown', {
            bubbles: true, cancelable: false, code: 'Enter'
        });
        await searchRef.current.dispatchEvent(imitationEvent);
    };

    const deleteHistoryItem = (e, uid) => {
        e.stopPropagation();
        dispatch(deleteAllRequestItem(uid));
    };

    const handleScroll = (e) => {
        const bottom = e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
        if (bottom) {
            dispatch(getAllRequestsWithOffset());
        }
    };

    const changeSelectOptionClearHistory = (e) => {
        const value = e.target.value;
        getCountAllRequests(value);
    };

    const getCountAllRequests = async (value = 'lastHour') => {
        const currentDate = {
            year: transformNumber(moment().year()),
            month: transformNumber(Number(moment().month() + 1)),
            day: transformNumber(moment().date()),
            hour: transformNumber(moment().hours()),
            minutes: transformNumber(moment().minutes()),
            seconds: transformNumber(moment().seconds()),
            week: transformNumber(moment().week())
        };
        dispatch(countHistoryRequestsWithDate({currentDate, value}));
    };

    const onClearHistory = async () => {
        await dispatch(clearHistoryWithDate());
        await setDisplayClearHistoryModal(false);
    };

    useEffect(() => {
        if(allRequests.length === 0){
            getHistory();
        }
        // eslint-disable-next-line
    }, [])

    useEffect(() => {
        if(displayClearHistoryModal){
            getCountAllRequests();
        }
        //eslint-disable-next-line
    }, [displayClearHistoryModal])

    let elements_requests = allRequests.map(({term, uid, time, providersNames, fullTerm}) => {
        let providersNamesStr = providersNames.join(',');
        return (
            <div className="homy_settings_wrapper_nav_block_item_requests_list_item" key={uid} onClick={() => clickByElementHistory(fullTerm)}>
                <div className="homy_settings_wrapper_nav_block_item_requests_list_item_date">
                    {
                        `${time.hour}:${time.minutes}, ${time.day}.${time.month}.${time.year}`
                    }
                </div>
                <div className="homy_settings_wrapper_nav_block_item_requests_list_item_term">
                    {term.length < 100 ? term : term.substr(0,100) + '...'}
                </div>
                <div className="homy_settings_wrapper_nav_block_item_requests_list_item_providers_names">
                    {providersNamesStr.length < 70 ? providersNamesStr : providersNamesStr.substr(0, 70) + '...'}
                </div>
                <div className="homy_settings_wrapper_nav_block_item_requests_list_item_delete">
                    <span className="homy_settings_wrapper_nav_block_item_requests_list_item_delete_link" onClick={(e) => deleteHistoryItem(e, uid)}>Удалить</span>
                </div>
            </div>
        )
    });

    let elements_options = historyOptions.map(item => {
        return <option value={item.value} key={item.id}>{item.title}</option>
    });

    return (
        <div className="homy_settings_wrapper_nav_block_item">
            <div className="homy_settings_wrapper_nav_block_item_header">
                <h2>История</h2>
            </div>
            <div className="homy_settings_wrapper_nav_block_item_clear_history_btn">
                <button onClick={() => setDisplayClearHistoryModal(true)}>Очистить историю</button>
            </div>
            <div className="homy_settings_wrapper_nav_block_item_clear_history_modal" style={displayClearHistoryModal ? {display: 'flex'} : {display: 'none'}} onClick={(e) => {
                if(e.target.classList.contains('homy_settings_wrapper_nav_block_item_clear_history_modal')){
                    setDisplayClearHistoryModal(false);
                }
            }}>
                <div className="homy_settings_wrapper_nav_block_item_clear_history_modal_wrapper">
                    <div className="homy_settings_wrapper_nav_block_item_clear_history_modal_wrapper_header">
                        <h4>Очистка истории</h4>
                        <select name="" id="" onChange={changeSelectOptionClearHistory}>
                            {elements_options}
                        </select>

                        <div className="homy_settings_wrapper_nav_block_item_clear_history_modal_wrapper_count_requests">
                            {loadingCountRequestsWithDate === 'idle' ? countRequestsWithDate : '(Вычисление...)'} Записей
                        </div>
                        <div className="homy_settings_wrapper_nav_block_item_clear_history_modal_wrapper_controls">
                            <div className="homy_settings_wrapper_nav_block_item_clear_history_modal_wrapper_controls_item">
                                <button className='clear_history_btn' onClick={onClearHistory}>Очистить</button>
                            </div>
                            <div className="homy_settings_wrapper_nav_block_item_clear_history_modal_wrapper_controls_item">
                                <button className='back_history_modal' onClick={() => setDisplayClearHistoryModal(false)}>Отмена</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="homy_settings_wrapper_nav_block_item_requests_list" onScroll={handleScroll}>
                {elements_requests.length > 0 ? elements_requests : <span className='homy_settings_wrapper_nav_block_item_requests_list_empty'>История запросов пуста...</span>}
            </div>
        </div>
    )
};

export default HistoryNavBlock;