import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeActiveTheme, changeGeneralAndInterfaceSettings } from '../../redux/actions/homySettings';
import { colorsThemesSchemes, mainThemeSchemes } from '../../utils/data/themes';

const SettingsNavBlock = () => {

    const dispatch = useDispatch();

    const {showBtnAllSettings,showMainBookmarks, activeScheme} = useSelector(state => {
        if (state.homySettings.homySettings){
            return state.homySettings.homySettings.settings.interface;
        }
    });
    const {showRecentRequests,autoFocusSearch} = useSelector(state => {
        if (state.homySettings.homySettings){
            return state.homySettings.homySettings.settings.general;
        }
    });

    const [displayThemeModal, setDisplayThemeModal] = useState(false);

    const settingsNav = [
        {title: 'Общие настройки', id: 1, href: '#general_settings'},
        {title: 'Интерфейс', id: 2,  href: '#interface_settings'},
        {title: 'Провайдеры', id: 3,  href: '#providers_settings'},
    ];

    //eslint-disable-next-line
    let elements_nav = settingsNav.map(item => {
        return (
            <div className="homy_settings_wrapper_nav_block_item_settings_wrapper_nav_block_item" key={item.id}>
                <a href={item.href}>{item.title}</a>
            </div>
        )
    });

    let elements_main_themes = mainThemeSchemes.map(({color, id, name, theme, object}) => {
        return (
            <div className="homy_settings_wrapper_nav_block_item_settings_wrapper_content_block_interface_theme_list_item" key={id} onClick={() => dispatch(changeActiveTheme({theme, object}))}>
                <div className="homy_settings_wrapper_nav_block_item_settings_wrapper_content_block_interface_theme_list_item_color" style={theme === activeScheme ? {backgroundColor: color, border: '3px solid rebeccapurple'} : {backgroundColor: color, border: 'none'}}>

                </div>
                <div className="homy_settings_wrapper_nav_block_item_settings_wrapper_content_block_interface_theme_list_item_name">
                    {name}
                </div>
            </div>
        )
    });

    let elements_colors_themes = colorsThemesSchemes.map(({color, id, name, theme, object}) => {
        return (
            <div className="homy_settings_wrapper_nav_block_item_settings_wrapper_content_block_interface_theme_list_item" key={id} onClick={() => dispatch(changeActiveTheme({theme, object}))}>
                <div className="homy_settings_wrapper_nav_block_item_settings_wrapper_content_block_interface_theme_list_item_color" style={theme === activeScheme ? {backgroundColor: color, border: '3px solid rebeccapurple'} : {backgroundColor: color, border: 'none'}}>

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
                                <input type="checkbox" id='display_recent_requests' checked={showRecentRequests} onChange={(e) => dispatch(changeGeneralAndInterfaceSettings(e.target.getAttribute('id')))}/>
                                <label htmlFor="display_recent_requests">Показывать последние запросы</label>
                            </div>
                            <div className="homy_settings_wrapper_nav_block_item_settings_wrapper_checks_list_item">
                                <input type="checkbox" id='auto_focus_start' checked={autoFocusSearch} onChange={(e) => dispatch(changeGeneralAndInterfaceSettings(e.target.getAttribute('id')))}/>
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
                                <input type="checkbox" id='display_settings_btn' checked={showBtnAllSettings} onChange={(e) => dispatch(changeGeneralAndInterfaceSettings(e.target.getAttribute('id')))}/>
                                <label htmlFor="display_settings_btn">Показывать кнопку "Все настройки"</label>
                            </div>
                            <div className="homy_settings_wrapper_nav_block_item_settings_wrapper_checks_list_item">
                                <input type="checkbox" id='display_main_bookmarks' checked={showMainBookmarks} onChange={(e) => dispatch(changeGeneralAndInterfaceSettings(e.target.getAttribute('id')))}/>
                                <label htmlFor="display_main_bookmarks">Показывать закладки на главном экране</label>
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

export default SettingsNavBlock;