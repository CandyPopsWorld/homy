import classNames from 'classnames';
import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { forceChangeDisplaySettingsWrapper } from '../../redux/actions/homySettings';
import { deleteAllRequestItem, getAllRequestsWithOffset } from '../../redux/actions/requests';
import { changeSearchTerm } from '../../redux/actions/search';
import './SettingsWrapper.scss';
function SettingsWrapper(props) {

    const dispatch = useDispatch();
    const displaySettingsWrapper = useSelector(state => state.homySettings.displaySettingsWrapper);
    
    const [activeNav, setActiveNav] = useState(2);

    const settingsNav = [
        {title: 'История', id: 1},
        {title: 'Настройки', id: 2},
        {title: 'Безопасность', id: 3},
    ];


    let elements_nav = settingsNav.map(({title, active, id}) => {
        const navClass = classNames({
            'homy_settings_wrapper_nav_item': true,
            'active': activeNav === id
        });
        return (
            <div className={navClass} key={id}>
                <button onClick={() => setActiveNav(id)}>{title}</button>
            </div>
        )
    });

    let activeSlide = <SettingsNavBlock/>
    switch(activeNav){
        case 1:
            activeSlide = <HistoryNavBlock/>
            break;
        case 2:
            activeSlide = <SettingsNavBlock/>
            break;
        case 3:
            activeSlide = <SecurityNavBlock/>
            break;
        default:
            break;
    };

    return (
        <div className='homy_settings_wrapper' style={displaySettingsWrapper ? {display: 'block'} : {display: 'none'}}>
            <div className="homy_settings_wrapper_back">
                <p onClick={() => dispatch(forceChangeDisplaySettingsWrapper(false))}>Вернуться назад</p>
            </div>
            <div className="homy_settings_wrapper_nav">
                {elements_nav}
            </div>
            <div className="homy_settings_wrapper_nav_block">
                {
                    activeSlide
                }
            </div>
        </div>
    );
};

const HistoryNavBlock = () => {

    const dispatch = useDispatch();
    const allRequests = useSelector(state => state.requests.allRequests);
    const searchRef = useSelector(state => state.search.searchRef);

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

    useEffect(() => {
        if(allRequests.length === 0){
            getHistory();
        }
        // eslint-disable-next-line
    }, [])

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
                        <select name="" id="">
                            {elements_options}
                        </select>

                        <div className="homy_settings_wrapper_nav_block_item_clear_history_modal_wrapper_count_requests">
                            ... Записей
                        </div>
                        <div className="homy_settings_wrapper_nav_block_item_clear_history_modal_wrapper_controls">
                            <div className="homy_settings_wrapper_nav_block_item_clear_history_modal_wrapper_controls_item">
                                <button className='clear_history_btn'>Очистить</button>
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

const SettingsNavBlock = () => {
    return (
        <div className="homy_settings_wrapper_nav_block_item">
            <div className="homy_settings_wrapper_nav_block_item_header">
                <h2>Настройки</h2>
            </div>
        </div>
    )
};

const SecurityNavBlock = () => {
    return (
        <div className="homy_settings_wrapper_nav_block_item">
            <div className="homy_settings_wrapper_nav_block_item_header">
                <h2>Безопасность</h2>
            </div>
        </div>
    )
};

export default SettingsWrapper;