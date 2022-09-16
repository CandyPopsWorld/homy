import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { uid } from 'uid';
import { changeActiveTheme, changeGeneralAndInterfaceSettings } from '../../redux/actions/homySettings';
import { addUserProvider, deleteUserProvider, updateUserProvider } from '../../redux/actions/settings';
import { colorsThemesSchemes, mainThemeSchemes } from '../../utils/data/themes';
import { encryprData } from '../../utils/functions/encryprData';
import { validateProvider } from '../../utils/functions/validateProvider';

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

    const searchProviders = useSelector(state => {
        if(state.settings.settings){
            return state.settings.settings.searchProviders;
        }
    });

    const [displayThemeModal, setDisplayThemeModal] = useState(false);

    const [displayDefaultListProviders, setDisplayDefaultListProviders] = useState(false);
    const [displayUsersListProviders, setDisplayUsersListProviders] = useState(false);

    const settingsNav = [
        {title: 'Общие настройки', id: 1, href: '#general_settings'},
        {title: 'Интерфейс', id: 2,  href: '#interface_settings'},
        {title: 'Провайдеры', id: 3,  href: '#providers_settings'},
    ];

    const [addedProviders, setAddedProviders] = useState([]);

    useEffect(() => {
        setAddedProviders([]);
    }, [])


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

    let elements_default_providers = null;
    if(searchProviders){
        //eslint-disable-next-line
        elements_default_providers = searchProviders.map(item => {
            if(item.role === 'default'){
                return (
                    <div className="homy_settings_wrapper_nav_block_item_settings_wrapper_content_block_default_providers_list_item">
                        <div className="homy_settings_wrapper_nav_block_item_settings_wrapper_content_block_default_providers_list_item_code">
                            <label htmlFor="">Code:</label>
                            <input type="text" value={item.code} disabled/>
                        </div>
                        <div className="homy_settings_wrapper_nav_block_item_settings_wrapper_content_block_default_providers_list_item_provider_name">
                            <label htmlFor="">ProviderName:</label>
                            <input type="text" value={item.providerName} disabled/>
                        </div>
                        <div className="homy_settings_wrapper_nav_block_item_settings_wrapper_content_block_default_providers_list_item_provider_url">
                            <label htmlFor="">ProviderUrl:</label>
                            <input type="text" value={item.provider} disabled/>
                        </div>
                    </div>
                )
            }
        })
    };

    let elements_users_providers = null;
    if(searchProviders){
        //eslint-disable-next-line
        elements_users_providers = searchProviders.map(item => {
            if(item.role === 'users'){
                return (
                    <UserProviderItem code={item.code} provider={item.provider} providerName={item.providerName} key={item.code}/>
                )
            }
        })
    };

    let elements_added_providers = null;
    if(addedProviders.length > 0){
        elements_added_providers = addedProviders.map(({uid}) => {
            return  <AddedProviderItem key={uid} addedProviders={addedProviders} setAddedProviders={setAddedProviders} uid={uid}/>
        })
    }

    return (
        <div className="homy_settings_wrapper_nav_block_item">
            <div className="homy_settings_wrapper_nav_block_item_header">
                <h2>Настройки</h2>
            </div>
            <div className="homy_settings_wrapper_nav_block_item_settings_wrapper">
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
                        <div className="homy_settings_wrapper_nav_block_item_settings_wrapper_content_block_default_providers_link" onClick={(e) => setDisplayDefaultListProviders(prev => !prev)}>
                            Стандартные провайдеры
                        </div>
                        <div className="homy_settings_wrapper_nav_block_item_settings_wrapper_content_block_default_providers_list" style={displayDefaultListProviders ? {display: 'flex'} : {display: 'none'}}>
                            {elements_default_providers}
                        </div>
                        <div className="homy_settings_wrapper_nav_block_item_settings_wrapper_content_block_default_providers_link" onClick={(e) => setDisplayUsersListProviders(prev => !prev)}>
                            Собственные провайдеры
                        </div>
                        <div className="homy_settings_wrapper_nav_block_item_settings_wrapper_content_block_default_providers_list" style={displayUsersListProviders ? {display: 'flex'} : {display: 'none'}}>
                            {elements_users_providers}
                        </div>
                        <div className="homy_settings_wrapper_nav_block_item_settings_wrapper_content_block_default_providers_list">
                            {elements_added_providers}
                        </div>
                        <div className="homy_settings_wrapper_nav_block_item_settings_wrapper_content_block_default_providers_add">
                            <button onClick={() => setAddedProviders(prev => [...prev, {uid: uid(100)}])}>Добавить провайдера</button>
                        </div>
                    </div>
                    <div className="homy_settings_wrapper_nav_block_item_settings_wrapper_content_block_providers">
                        <div className="homy_settings_wrapper_nav_block_item_settings_wrapper_content_block_header">
                            <h3 id='developer_settings'>Для разработчиков</h3>
                        </div>
                        <div className="homy_settings_wrapper_nav_block_item_settings_wrapper_content_block_description">
                            <div className="homy_settings_wrapper_nav_block_item_settings_wrapper_content_block_description_item">
                                <span>Исходный код:</span>
                            </div>
                            <div className="homy_settings_wrapper_nav_block_item_settings_wrapper_content_block_description_item">
                                <a style={{marginLeft: '10px', color: 'aqua'}} href="https://github.com/CandyPopsWorld/homy">GitHub</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

const AddedProviderItem = ({addedProviders, setAddedProviders, uid}) => {

    const dispatch = useDispatch();
    const [code, setCode] = useState('');
    const [providerName, setProviderName] = useState('');
    const [provider, setProvider] = useState('');
    const index = addedProviders.findIndex(item => item.uid === uid);

    const addNewProviderUser = async () => {
        if(validateProvider(code, providerName, provider)){
            await dispatch(addUserProvider({code: encryprData(code), provider: encryprData(provider), providerName: encryprData(providerName), role: encryprData('users')}));
            await setAddedProviders(prev => [...prev.slice(0, index), ...prev.slice(index + 1)]);
        }
    };

    return (
        <div className="homy_settings_wrapper_nav_block_item_settings_wrapper_content_block_default_providers_list_item">
            <div className="homy_settings_wrapper_nav_block_item_settings_wrapper_content_block_default_providers_list_item_code">
                <label htmlFor="">Code:</label>
                <input type="text" value={code} onChange={(e) => setCode(e.target.value)}/>
            </div>
            <div className="homy_settings_wrapper_nav_block_item_settings_wrapper_content_block_default_providers_list_item_provider_name">
                <label htmlFor="">ProviderName:</label>
                <input type="text" value={providerName} onChange={(e) => setProviderName(e.target.value)}/>
            </div>
            <div className="homy_settings_wrapper_nav_block_item_settings_wrapper_content_block_default_providers_list_item_provider_url">
                    <label htmlFor="">ProviderUrl:</label>
                    <input type="text" value={provider} onChange={(e) => setProvider(e.target.value)}/>
            </div>
            <div className="homy_settings_wrapper_nav_block_item_settings_wrapper_content_block_default_providers_list_item_delete" onClick={() => setAddedProviders(prev => [...prev.slice(0, index), ...prev.slice(index + 1)])}>
                x
            </div>
            <div className="homy_settings_wrapper_nav_block_item_settings_wrapper_content_block_default_providers_list_item_add" onClick={addNewProviderUser}>
                <i className="fa-solid fa-check"></i>
            </div>
        </div>
    )
};

const UserProviderItem = ({code, providerName, provider}) => {

    const dispatch = useDispatch();
    const [codeLocal, setCodeLocal] = useState(code);
    const [providerNameLocal, setProviderNameLocal] = useState(providerName);
    const [providerLocal, setProviderLocal] = useState(provider);

    return (
        <div className="homy_settings_wrapper_nav_block_item_settings_wrapper_content_block_default_providers_list_item">
            <div className="homy_settings_wrapper_nav_block_item_settings_wrapper_content_block_default_providers_list_item_code">
                <label htmlFor="">Code:</label>
                <input type="text" value={codeLocal} onChange={async (e) => {
                    await setCodeLocal(e.target.value);
                    if(validateProvider(codeLocal, providerNameLocal, providerLocal)){
                        await dispatch(updateUserProvider({newCode: codeLocal, code: code, provider: providerLocal, providerName: providerNameLocal, role: 'users'}));
                    }
                }}/>
            </div>
            <div className="homy_settings_wrapper_nav_block_item_settings_wrapper_content_block_default_providers_list_item_provider_name">
                <label htmlFor="">ProviderName:</label>
                <input type="text" value={providerNameLocal} onChange={async (e) => {
                    await setProviderNameLocal(e.target.value);
                    if(validateProvider(codeLocal, providerNameLocal, providerLocal)){
                        await dispatch(updateUserProvider({newCode: codeLocal, code: code, provider: providerLocal, providerName: providerNameLocal, role: 'users'}));
                    }
                }}/>
            </div>
            <div className="homy_settings_wrapper_nav_block_item_settings_wrapper_content_block_default_providers_list_item_provider_name">
                <label htmlFor="">ProviderUrl:</label>
                <input type="text" value={providerLocal} onChange={async (e) => {
                    await setProviderLocal(e.target.value);
                    if(validateProvider(codeLocal, providerNameLocal, providerLocal)){
                        await dispatch(updateUserProvider({newCode: codeLocal,code: code, provider: providerLocal, providerName: providerNameLocal, role: 'users'}));
                    }
                }}/>
            </div>
            <div className="homy_settings_wrapper_nav_block_item_settings_wrapper_content_block_default_providers_list_item_delete" onClick={() => dispatch(deleteUserProvider(codeLocal))}>
                x
            </div>
        </div>
    )
};

export default SettingsNavBlock;