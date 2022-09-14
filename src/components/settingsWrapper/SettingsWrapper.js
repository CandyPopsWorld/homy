import classNames from 'classnames';
import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { forceChangeDisplaySettingsWrapper } from '../../redux/actions/homySettings';
import { clearHistoryWithDate, countHistoryRequestsWithDate, deleteAllRequestItem, getAllRequestsWithOffset } from '../../redux/actions/requests';
import { changeSearchTerm } from '../../redux/actions/search';
import './SettingsWrapper.scss';
import moment from 'moment';
import {transformNumber} from '../../utils/functions/transformNumber';
function SettingsWrapper(props) {

    const dispatch = useDispatch();
    const displaySettingsWrapper = useSelector(state => state.homySettings.displaySettingsWrapper);
    
    const [activeNav, setActiveNav] = useState(2);

    const settingsNav = [
        {title: 'История', id: 1},
        {title: 'Настройки', id: 2},
        {title: 'Горячие клавиши', id: 3},
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
            activeSlide = <KeyboardsShortcutsBlock/>
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

const SettingsNavBlock = () => {

    const [displayThemeModal, setDisplayThemeModal] = useState(false);

    const settingsNav = [
        {title: 'Общие настройки', id: 1, href: '#general_settings'},
        {title: 'Интерфейс', id: 2,  href: '#interface_settings'},
        {title: 'Провайдеры', id: 3,  href: '#providers_settings'},
    ];

    const mainThemeSchemes = [
        {theme: 'whiteTheme', color: 'white', name: 'Светлая', id: 1},
        {theme: 'blackTheme', color: 'black', name: 'Темная', id: 2},
    ];

    const colorsThemesSchemes = [
        {theme: 'orangeredTheme', color: 'orangered', id: 3},
        {theme: 'greenTheme', color: 'green', id: 4},
    ];

    //eslint-disable-next-line
    let elements_nav = settingsNav.map(item => {
        return (
            <div className="homy_settings_wrapper_nav_block_item_settings_wrapper_nav_block_item" key={item.id}>
                <a href={item.href}>{item.title}</a>
            </div>
        )
    });

    let elements_main_themes = mainThemeSchemes.map(({color, id, name}) => {
        return (
            <div className="homy_settings_wrapper_nav_block_item_settings_wrapper_content_block_interface_theme_list_item" key={id}>
                <div className="homy_settings_wrapper_nav_block_item_settings_wrapper_content_block_interface_theme_list_item_color" style={{backgroundColor: color}}>

                </div>
                <div className="homy_settings_wrapper_nav_block_item_settings_wrapper_content_block_interface_theme_list_item_name">
                    {name}
                </div>
            </div>
        )
    });

    let elements_colors_themes = colorsThemesSchemes.map(({color, id, name}) => {
        return (
            <div className="homy_settings_wrapper_nav_block_item_settings_wrapper_content_block_interface_theme_list_item" key={id}>
                <div className="homy_settings_wrapper_nav_block_item_settings_wrapper_content_block_interface_theme_list_item_color" style={{backgroundColor: color}}>

                </div>
                <div className="homy_settings_wrapper_nav_block_item_settings_wrapper_content_block_interface_theme_list_item_name">
                    {name}
                </div>
            </div>
        )
    });

    return (
        <div className="homy_settings_wrapper_nav_block_item">
            <div className="homy_settings_wrapper_nav_block_item_header">
                <h2>Настройки</h2>
            </div>
            <div className="homy_settings_wrapper_nav_block_item_settings_wrapper">
                {/* <div className="homy_settings_wrapper_nav_block_item_settings_wrapper_nav_block">
                    {elements_nav}
                </div> */}
                <div className="homy_settings_wrapper_nav_block_item_settings_wrapper_content_block">
                    <div className="homy_settings_wrapper_nav_block_item_settings_wrapper_content_block_general">
                        <div className="homy_settings_wrapper_nav_block_item_settings_wrapper_content_block_header">
                            <h3 id='general_settings'>Общие настройки</h3>
                        </div>
                        <div className="homy_settings_wrapper_nav_block_item_settings_wrapper_content_block_general_header">
                            <h4>Поиск</h4>
                        </div>
                        <div className="homy_settings_wrapper_nav_block_item_settings_wrapper_checks_list">
                            <div className="homy_settings_wrapper_nav_block_item_settings_wrapper_checks_list_item">
                                <input type="checkbox" id='display_recent_requests'/>
                                <label htmlFor="display_recent_requests">Показывать последние запросы</label>
                            </div>
                            <div className="homy_settings_wrapper_nav_block_item_settings_wrapper_checks_list_item">
                                <input type="checkbox" id='auto_focus_start'/>
                                <label htmlFor="auto_focus_start">Автоматически фокусироваться на поисковой строке при входе</label>
                            </div>
                        </div>
                    </div>
                    <div className="homy_settings_wrapper_nav_block_item_settings_wrapper_content_block_interface">
                        <div className="homy_settings_wrapper_nav_block_item_settings_wrapper_content_block_header">
                            <h3 id='interface_settings'>Интерфейс</h3>
                        </div>
                        <div className="homy_settings_wrapper_nav_block_item_settings_wrapper_content_block_interface_header">
                            <h4>Общее</h4>
                        </div>
                        <div className="homy_settings_wrapper_nav_block_item_settings_wrapper_checks_list">
                            <div className="homy_settings_wrapper_nav_block_item_settings_wrapper_checks_list_item">
                                <input type="checkbox" id='display_recent_requests'/>
                                <label htmlFor="display_recent_requests">Показывать кнопку "Все настройки"</label>
                            </div>
                        </div>
                        <div className="homy_settings_wrapper_nav_block_item_settings_wrapper_content_block_interface_header">
                            <h4>Цветовая схема</h4>
                        </div>
                        <div className="homy_settings_wrapper_nav_block_item_settings_wrapper_content_block_interface_theme_list">
                            {elements_main_themes}
                            <div className="homy_settings_wrapper_nav_block_item_settings_wrapper_content_block_interface_theme_list_item" onClick={() => setDisplayThemeModal(true)}>
                                <div className="homy_settings_wrapper_nav_block_item_settings_wrapper_content_block_interface_theme_list_item_color" style={{backgroundColor: 'rgba(0,0,0,.7)'}}>
                                    <div className="homy_settings_wrapper_nav_block_item_settings_wrapper_content_block_interface_theme_list_item_color_thumb" style={{backgroundColor: 'blueviolet'}}></div>
                                    <div className="homy_settings_wrapper_nav_block_item_settings_wrapper_content_block_interface_theme_list_item_color_thumb" style={{backgroundColor: 'cyan'}}></div>
                                    <div className="homy_settings_wrapper_nav_block_item_settings_wrapper_content_block_interface_theme_list_item_color_thumb" style={{backgroundColor: 'aqua'}}></div>
                                    <div className="homy_settings_wrapper_nav_block_item_settings_wrapper_content_block_interface_theme_list_item_color_thumb" style={{backgroundColor: 'orangered'}}></div>
                                </div>
                                <div className="homy_settings_wrapper_nav_block_item_settings_wrapper_content_block_interface_theme_list_item_name">
                                    Цветная
                                </div>
                            </div>
                        </div>
                        <div className="homy_settings_wrapper_nav_block_item_settings_wrapper_content_block_interface_theme_modal" onClick={(e) => {
                            if(e.target.classList.contains('homy_settings_wrapper_nav_block_item_settings_wrapper_content_block_interface_theme_modal')){
                                setDisplayThemeModal(false);
                            }
                        }} style={displayThemeModal ? {display: 'flex'} : {display: 'none'}}>
                            <div className="homy_settings_wrapper_nav_block_item_settings_wrapper_content_block_interface_theme_modal_wrapper">
                                {elements_colors_themes}
                            </div>
                            <button onClick={() => setDisplayThemeModal(false)}>Отмена</button>
                        </div>
                    </div>
                    <div className="homy_settings_wrapper_nav_block_item_settings_wrapper_content_block_providers">
                        <div className="homy_settings_wrapper_nav_block_item_settings_wrapper_content_block_header">
                            <h3 id='providers_settings'>Провайдеры</h3>
                        </div>
                        <div className="homy_settings_wrapper_nav_block_item_settings_wrapper_content_block_providers_header">
                            <h4>Переменные провайдеров</h4>
                        </div>
                        <div className="homy_settings_wrapper_nav_block_item_settings_wrapper_content_block_description">
                            <p>Задайте переменные провайдеров для вашего удобного поиска.</p>
                        </div>
                        <div className="homy_settings_wrapper_nav_block_item_settings_wrapper_content_block_providers_list">
                            <div className="homy_settings_wrapper_nav_block_item_settings_wrapper_content_block_providers_list_item">

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

const KeyboardsShortcutsBlock = () => {
    return (
        <div className="homy_settings_wrapper_nav_block_item">
            <div className="homy_settings_wrapper_nav_block_item_header">
                <h2>Горячие клавиши</h2>
            </div>
        </div>
    )
};

export default SettingsWrapper;